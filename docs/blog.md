# [返回主页](https://rbatis.github.io/rbatis.io/)

## v2.0 版本发布

* 重要更新
> （pysql去掉runtime，直接编译成静态rust代码）这意味着使用py_sql,html_sql生成的SQL的性能与手写代码大致相似。
```rust
#[py_sql(
    rb,
    "select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}","mysql")]
    async fn py_sql_tx(rb: &Rbatis, tx_id: &String, name: &str) -> Vec<BizActivity> { todo!() }
```
> 添加了 html_sql 支持，一种类似于 MyBatis 的组织形式，方便 Java 系统向 Rust 的迁移（注意它在构建时也编译为 Rust 代码，执行接近手写代码）这非常快
```rust
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://github.com/rbatis/rbatis_sql/raw/main/mybatis-3-mapper.dtd">
<mapper>
    <sql id="select_self">(id,name,age,tag)</sql>
    <insert id="insert">
        insert into biz_activity
        <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">
            ${key}
        </foreach>
         values
        <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">
            ${item}
        </foreach>
    </insert>
    <select id="select_by_condition">
        select * from biz_activity where
        <if test="name != ''">
            name like #{name}
        </if>
    </select>
    <select id="test_include">
      <include refid="select_self"></include>
      <include refid="page_sql?file=example/example_include.html"></include>
    </select>
</mapper>
```

* 删除 id,id_name（使用列动态字段代替静态方法）
  例如：
```rust
rb.fetch_by_column::<Option<BizActivity>,_>( "id",&"1").await
rb.fetch_by_column::<Option<BizActivity>,_>( "name",&"joke").await
rb.fetch_by_column::<Option<BizActivity>,_>( "age",1).await
```
* 删除 context_id,tx_id,TxManager（使用事务结构体传输事务，conn）
```rust
let tx = rb.acquire_begin().await.unwrap();
        let v: serde_json::Value = tx
            .fetch("select count(1) from biz_activity;",&vec![])
            .await
            .unwrap();
        println!("{}", v.clone());
        tx.commit().await.unwrap();
```
> 使用defer防止忘记提交事务

```rust
    pub async fn forget_commit(rb: &Rbatis) -> rbatis::core::Result<serde_json::Value> {
        // tx will be commit.when func end
        let tx = rb.acquire_begin().await?.defer(|tx|{
            println!("tx is drop!");
            async_std::task::block_on(async{ tx.rollback().await; });
        });
        let v: serde_json::Value = tx
            .fetch( "select count(1) from biz_activity;",&vec![])
            .await?;
        return Ok(v);
    }
```

## Rbatis ORM（v2.0）次世代 零开销、编译时动态SQL ORM方面的探索

###  前言
> 笔者曾经在2020年发布基于rust的orm第一版，参见文章https://rustcc.cn/article?id=1f29044e-247b-441e-83f0-4eb86e88282c

v1.8版本依靠rust提供的高性能，sql驱动依赖sqlx-core，未作特殊优化性能即超过了go、java之类的orm
v1.8版本一经发布，受到了许多网友的肯定和采纳，并应用于诸多生产系统之上。
v1.8版本借鉴了mybatis plus 同时具备的基本的crud功能并且推出py_sql简化组织编写sql的心理压力，同时增加一系列常用插件，极大的方便了广大网友。

> 同时1.8版本也具备了某些网友提出的问题，例如：
* 当操作的表结构具备多给主键时，by_id*()的方式似乎不那么适用
* 当使用TxManager外加tx_id管理事务的方式，因为用到了锁，似乎影响性能
* py_sql使用ast+解释执行的方式，不但存在 运行时，运行时解析阶段，运行时解释执行阶段，能否优化为完全0开销的方式？
* 能否加入xml格式的动态sql存储，实现sql和代码解耦分离，不要使用CDATA转义（太麻烦了），适当兼容从java迁移过来的系统并适当复用之前的mybais xml？

经过一段时间的思考和整理，于是推出v2.0版本，实现完全0开销的动态sql，sql构建性能提高N倍（只生成sql），完整查询QPS（组织sql到得到结果）性能提高至少2倍以上，并解决以上问题

> 介绍Java最普遍的ORM框架前世今生 - Mybatis、MybatisPlus，XML，ONGL表达式，dtd文件

* MyBatis在java和sql之间提供更灵活的映射方案,MyBatis将sql语句和方法实现，直接写到xml文件中，实现和java程序解耦
为何这样说,MyBatis将接口和SQL映射文件进行分离,相互独立,但又通过反射机制将其进行动态绑定。
其实它底层就是Mapper代理工厂[MapperRegistry]和Mapper标签映射[MapperStatement],它们两个说穿了就是Map容器,就是我们常见的HashMap、ConcurrentHashMap。
所以说,MyBatis使用面向接口的方式这种思想很好的实现了解耦和的方式,同时易于开发者进行定制和扩展,比如我们熟悉的通用Mapper和分页插件pageHelper,方式也非常简单。

* 什么是动态SQL？

在某种高级语言中，如果嵌入了SQL语句，而这个SQL语句的主体结构已经明确，例如在Java的一段代码中有一个待执行的SQL“select * from t1 where c1>5”，在Java编译阶段，就可以将这段SQL交给数据库管理系统去分析，数据库软件可以对这段SQL进行语法解析，生成数据库方面的可执行代码，这样的SQL称为静态SQL，即在编译阶段就可以确定数据库要做什么事情。
而如果嵌入的SQL没有明确给出，如在Java中定义了一个字符串类型的变量sql：String sql;，然后采用preparedStatement对象的execute方法去执行这个sql，该sql的值可能等于从文本框中读取的一个SQL或者从键盘输入的SQL，但具体是什么，在编译时无法确定，只有等到程序运行起来，在执行的过程中才能确定，这种SQL叫做动态SQL

* 什么是DTD文件？

文档类型定义（DTD）可定义合法的XML文档构建模块。它使用一系列合法的元素来定义文档的结构。同样，它可以作用于xml文件也可以作用于html文件.
Intellij IDEA,CLion,VSCode等等ide均具备该文件合法模块，标签智能提示的能力
例如:
```dtd
<?xml version="1.0" encoding="UTF-8" ?>
        <!ELEMENT mapper (sql* | insert* | update* | delete* | select* )+>
        <!ATTLIST mapper
                >
```

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://github.com/rbatis/rbatis_sql/raw/main/mybatis-3-mapper.dtd">
<mapper>
</mapper>
```

* 什么是ONGL表达式？

OGNL(Object-Graph Navigation Language)大概可以理解为:对象图形化导航语言。是一种可以方便地操作对象属性的开源表达式语言.
Rbatis在html，py_sql内部借鉴部分ognl表达式的设计，但是rbatis实际操作的是json对象。

例如(#{name},表示从参数中获取name参数，#符号表示放如预编译sql参数并替换为mysql的'?'或者pg的‘$1’，如果是$符号表示直接插入并替换sql):
```html
<select id="select_by_condition">select * from table where name like #{name}</select>
```

### 探索实现架构走弯路-最初版本基于AST+解释执行

### 探索实现架构走弯路-尝试基于wasm

### 探索实现架构走弯路-尝试过程宏，是元编程也是高性能的关键

> 过程宏框架，syn和quote（分别解析和生成词条流）

> 语法糖语义

> 关于扩展性-包装serde_json还是拷贝serde_json源码？

> 性能优化1-写时复制Cow-避免不必要的克隆
* 科普：写时复制（Copy on Write）技术是一种程序中的优化策略，多应用于读多写少的场景。主要思想是创建对象的时候不立即进行复制，而是先引用（借用）原有对象进行大量的读操作，只有进行到少量的写操作的时候，才进行复制操作，将原有对象复制后再写入。这样的好处是在读多写少的场景下，减少了复制操作，提高了性能。

> 性能优化2-重复变量利用优化

> 性能优化3-sql预编译参数替换算法优化

* 字符串替换性能的关键-rust的string存储于堆内存 

* 巧用char进行字符串替换

### 最后的验证阶段，（零开销、编译时动态SQL）执行效率压测

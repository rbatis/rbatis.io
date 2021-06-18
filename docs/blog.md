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

> 介绍Java最普遍的ORM框架前世今生 -  Mybatis，XML，ONGL表达式，dtd文件


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

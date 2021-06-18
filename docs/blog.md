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

## Rbatis ORM（v2.0）在编译时动态SQL方面的探索

* 前言
> 笔者曾经在2020年发布基于rust的orm第一版，参见文章https://rustcc.cn/article?id=1f29044e-247b-441e-83f0-4eb86e88282c



* 走弯路-尝试基于wasm
  
* 走弯路end-尝试过程宏，是元编程也是高性能的关键

> 过程宏的玄冥二老，syn和quote（分别解析和生成词条流）

> 设计语法糖

> 关键点-使用Cow避免过度克隆

> 关键点-重复变量优化

> 关键点-sql预编译替换算法优化

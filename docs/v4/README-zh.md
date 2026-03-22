### rbatis-v4

一个高性能的 SQL 工具包和编译时 ORM 库。一个异步、纯 `Rust` SQL 工具库，具有编译时动态 SQL 特性。

它是一个 ORM，一个小型编译器，一个动态 SQL 语言。

* 兼容大多数 mybatis3 语法。你可以将 Java 项目重构为 `Rust`！
* 无运行时，无垃圾回收，高性能，基于 Future/Tokio
* 零成本动态 SQL，使用（proc-macro、编译时、Cow减少不必要的克隆）技术实现。不需要 ONGL 引擎（mybatis）
* 类似 JDBC 的驱动设计，驱动使用 cargo.toml 依赖和 ```Box<dyn Driver>``` 分离
* 所有数据库驱动支持 ```#{arg}```、```${arg}```、```?``` 占位符（pg/mssql 自动处理 '?' 转换为 '$1' 和 '@P1'）
* 动态 SQL（在 SQL 中自由编写代码）、分页、```py_sql``` 查询语言和 ```html_sql```（灵感来自 Mybatis）。
* 动态配置连接池（基于 https://github.com/rbatis/fast_pool）
* 支持基于拦截器实现的日志记录
* 100% 安全的纯 `Rust`，启用了 `#![forbid(unsafe_code)]`
* [rbatis/example](https://github.com/rbatis/example)
* [abs_admin 项目](https://github.com/rbatis/abs_admin) 一个后台用户管理系统（Vue.js+rbatis+axum）
* [salvo_admin 项目](https://github.com/feihua/salvo-admin) 一个后台权限管理系统（react+rbatis+salvo）

#### 支持的数据库驱动

> RBatis 支持任何实现了 [rdbc](https://crates.io/crates/rbdc) 驱动的数据库。
> 如果你没有找到想要的驱动，你可以自己编写一个，只需要实现 ``` rbdc::db::* ``` trait 即可。

| 数据库 (crates.io)                               | github 链接                                                                         |
|-------------------------------------------------|---------------------------------------------------------------------------------------|
| [Mysql](https://crates.io/crates/rbdc-mysql)        | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [Postgres](https://crates.io/crates/rbdc-pg)        | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |
| [Sqlite](https://crates.io/crates/rbdc-sqlite)      | [rbatis/rbdc-sqlite](https://github.com/rbatis/rbatis/tree/master/rbdc-sqlite)        |
| [Mssql](https://crates.io/crates/rbdc-mssql)        | [rbatis/rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)          |
| [MariaDB](https://crates.io/crates/rbdc-mysql)      | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [TiDB](https://crates.io/crates/rbdc-mysql)         | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [CockroachDB](https://crates.io/crates/rbdc-pg)     | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |
| [Oracle](https://crates.io/crates/rbdc-oracle)      | [chenpengfan/rbdc-oracle](https://github.com/chenpengfan/rbdc-oracle)                 |
| [TDengine](https://crates.io/crates/rbdc-tdengine)  | [tdcare/rbdc-tdengine](https://github.com/tdcare/rbdc-tdengine)                     |


#### CRUD 安装/使用

* 安装步骤：修改 Cargo.toml（运行命令 `cargo update`）

* `toml`（默认配置）

```toml
#rbatis deps
rbatis = { version = "4.8"}
rbs = { version = "4"}
rbdc-sqlite = { version = "4" }
#rbdc-mysql={version="4"}
#rbdc-pg={version="4"}
#rbdc-mssql={version="4"}

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```

* `toml` `native-tls`（可选配置）

```toml
rbs = { version = "4" }
rbdc-sqlite = { version = "4", default-features = false, features = ["tls-native-tls"] }
#rbdc-mysql={version="4", default-features = false, features = ["tls-native-tls"]}
#rbdc-pg={version="4", default-features = false, features = ["tls-native-tls"]}
#rbdc-mssql={version="4", default-features = false, features = ["tls-native-tls"]}
rbatis = { version = "4.8" }

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```



##### 表定义

> RBatis 遵循简洁的代码风格，数据库表结构只是一个普通结构体，可以使用 RBatis 提供的数据库类型
> 我们使用 ```crud!()``` 宏使表结构具有查询和修改数据库的能力
> crud 宏提供：```insert()```、```insert_batch()```、```select_by_map()```、```update_by_map()```、```delete_by_map()``` 等方法

```rust
use serde::{Deserialize, Serialize};
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}
//crud = async fn insert(...)+async fn  select_by_map(...)+ async fn  update_by_map(...)+async fn  delete_by_map(...)...and more
rbatis::crud!(BizActivity {});

```

###### 自定义表名

> rbatis 允许自定义表名
> 就像 SQL 一样 ```select * from ${table_name} ```
```rust
rbatis::crud!(BizActivity {},"biz_activity");
```

###### 宏-插入

```rust
//#[macro_use] 定义在 'root crate' 或 'mod.rs' 或 'main.rs'
#[macro_use]
extern crate rbatis;


use rbatis::rbdc::datetime::DateTime;
use serde_json::json;

/// table
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}

crud!(BizActivity{});

#[tokio::main]
async fn main() {
    /// enable log crate to show sql logs
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point
    let rb = RBatis::new();
    /// connect to database

    //init() just set driver
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();

    // link() will set driver and try use acquire() link database
    // sqlite
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    let table = BizActivity {
        id: Some("2".into()),
        name: Some("2".into()),
        pc_link: Some("2".into()),
        h5_link: Some("2".into()),
        pc_banner_img: None,
        h5_banner_img: None,
        sort: Some("2".to_string()),
        status: Some(2),
        remark: Some("2".into()),
        create_time: Some(DateTime::now()),
        version: Some(1),
        delete_flag: Some(1),
    };
    let tables = [table.clone(), {
        let mut t3 = table.clone();
        t3.id = "3".to_string().into();
        t3
    }];

    let data = BizActivity::insert(&rb, &table).await;
    println!("insert = {}", json!(data));

    let data = BizActivity::insert_batch(&rb, &tables, 10).await;
    println!("insert_batch = {}", json!(data));
}
```

###### 宏-更新

```rust
//#[macro_use] 定义在 'root crate' 或 'mod.rs' 或 'main.rs'
#[macro_use]
extern crate rbatis;


use rbatis::rbdc::datetime::DateTime;
use serde_json::json;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}
crud!(BizActivity{});

#[tokio::main]
async fn main() {
    /// enable log crate to show sql logs
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point
    let rb = RBatis::new();
    /// connect to database

    //init() just set driver
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();

    // link() will set driver and try use acquire() link database
    // sqlite
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    let table = BizActivity {
        id: Some("2".into()),
        name: Some("2".into()),
        pc_link: Some("2".into()),
        h5_link: Some("2".into()),
        pc_banner_img: None,
        h5_banner_img: None,
        sort: None,
        status: Some(2),
        remark: Some("2".into()),
        create_time: Some(DateTime::now()),
        version: Some(1),
        delete_flag: Some(1),
    };

    let data = BizActivity::update_by_map(&rb, &table, value!{"id":&table.id}).await;
    println!("update_by_map = {}", json!(data));

}
```

###### 宏-查询

```rust
//#[macro_use] 定义在 'root crate' 或 'mod.rs' 或 'main.rs'
#[macro_use]
extern crate rbatis;


use rbatis::rbdc::datetime::DateTime;
use serde_json::json;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}
crud!(BizActivity{});

#[tokio::main]
async fn main() {
    /// enable log crate to show sql logs
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point
    let rb = RBatis::new();
    /// connect to database

    //init() just set driver
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();

    // link() will set driver and try use acquire() link database
    // sqlite
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    let data = BizActivity::select_by_map(&rb, value!{"id":"1"}).await;
    println!("select_by_map = {}", json!(data));
}
```


#### 调试模式

如果你在 Cargo.toml 中启用了 "debug_mode" 功能，你将看到以下特性

* 显示项目构建时生成的代码（`rbatis_codgen` 生成的代码）。你可以在构建日志中看到（`............gen macro py_sql :............`）
* 显示数据库 `rows` 数据。你可以看到日志（```query <= len=1,rows=[{"id":1}]```）
* 显示解码失败的无效类型字段。你可以查看错误信息（```"invalid type: integer `1`, expected a string, key=`status`"```）

请注意，debug_mode 需要将日志级别设置为 'debug'

> 如何在 Cargo.toml 中启用 debug_mode 功能？
```toml
rbatis = { version = "4",features = ["debug_mode"]}
```

> 需要将 fast_log 设置为 Debug 级别
```rust
#[tokio::main]
async fn main(){
    fast_log::init(fast_log::Config::new().console().level(log::LevelFilter::Debug));
}
```

```log
cargo run
............gen macro py_sql :
 pub async fn do_select_all(
    rb: &dyn rbatis::executor::Executor,
    table_name: String,
) -> Result<Vec<BizActivity>, rbatis::rbdc::Error> {
    let mut rb_arg_map = rbs::value::map::ValueMap::new();
    rb_arg_map.insert(
        "table_name".to_string().into(),
        rbs::to_value(table_name).unwrap_or_default(),
    );
    {}
    use rbatis::executor::RBatisRef;
    let driver_type = rb.get_rbatis().driver_type()?;
    use rbatis::rbatis_codegen;
    pub fn do_select_all(arg: &rbs::Value, _tag: char) -> (String, Vec<rbs::Value>) {
        use rbatis_codegen::ops::*;
        let mut sql = String::with_capacity(1000);
        let mut args = Vec::with_capacity(20);
        sql.push_str(
            "select * from ${table_name}"
                .replacen("${table_name}", &{ &arg["table_name"] }.as_sql(), 1)
                .as_str(),
        );
        rbatis_codegen::sql_index!(sql, _tag);
        return (sql, args);
    }
    let (mut sql, rb_args) = do_select_all(&rbs::Value::Map(rb_arg_map), '?');
    use rbatis::executor::Executor;
    let r = rb.query(&sql, rb_args).await?;
    rbatis::decode::decode(r)
}
............gen macro py_sql end............
```


#### `rbs`

`rbs` 是 rbatis 为 ORM 中间语言 `html_sql`、`py_sql` 编写的专用序列化框架，
用于在 HTML 语句中方便地使用和替换类似 JSON 的对象，而不是操作原生结构。
你可以将 `rbs` 理解为类似于 JSON `Value` 的中间结构。

* 这里我们展示 `rbs::Value` 的定义
```rust
#[derive(Clone, Debug, PartialEq)]
pub enum Value {
    /// null
    Null,
    /// true or false
    Bool(bool),
    /// Int32
    I32(i32),
    /// Int64
    I64(i64),
    /// Uint32
    U32(u32),
    /// Uint64
    U64(u64),
    /// A 32-bit float number.
    F32(f32),
    /// A 64-bit float number.
    F64(f64),
    /// String
    String(String),
    /// Binary/Bytes.
    Binary(Vec<u8>),
    /// Array/Vec.
    Array(Vec<Self>),
    /// Map<Key,Value>.
    Map(ValueMap),
    /// Extended implements Extension interface
    Ext(&'static str, Box<Self>),
}
```

*  rbs 构建 map 值
```rust
fn main(){
    let v = rbs::to_value!{
        "key":"value",
        "key2":"value2"
    };
}
```

*  rbs 编码为 value
```rust
fn main(){
    let v = rbs::to_value!(1);
    let arg = vec![1,2,3];
    let v = rbs::to_value!(&arg);
    let arg = "1".to_string();
    let v = rbs::to_value!(&arg);
}
```

*  rbs 从 value 解码
```rust
fn main(){
    let v:i32 = rbs::from_value(Value::I32(1)).unwrap();
}
```

*  显示 value
```rust
fn main(){
    let value = Value::I32(1);
    assert_eq!(value.to_string(),"1");
    assert_eq!(format!("{}",value),"1");
}
```


#### 事务

> 事务的本质是使用 SQL 语句 BEGIN、COMMIT 和 ROLLBACK。
> RBatis 提供这三个函数，还支持 ```defer_async()``` 来防止忘记提交

示例请参见 [这里](https://github.com/rbatis/rbatis/blob/master/example/src/transaction.rs)

```rust
use serde::{Deserialize, Serialize};
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}
crud!(BizActivity{});
#[tokio::main]
pub async fn main() {
    let _ = fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    let rb = RBatis::new();
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();
    rb.link(
        SqliteDriver {},
        &format!("sqlite://{}target/sqlite.db", path),
    ).await.unwrap();
    let t = BizActivity {
        id: Some("2".into()),
        name: Some("2".into()),
        pc_link: Some("2".into()),
        h5_link: Some("2".into()),
        pc_banner_img: None,
        h5_banner_img: None,
        sort: None,
        status: Some(2),
        remark: Some("2".into()),
        create_time: Some(DateTime::now()),
        version: Some(1),
        delete_flag: Some(1),
    };
    let tx = rb.acquire_begin().await.unwrap();
    // defer_async will be rollback if tx drop
    // let mut tx = tx.defer_async(|mut tx| async move {
    //     if !tx.done() {
    //         tx.rollback().await.unwrap();
    //         println!("rollback");
    //     }
    // });
    //tx.exec("select 1", vec![]).await.unwrap();
    BizActivity::insert(& tx, &t).await.unwrap();

    tx.commit().await.unwrap();
    tx.rollback().await.unwrap();
}
```


#### 原生 SQL

> RBatis 也支持编写数据库的原始语句
> RBatis 提供的驱动都支持占位符 '?'，因此你可以在 Postgres/mssql 等数据库上使用 '?'

```rust
use rbs::to_value;
use std::time::Duration;
use tokio::time::sleep;
use serde::{Deserialize, Serialize};
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}
#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
     let rb = RBatis::new();
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();
    rb.link(
        SqliteDriver {},
        &format!("sqlite://{}target/sqlite.db", path),
    ).await.unwrap();
    let table: Option<BizActivity> = rb
        .query_decode("select * from biz_activity limit ?", vec![to_value!(1)])
        .await
        .unwrap();
    let count: u64 = rb
        .query_decode("select count(1) as count from biz_activity", vec![])
        .await
        .unwrap();
    sleep(Duration::from_secs(1)).await;
    println!(">>>>> table={:?}", table);
    println!(">>>>> count={}", count);
}
```


#### `HtmlSql`

> 这是 RBatis 实现的一套兼容 MyBtais3 的 SQL 编辑语言，支持 if、Foreach、字符串插值等常用功能

* 当 Cargo.toml 中 RBatis 依赖开启了 ```debug_mode``` 功能时，会打印生成的函数实现代码
* 语言解析 -> 词法分析 -> 语法分析 -> 生成抽象语法树 -> 转换为 `Rust` 代码。具有原生 `Rust` 的性能
* 当然，PySql 也是使用 HtmlSql 作为语法树，PySql 会被转换为 HtmlSql
* 它使用 crates [rbs](https://crates.io/crates/rbs) 中的 ```rbs::Value``` 作为基础对象，可以对其执行任何操作和调用任何方法
* 你可以在 ```rbs::Value``` 上调用任何方法/trait，例如 ``` #{1 + 1}, #{arg}, #{arg [0]}, #{arg [0] + 'string'} ``` 或 ``` if sql.contans('count'): ```
* 可以使用反引号 ``` ` ``` 保留字符串中的空格，例如 ``` ` select * from table where ` ```
* 方法会在方法体中创建 2 个变量。因此你可以在分页操作中判断变量 SQL 是否包含 COUNT 语句或 SELECT 语句

* HtmlSql 语法树

| 语法/方法                                                                                     | 生成的 `Rust` 代码                                                                               |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ``` <trim prefixOverrides=" and">` and name != '' `</trim> ```                                | `sql.trim(" and")                      `                                                            |
| ``` <if test="key == 'id'">`select * from table`</if> ```                                     | `if  key == "id"{sql.push_str("select * from table");}                      `                       |
| ``` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  ``` | `for (key,item) in arg{}               `                                                            |
| ``` <continue/>  ```                                                                          | `for (key,item) in arg{ continue;}     `                                                            |
| ``` <set>  ```                                                                                | `sql.trim("set ").push_str(" set ");        `                                                       |
| ``` <set collection="arg">  ```                                                               | `sql.trim("set ").push_str(" set name=?,age=? "); //notice collection={name:"",age:""};           ` |
| ``` <choose>  ```                                                                             | `match {}                              `                                                            |
| ``` <when test="true">  ```                                                                   | `match true{ true=>{} _ => {} }        `                                                            |
| ``` <otherwise>  ```                                                                          | `match { _ =>{} }                      `                                                            |
| ``` <where>  ```                                                                              | `sql.push_str("WHERE").trim("WHERE");       `                                                       |
| ``` <bind name="a" value="1+1"></bind> ```                                                    | `let a = rbs::Value::I32(1 + 1)            `                                                        |
| ``` `select * from table`    ```                                                              | `sql.push_str("select * from table"); `                                                             |
| ``` `#{name}`    ```                                                                          | `sql.push_str("?");args.push(rbs::Value::String(name));`                                            |
| ``` `${name}`     ```                                                                         | `sql.push_str(&format!("{}",name));                    `                                            |
| ``` `${1 + 1}`   ```                                                                          | `sql.push_str(&format!("{}", 1 + 1));    `                                                          |
| ``` `#{1 + 1}`   ```                                                                          | `sql.push_str("?");args.push(rbs::Value::from(1+1));`                                               |
| ``` `${name + '_tag'}`  ```                                                                   | `sql.push_str(&format!("{}",name + "_tag"));    `                                                   |
| ``` `#{name + '_tag'}`  ```                                                                   | `sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    `                   |
| ``` `${age + 1}`  ```                                                                         | `sql.push_str(&format!("{}", age + 1));    `                                                        |
| ``` `#{age + 1}`  ```                                                                         | `sql.push_str("?");args.push(rbs::Value::from(age+1));     `                                        |
| ``` `${true  & true}`  ```                                                                    | `sql.push_str(&format!("{}", true & true));    `                                                    |
| ``` `#{true  & true}`  ```                                                                    | `sql.push_str("?");args.push(rbs::Value::from(true & true));    `                                   |
| ``` `${2 >  1}`  ```                                                                          | `sql.push_str(&format!("{}",2 >  1));    `                                                          |
| ``` `${2 /  1}`  ```                                                                          | `sql.push_str(&format!("{}", 2 / 1));    `                                                          |
| ``` `${2 ==  1}`  ```                                                                         | `sql.push_str(&format!("{}", 2 == 1));    `                                                         |
| ``` `${2 *  1}`  ```                                                                          | `sql.push_str(&format!("{}", 2 * 1));    `                                                          |
| ``` `${ !false }`  ```                                                                        | `sql.push_str(&format!("{}", !false));    `                                                         |
| ``` `${ 2 % 1 }`  ```                                                                         | `sql.push_str(&format!("{}", 2 % 1));    `                                                          |
| ``` `${ 2 - 1 }`  ```                                                                         | `sql.push_str(&format!("{}", 2 - 1));    `                                                          |
* 在 `Rust` 代码中定义请参见 [这里](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql.rs)
```rust
// Clion Smart tips: click code, choose 'Inject Language or Reference', and then choose html
#[html_sql(r#"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">
  <select id="select_by_condition">
        `select * from biz_activity`
        <where>
         <if test="a">
                ` and name like #{name}`
            </if>
            <if test="name != ''">
                ` and name like #{name}`
            </if>
            <if test="dt >= '2009-12-12 00:00:00'">
                ` and create_time < #{dt}`
            </if>
            <choose>
                <when test="true">
                    ` and id != '-1'`
                </when>
                <otherwise>and id != -2</otherwise>
            </choose>
            ` and `
            <trim prefixOverrides=" and">
                ` and name != '' `
            </trim>
        </where>
  </select>"#)]
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {
    impled!()
}
```


* 在 `Rust` 中从文件定义请参见 [这里](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_file.rs)

> example/example.html
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">
<mapper>
  <insert id="insert">
    `insert into biz_activity`
    <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">
      <if test="key == 'id'">
        <continue/>
      </if>
      ${key}
    </foreach>
    ` values `
    <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">
      ${item}
    </foreach>
  </insert>
  <select id="select_by_condition">
    `select * from biz_activity`
    <where>
      <if test="name != ''">
        ` and name like #{name}`
      </if>
      <if test="dt >= '2009-12-12 00:00:00'">
        ` and create_time < #{dt}`
      </if>
      <choose>
        <when test="true">
          ` and id != '-1'`
        </when>
        <otherwise>and id != -2</otherwise>
      </choose>
      ` and `
      <trim prefixOverrides=" and">
        ` and name != '' `
      </trim>
    </where>
  </select>
</mapper>
```

> rust 代码
```rust
#[html_sql("example/example.html")]
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {
    impled!()
}
```

> rust 代码
```rust
htmlsql!(select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> rbatis::Result<Vec<BizActivity>> => "example.html");
```

##### 分页

> 实现 html_sql 分页查询。

你必须处理 3 个参数：
(do_count:bool, page_no:u64, page_size:u64)

你必须处理 SQL：
返回 Vec<Record>（如果参数 do_count = false）
返回 u64（如果参数 do_count = true）

就像这个例子：
   ```html
   <select id="select_page_data">
           `select`
           <if test="do_count == true">
               ` count(1) from table`
           </if>
           <if test="do_count == false">
               ` * from table limit ${page_no},${page_size}`
           </if>
     </select>
   ```
```rust
#[macro_use]
extern crate rbatis;
use rbatis::rbatis::RBatis;
use rbatis::rbdc::datetime::DateTime;
use rbatis::sql::PageRequest;
use rbdc_sqlite::driver::SqliteDriver;

htmlsql_select_page!(select_page_data(name: &str, dt: &DateTime) -> BizActivity => "example/example.html");

#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    let rb = RBatis::new();
    rb.link(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))
        .await
        .unwrap();
    let a = select_page_data(&rb,&PageRequest::new(1, 10),"test",&DateTime::now().set_micro(0))
        .await
        .unwrap();
    println!("{:?}", a);
}
```


##### 包含

```<include>``` 允许引用 SQL 块，甚至来自 `xxxx.html` 文件的 SQL 块，需要指定 ```refid``` 才能正确引用

> 步骤1. 定义 ```<sql id="a">` and id != '' `</sql>```

> 步骤2. 使用 ``` <include refid="a"></include> ``` 或 ```<include refid="file://../rbatis/example/example.html?refid=a"></include>```

例如：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">
<mapper>
    <sql id="a">` and id != '' `</sql>
    <select id="select_by_condition">
        `select * from biz_activity`
        <where>
            <include refid="a"></include>
            <include refid="file://../rbatis/example/example.html?refid=a"></include>
            <if test="name != ''">
                ` and name like #{name}`
            </if>
            <if test="dt >= '2009-12-12 00:00:00'">
                ` and create_time < #{dt}`
            </if>
            <choose>
                <when test="true">
                    ` and id != '-1'`
                </when>
                <otherwise>and id != -2</otherwise>
            </choose>
            ` and `
            <trim prefixOverrides=" and">
                ` and name != '' `
            </trim>
        </where>
    </select>
</mapper>
```

#### `PySql`

* 这是一种类似 Python 的语法，用于操作 SQL 语句和插入 SQL 参数
* 语法树

| 语法/方法                                                 | 生成的 `Rust` 代码                                                                                   |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `trim 'AND ':      `                                          | `sql.trim_end_matches("AND ").trim_start_matches("AND ")       `                                        |
| `trim start='AND ':      `                                    | `sql.trim_start_matches("AND ")      `                                                                  |
| `trim end='AND ':      `                                      | `sql.trim_end_matches("AND ")      `                                                                    |
| `if arg!=1:         `                                         | `if arg !=1 {}               `                                                                          |
| `if true:`<br/>   ```  `select * from table` ```              | ```if true { sql.push_str("select * from table");}  ```                                                 |
| `for key,item in arg:      `                                  | `for (key,item) in arg{ }     `                                                                         |
| `for key,item in arg:`<br/>  ```  `and name = ${name}`    ``` | `for (key,item) in arg{ sql.push_str(&format!("and name = {}",name)); }     `                           |
| `for key,item in arg:`<br/>  ```  `continue:`            ```  | `for (key,item) in arg{ continue; }      `                                                              |
| `set :                       `                                | `sql.push_str("SET")                `                                                                   |
| `set collection='ids':                       `                | `sql.trim("set ").push_str(" set name=?,age=? "); //let collection={name:"",age:""};                  ` |
| `choose :                     `                               | `match {}                                `                                                              |
| `when :              `                                        | `match true{ true=>{} _ => {} }       `                                                                 |
| `otherwise :           `                                      | `match { _ =>{} }                    `                                                                  |
| `_:              `                                            | `match { _ =>{} }(v1.8.54 later)         `                                                              |
| `where :              `                                       | `sql.push_str("WHERE").trim("WHERE")    `                                                               |
| `bind a=1+1:       `                                          | `let a = rbs::Value::I32(1 + 1) `                                                                       |
| `let  a=1+1:     `                                            | `let a = rbs::Value::I32(1 + 1) `  (v1.8.54 later)                                                      |
| ``` `select * from table`    ```                              | `sql.push_str("select * from table"); `                                                                 |
| ``` `#{name}`    ```                                          | `sql.push_str("?");args.push(rbs::Value::String(name));`                                                |
| ``` `${name}`     ```                                         | `sql.push_str(&format!("{}",name));                    `                                                |
| ``` `${1 + 1}`   ```                                          | `sql.push_str(&format!("{}", 1 + 1));    `                                                              |
| ``` `#{1 + 1}`   ```                                          | `sql.push_str("?");args.push(rbs::Value::from(1+1));`                                                   |
| ``` `${name + '_tag'}`  ```                                   | `sql.push_str(&format!("{}",name.to_string() + "_tag"));    `                                           |
| ``` `#{name + '_tag'}`  ```                                   | `sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    `                       |
| ``` `${age + 1}`  ```                                         | `sql.push_str(&format!("{}", age + 1));    `                                                            |
| ``` `#{age + 1}`  ```                                         | `sql.push_str("?");args.push(rbs::Value::from(age+1));     `                                            |
| ``` `${true  & true}`  ```                                    | `sql.push_str(&format!("{}", true & true));    `                                                        |
| ``` `#{true  & true}`  ```                                    | `sql.push_str("?");args.push(rbs::Value::from(true & true));    `                                       |
| ``` `${2 >  1}`  ```                                          | `sql.push_str(&format!("{}",2 >  1));    `                                                              |
| ``` `${2 /  1}`  ```                                          | `sql.push_str(&format!("{}", 2 / 1));    `                                                              |
| ``` `${2 ==  1}`  ```                                         | `sql.push_str(&format!("{}", 2 == 1));    `                                                             |
| ``` `${2 *  1}`  ```                                          | `sql.push_str(&format!("{}", 2 * 1));    `                                                              |
| ``` `${ !false }`  ```                                        | `sql.push_str(&format!("{}", !false));    `                                                             |
| ``` `${ 2 % 1 }`  ```                                         | `sql.push_str(&format!("{}", 2 % 1));    `                                                              |
| ``` `${ 2 - 1 }`  ```                                         | `sql.push_str(&format!("{}", 2 - 1));    `                                                              |



```rust
pub struct User{
    pub delete_flag:i32,
    pub name:String
}

#[py_sql(
    "`select * from user where delete_flag = 0`
                  if name != '':
                    ` and name=#{name}`"
)]
async fn py_select(rb: & dyn Executor, name: &str) -> Result<Vec<User>, Error> {
    impled!()
}
```

```rust
pub struct User{
    pub delete_flag:i32,
    pub name:String
}

pysql!(user_delete_by_name(rb: &dyn Executor, name: &str) -> Result<ExecResult, Error> =>
    "`delete from user where delete_flag = 0`
                   if name != '':
                     ` and name=#{name}`" );

impl User{
    pysql!(user_delete_by_name(rb: &dyn Executor, name: &str) -> Result<ExecResult, Error> =>
    "`delete from user where delete_flag = 0`
                   if name != '':
                     ` and name=#{name}`" );
}

```

#### 插件：表同步

> 这是一个将表结构与代码中的表结构同步的插件，我认为这在移动开发中非常重要。
> 请注意，它不会改变表结构。

* 如果表不存在，则创建
* 如果表存在但缺少列，则增量添加缺少的列

```rust
use rbatis::rbatis::RBatis;
use rbatis::rbdc::datetime::DateTime;
use rbatis::table_sync;
use rbatis::table_sync::SqliteTableMapper;
use rbdc_sqlite::driver::SqliteDriver;
use rbs::to_value;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct RBUser {
    pub id: i32,
    pub name: Option<String>,
    pub remark: Option<String>,
    pub create_time: Option<DateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}

#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    let rb = RBatis::new();
    // ------------choose database driver------------
    //rb.init(rbdc_mysql::driver::MysqlDriver {}, "mysql://root:123456@localhost:3306/test").unwrap();
    // rb.init(rbdc_pg::driver::PgDriver {}, "postgres://postgres:123456@localhost:5432/postgres").unwrap();
    // rb.init(rbdc_mssql::driver::MssqlDriver {}, "mssql://SA:TestPass!123456@localhost:1433/test").unwrap();
    rb.init(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))
        .unwrap();
    // ------------choose database column mapper------------
    let mapper = &table_sync::SqliteTableMapper{} as &dyn ColumMapper;
    // let mapper = &table_sync::PGTableMapper{} as &dyn ColumMapper;
    //let mapper = &table_sync::MysqlTableMapper{} as &dyn ColumMapper;
    // let mapper = &table_sync::MssqlTableMapper{} as &dyn ColumMapper;

    let map = rbs::to_value!{
            "id":"INT",
            "name":"TEXT",
     };
    let _ = RBatis::sync(&rb,mapper,&map,"rb_user").await;


    RBatis::sync(
        &rb.acquire().await.unwrap(),
        mapper,
        &RBUser {
            id: 0,
            //// Custom String Database Type
            //name: Some("TEXT".to_string()),
            name: Some("".to_string()),
            //// Custom String Database Type
            //remark: Some("TEXT".to_string()),
            remark: Some("".to_string()),
            create_time: Some(DateTime::utc()),
            version: Some(1),
            delete_flag: Some(1),
        },
        "rb_user",
    )
        .await
        .unwrap();
}

```


#### 插件：拦截器

> 实现一个接口

```rust
use rbatis::{Error, RBatis};
use rbatis::executor::Executor;
use rbatis::intercept::{Intercept, ResultType};
use rbdc::db::ExecResult;
use rbs::Value;
#[derive(Debug)]
pub struct MyInterceptor{}

impl Intercept for MyInterceptor {
    /// task_id maybe is conn_id or tx_id,
    /// is_prepared_sql = !args.is_empty(),
    ///
    /// if return None will be return result
    /// if return Some(true) will be run next intercept
    /// if return Some(false) will be break
    fn before(
        &self,
        _task_id: i64,
        _rb: &dyn Executor,
        _sql: &mut String,
        _args: &mut Vec<Value>,
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,
    ) -> Result<Option<bool>, Error> {
        Ok(Some(true))
    }

    /// task_id maybe is conn_id or tx_id,
    /// is_prepared_sql = !args.is_empty(),
    ///
    /// if return None will be return result
    /// if return Some(true) will be run next intercept
    /// if return Some(false) will be break
    fn after(
        &self,
        _task_id: i64,
        _rb: &dyn Executor,
        _sql: &mut String,
        _args: &mut Vec<Value>,
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,
    ) -> Result<Option<bool>, Error> {
        Ok(Some(true))
    }
}
//push into RBatis
fn main(){
    let mut rb=RBatis::new();
    rb.intercepts.push(Arc::new(MyInterceptor{}) as Arc<dyn Intercept>);
}
```


#### 插件：分布式唯一ID（雪花算法(i64)）

```rust
    use rbatis::plugin::snowflake::new_snowflake_id;
    #[test]
    fn test_new_async_id() {
         //Snowflake::new()  //Snowflake::new(必须是单例或全局变量)
         //默认使用
         println!("{}", new_snowflake_id().to_string());
    }
```

#### 插件：分布式唯一ID（MongoDB 对象ID算法(String/u128)）

```rust
    #[test]
    async fn test_new_async_id() {
       println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
    }
```



#### 内置宏

* ``` make_table``` 依赖 Default trait 简化表结构构建
* ``` make_table_field_vec ``` 获取目标 Vec 成员属性的 Vec 集合
* ``` make_table_field_map ``` 获取目标 Vec 成员属性的 HashMap 集合

例如：
```rust
    use rbatis::rbdc::datetime::DateTime;
    use serde::{Deserialize, Serialize};
    #[derive(Clone, Debug, Deserialize, Serialize)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub pc_link: Option<String>,
        pub h5_link: Option<String>,
        pub pc_banner_img: Option<String>,
        pub h5_banner_img: Option<String>,
        pub sort: Option<String>,
        pub status: Option<i32>,
        pub remark: Option<String>,
        pub create_time: Option<DateTime>,
        pub version: Option<BigDecimal>,
        pub delete_flag: Option<i32>,
    }

    impl Default for BizActivity {
        fn default() -> Self {
            Self {
                id: None,
                name: None,
                pc_link: None,
                h5_link: None,
                pc_banner_img: None,
                h5_banner_img: None,
                sort: None,
                status: None,
                remark: None,
                create_time: None,
                version: None,
                delete_flag: None,
            }
        }
    }

    #[test]
    fn test_make_table() {
        let table = rbatis::make_table!(BizActivity{
              id:"1".to_string(),
        });
        println!("{:#?}", table);
    }

    #[test]
    fn test_table_field_map() {
        let table = rbatis::make_table!(BizActivity{
              id:"1".to_string(),
              name:"a".to_string()
        });
        let table_vec = vec![table];
        let map = rbatis::make_table_field_map!(&table_vec,name);
        println!("{:#?}", map);
        assert_eq!(map.len(), table_vec.len());
    }

    #[test]
    fn test_table_field_vec() {
        let table = rbatis::make_table!(BizActivity{
              id:"1".to_string(),
              name:"a".to_string()
        });
        let table_vec = vec![table];
        let names = rbatis::make_table_field_vec!(&table_vec,name);
        println!("{:#?}", names);
        assert_eq!(names.len(), table_vec.len());
    }
```


#### 设计驱动

* 本文档用于设计一个新的数据库驱动以加入 rbatis

* 示例请参见 [rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)

* 步骤0: 创建你的 cargo 项目，并在 Cargo.toml 中添加 'rbdc = "4"'
```
cargo new mock_driver --lib
```

* 步骤1: 添加依赖，或添加你的数据库驱动 crates 依赖。
```toml
rbdc = "4"
rbs  = "4"
fastdate = { version = "0.1" }
# xx_driver = {version = "xxx"}
```

* 步骤2: 定义你的驱动结构
```rust
#[derive(Debug, Clone)]
struct MockDriver {}
#[derive(Clone, Debug)]
struct MockRowMetaData {}
#[derive(Clone, Debug)]
struct MockRow {}
#[derive(Clone, Debug)]
struct MockConnection {}
#[derive(Clone, Debug)]
struct MockConnectOptions {}

```

* 步骤3: 实现 trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};

```rust
use std::any::Any;
use futures_core::future::BoxFuture;
use rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder, ExecResult};
use rbdc::Error;
use rbs::Value;

impl Driver for MockDriver {
    fn name(&self) -> &str {
        "MockDriver"
    }
    fn connect(&self, url: &str) -> BoxFuture<Result<Box<dyn Connection>, Error>> {
        let url = url.to_owned();
        Box::pin(async move {
            let conn = MockConnection {};
            Ok(Box::new(conn) as Box<dyn Connection>)
        })
    }

    fn connect_opt<'a>(
        &'a self,
        opt: &'a dyn ConnectOptions,
    ) -> BoxFuture<Result<Box<dyn Connection>, Error>> {
        let opt = opt.downcast_ref::<MockConnectOptions>().unwrap();
        Box::pin(async move {
            let conn = MockConnection {};
            Ok(Box::new(conn) as Box<dyn Connection>)
        })
    }

    fn default_option(&self) -> Box<dyn ConnectOptions> {
        Box::new(MockConnectOptions {})
    }
}

impl MetaData for MockRowMetaData {
    fn column_len(&self) -> usize {  todo!() }

    fn column_name(&self, i: usize) -> String {  todo!() }

    fn column_type(&self, i: usize) -> String {  todo!() }
}

impl Row for MockRow {
    fn meta_data(&self) -> Box<dyn MetaData> {  todo!() }

    fn get(&mut self, i: usize) -> Result<Value, Error> {  todo!() }
}

impl Connection for MockConnection {
    fn get_rows(&mut self, sql: &str, params: Vec<Value>) -> BoxFuture<Result<Vec<Box<dyn Row>>, Error>> {  todo!() }

    fn exec(&mut self, sql: &str, params: Vec<Value>) -> BoxFuture<Result<ExecResult, Error>> {  todo!() }

    fn close(&mut self) -> BoxFuture<Result<(), Error>> {  todo!() }

    fn ping(&mut self) -> BoxFuture<Result<(), Error>> {  todo!() }
}

impl ConnectOptions for MockConnectOptions {
    fn connect(&self) -> BoxFuture<Result<Box<dyn Connection>, Error>> {  todo!() }

    fn set_uri(&mut self, uri: &str) -> Result<(), Error> {  todo!() }
}

impl Placeholder for MockDriver {
    fn exchange(&self, sql: &str) -> String {
        //return rbdc::impl_exchange("@P", 1, sql); //TODO if database not support sql Placeholder '?',replace '@1' to '?'
        return sql.to_string();//if database is support sql Placeholder '?'
    }
}
```

* 步骤4: 在 rbatis 中加载你的驱动

```rust
#[tokio::main]
async fn main(){
    let mut rb = RBatis::new();
    rb.init(MockDriver {}, "xxx://xxx.db").unwrap();
    rb.acquire().await.expect("connect database fail");
    println!("connect database successful");
}
```

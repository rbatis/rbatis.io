### rbatis-v4

一个高性能的SQL工具包和编译时ORM库。一个异步的、纯`Rust`的SQL crate，具有编译时动态SQL特性。

它是一个ORM，一个小型编译器，一种动态SQL语言。

* 兼容大部分mybatis3语法。你可以开始将Java项目重写为`Rust`！
* 无运行时，无垃圾回收，高性能，基于Future/Tokio
* 零成本[动态SQL](../v4/dyn_sql.md)，使用(proc-macro,compile-time,Cow(减少不必要的克隆))技术实现。不需要ONGL引擎(mybatis)
* 类似JDBC的驱动设计，驱动使用cargo.toml依赖和```Box<dyn Driver>```分离
* 所有数据库驱动都支持```#{arg}```、```${arg}```、```?```占位符(pg/mssql自动处理'?'为'$1'和'@P1')
* 动态SQL(在SQL中自由编写代码)、分页、```py_sql```查询语言和```html_sql```(受Mybatis启发)。
* 动态配置连接池(基于https://github.com/rbatis/fast_pool)
* 支持基于拦截器实现的日志记录
* 100%安全的纯`Rust`，启用`#![forbid(unsafe_code)]`
* [rbatis/example](https://github.com/rbatis/example)
* [abs_admin项目](https://github.com/rbatis/abs_admin) 一个后台用户管理系统(Vue.js+rbatis+axum)


#### 支持的数据库驱动

> RBatis支持任何实现[rdbc](https://crates.io/crates/rbdc)驱动。
> 如果你没有想要的以下驱动，你可以自己编写，只要实现```rbdc::db::*``` trait即可

| 数据库(crates.io)                                 | github链接                                                                           |
|-----------------------------------------------------|---------------------------------------------------------------------------------------|
| [Mysql](https://crates.io/crates/rbdc-mysql)        | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [Postgres](https://crates.io/crates/rbdc-pg)        | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                | 
| [Sqlite](https://crates.io/crates/rbdc-sqlite)      | [rbatis/rbdc-sqlite](https://github.com/rbatis/rbatis/tree/master/rbdc-sqlite)        |
| [Mssql](https://crates.io/crates/rbdc-mssql)        | [rbatis/rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)          |
| [MariaDB](https://crates.io/crates/rbdc-mysql)      | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [TiDB](https://crates.io/crates/rbdc-mysql)         | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [CockroachDB](https://crates.io/crates/rbdc-pg)     | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |
| [Oracle](https://crates.io/crates/rbdc-oracle)      | [chenpengfan/rbdc-oracle](https://github.com/chenpengfan/rbdc-oracle)                 |
| [TDengine](https://crates.io/crates/rbdc-tdengine)  | [tdcare/rbdc-tdengine](https://github.com/tdcare/rbdc-tdengine)                       |


#### CRUD-安装/使用

* 安装步骤: Cargo.toml(运行命令`cargo update`)

* `toml`(默认)

```toml
#rbatis依赖
rbs = { version = "4.5"}
rbatis = { version = "4.5"}
rbdc-sqlite = { version = "4.5" }
#rbdc-mysql={version="4.5"}
#rbdc-pg={version="4.5"}
#rbdc-mssql={version="4.5"}

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```

* `toml` `native-tls` (选项)

```toml
rbs = { version = "4.5" }
rbdc-sqlite = { version = "4.5", default-features = false, features = ["tls-native-tls"] }
#rbdc-mysql={version="4.5", default-features = false, features = ["tls-native-tls"]}
#rbdc-pg={version="4.5", default-features = false, features = ["tls-native-tls"]}
#rbdc-mssql={version="4.5", default-features = false, features = ["tls-native-tls"]}
rbatis = { version = "4.5" }

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```



##### 表定义

> RBatis遵循简洁代码风格，因此数据库表结构只是一个可能使用RBatis提供的数据库类型的普通结构
> 我们使用```crud!()```宏```impl_*!()```宏使表结构具有查询和修改数据库的能力

> ```crud!```宏包含多个impl_**()宏，因此```crud!```是宏```impl_*!()```的超集

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
//crud = async fn insert(...)+async fn  select_by_map(...)+ async fn  update_by_map(...)+async fn  delete_by_map(...)...等等
rbatis::crud!(BizActivity {}); 

```

###### 自定义表名

> rbatis允许自定义表名，crud宏和impl_*()宏不同
> 就像sql ```select * from ${table_name} ```
```rust
rbatis::crud!(BizActivity {},"biz_activity"); // 这种方式自定义表名
rbatis::impl_select!(BizActivity{select_by_id(id:String) -> Option => "`where id = #{id} limit 1`"},"biz_activity");// 这种方式自定义表名/表列
rbatis::impl_select!(BizActivity{select_by_id2(table_name:&str,id:String) -> Option => "`where id = #{id} limit 1`"});// 这种方式自定义表名/表列
```

###### 自定义表列

> rbatis允许自定义表列，它支持任何```rbatis::impl_*!()```宏   
> 就像sql ```select ${table_column} from ${table_name} ```

```rust
rbatis::impl_select!(BizActivity{select_by_id(table_name:&str,table_column:&str,id:String) -> Option => "`where id = #{id} limit 1`"});
```

###### 宏-插入

```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;


use rbatis::rbdc::datetime::DateTime;
use serde_json::json;

/// 表
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

impl_insert!(BizActivity{});

#[tokio::main]
async fn main() {
    /// 启用日志crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接数据库 

    //init() 只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link() 将设置驱动并尝试使用acquire()连接数据库
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
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
impl_update!(BizActivity{update_by_name(name:&str) => "`where id = '2'`"});

#[tokio::main]
async fn main() {
    /// 启用日志crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接数据库 

    //init() 只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link() 将设置驱动并尝试使用acquire()连接数据库
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

    let data = BizActivity::update_by_name(&rb, &table, "2").await;
    println!("update_by_name = {}", json!(data));

}
```

###### 宏-查询

```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
crud!(BizActivity{});//crud = insert+select_by_map+update_by_map+delete_by_map
impl_select!(BizActivity{select_all_by_id(id:&str,name:&str) => "`where id = #{id} and name = #{name}`"});
impl_select!(BizActivity{select_by_id(id:&str) -> Option => "`where id = #{id} limit 1`"});


#[tokio::main]
async fn main() {
    /// 启用日志crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接数据库 

    //init() 只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link() 将设置驱动并尝试使用acquire()连接数据库
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
    
    let data = BizActivity::select_all_by_id(&rb, "1", "1").await;
    println!("select_all_by_id = {}", json!(data));

    let data = BizActivity::select_by_id(&rb, "1").await;
    println!("select_by_id = {}", json!(data));
}
```


###### 宏-分页查询

```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;

use rbatis::rbdc::datetime::DateTime;
use rbatis::sql::page::PageRequest;
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

impl_select_page!(BizActivity{select_page() =>"
     if !sql.contains('count(1)'):
       `order by create_time desc`"});
impl_select_page!(BizActivity{select_page_by_name(name:&str) =>"
     if name != null && name != '':
       `where name != #{name}`
     if name == '':
       `where name != ''`"});

/// postgres/mssql数据库不支持`limit 0,10`，你应该使用limit_sql:&str并设置`limit 10 offset 0`
impl_select_page!(BizActivity{select_page_by_limit(name:&str,limit_sql:&str) => "`where name != #{name}`"});

#[tokio::main]
async fn main() {
    /// 启用日志crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接数据库 

    //init() 只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link() 将设置驱动并尝试使用acquire()连接数据库
    // sqlite 
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql 
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql 
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    let data = BizActivity::select_page(&rb, &PageRequest::new(1, 10)).await;
    println!("select_page = {}", json!(data));

    let data = BizActivity::select_page_by_name(&rb, &PageRequest::new(1, 10), "").await;
    println!("select_page_by_name = {}", json!(data));

    let data = BizActivity::select_page_by_limit(&rb, &PageRequest::new(1, 10), "2", " limit 0,10 ").await;
    println!("select_page_by_limit = {}", json!(data));
}
```

###### 宏-删除

```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
crud!(BizActivity{});//crud = insert+select_by_map+update_by_map+delete_by_map

impl_delete!(BizActivity {delete_by_name(name:&str) => "`where name= '2'`"});

#[tokio::main]
async fn main() {
    /// 启用日志crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接数据库 

    //init() 只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link() 将设置驱动并尝试使用acquire()连接数据库
    // sqlite 
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql 
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql 
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    let data = BizActivity::delete_by_map(&rb, value!{"id": "2"}).await;
    println!("delete_by_map = {}", json!(data));

    let data = BizActivity::delete_by_name(&rb, "2").await;
    println!("delete_by_name = {}", json!(data));
}
```
#### 数据类型的转换
| Data Type                                                               | Support |
|-------------------------------------------------------------------------|---------|
| `Option`                                                                | ✓       |
| `Vec`                                                                   | ✓       |
| `HashMap`                                                               | ✓       |
| `i32, i64, f32, f64, bool, String`, 以及其他 Rust 基类型           | ✓       |
| `rbatis::rbdc::types::{Bytes, Date, DateTime, Time, Timestamp, Decimal, Json}` | ✓ |
| `rbatis::plugin::page::{Page, PageRequest}`                             | ✓       |
| `rbs::Value`                                                            | ✓       |
| `serde_json::Value` 和其他 serde 类型                               | ✓       |
| 来自 rbdc-mysql、rbdc-pg、rbdc-sqlite、rbdc-mssql 的驱动程序特定类型 | ✓       |


注：如果你遇到了一些类型不知道怎么转换，或者转换失败，你可以尝试先转换为serde_json::Value。

以下是作者的示例：将mysql 的 tinyint类型转换为rust的bool类型
```rust
use serde::{Deserialize, Deserializer, de};

#[derive(Debug, Deserialize)]
struct MyStruct {
    #[serde(deserialize_with = "bool_or_int")]
    my_field: bool,
}

fn bool_or_int<'de, D>(deserializer: D) -> Result<bool, D::Error>
where
    D: Deserializer<'de>,
{
    struct BoolOrIntVisitor;

    impl<'de> de::Visitor<'de> for BoolOrIntVisitor {
        type Value = bool;

        fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
            formatter.write_str("a boolean or an integer")
        }

        fn visit_bool<E>(self, value: bool) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(value)
        }

        fn visit_i32<E>(self, value: i32) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            // Map 0 to false, any other value to true
            Ok(value != 0)
        }
    }

    deserializer.deserialize_any(BoolOrIntVisitor)
}
```

参考：
-   https://github.com/rbatis/rbatis/pull/472
-   https://github.com/rbatis/rbatis/issues/324

#### debug_mode

如果你在Cargo.toml中开启"debug_mode"特性，你将看到以下特性

* 显示项目构建生成的代码(`rbatis_codgen`生成的代码)。你可以看到构建日志(`............gen macro py_sql :............`)
* 显示数据库`rows`数据。你可以看到日志(```query <= len=1,rows=[{"id":1}]```)
* 显示解码无效类型时哪个字段解析失败。你可以看到错误(```"invalid type: integer `1`, expected a string, key=`status`"```)

请注意，debug_mode应该将日志级别设置为'debug'

> 如何在Cargo.toml中开启debug_mode特性？
```toml
rbatis = { version = "4",features = ["debug_mode"]}
```

> 需要fast_log设置级别为Debug
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

`rbs`是`rbatis`为ORM中间语言`html_sql`、`py_sql`编写的专门序列化框架，
用于方便地在HTML语句中使用和替换类似JSON的对象，而不是操作原生结构。
你可以将`rbs`理解为类似于JSON `Value`的中间结构。

* 这里我们展示`rbs::Value`的定义
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

* rbs构建一个映射值
```rust
fn main(){
    let v = rbs::to_value!{
        "key":"value",
        "key2":"value2"
    };
}
```

* rbs编码为值
```rust
fn main(){
    let v = rbs::to_value!(1);
    let arg = vec![1,2,3];
    let v = rbs::to_value!(&arg);
    let arg = "1".to_string();
    let v = rbs::to_value!(&arg);
}
```

* rbs从值解码
```rust
fn main(){
    let v:i32 = rbs::from_value(Value::I32(1)).unwrap();
}
```

* 显示值
```rust
fn main(){
    let value = Value::I32(1);
    assert_eq!(value.to_string(),"1");
    assert_eq!(format!("{}",value),"1");
}
```


#### 事务

> 事务的本质是使用SQL语句BEGIN、COMMIT和ROLLBACK。
> RBatis提供这三个函数，但也支持```defer_async()```来防止忘记提交

示例[点这里](https://github.com/rbatis/rbatis/blob/master/example/src/transaction.rs)

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
    // defer_async 如果tx丢弃将回滚
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


#### 原始Sql

> RBatis也支持编写数据库的原始语句
> RBatis提供的驱动都支持占位符'?'，所以你可以在Postgres/mssql等上写'?'

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
> RBatis实现了一套兼容MyBtais3 SQL编辑语言，支持常见的if、Foreach、字符串插值等功能

* 当Cargo.toml中的RBatis依赖开启```debug_mode```特性时，会打印生成的函数实现代码
* 语言解析 -> 词法分析 -> 语法分析 -> 抽象语法树生成 -> 翻译为`Rust`代码。具有原生`Rust`的性能
* 当然，PySql也是使用HtmlSql的语法树，PySql将转换为HtmlSql
* 它使用crates [rbs](https://crates.io/crates/rbs) 的```rbs::Value```作为基础对象，并对任何函数进行操作
* 你可以在```rbs::Value```上调用任何方法/trait，如``` #{1 + 1}, #{arg}, #{arg [0]}, #{arg [0] + 'string'}  ```或```  if sql.contans('count'):   ```
* 字符串可以使用``` ` ```保留空格，如``` ` select * from table where ` ```
* 方法将在方法体上创建2个变量。因此你可以在分页操作中确定变量SQL是否包含COUNT语句或SELECT语句

* HtmlSql语法树

| 语法/方法                                                                                 | 生成的`Rust`代码                                                                               |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ``` <trim prefixOverrides=" and">` and name != '' `</trim> ```                                | `sql.trim(" and")                      `                                                            |
| ``` <if test="key == 'id'">`select * from table`</if> ```                                     | `if  key == "id"{sql.push_str("select * from table");}                      `                       |
| ``` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  ``` | `for (key,item) in arg{}               `                                                            |
| ``` <continue/>  ```                                                                          | `for (key,item) in arg{ continue;}     `                                                            |
| ``` <set>  ```                                                                                | `sql.trim("set ").push_str(" set ");        `                                                       |
| ``` <set collection="arg">  ```                                                               | `sql.trim("set ").push_str(" set name=?,age=? "); //注意 collection={name:"",age:""};           ` |
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
* 在`Rust`代码中定义[点这里](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql.rs)
```rust
// Clion智能提示: 点击代码，选择'Inject Language or Reference'，然后选择html
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


* 在`Rust`中从文件定义[点这里](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_file.rs)

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

> rust代码
```rust
#[html_sql("example/example.html")]
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {
    impled!()
}
```

> rust代码
```rust
htmlsql!(select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> rbatis::Result<Vec<BizActivity>> => "example.html");
```

##### 分页
> 实现html_sql选择分页。

你必须处理3个参数:
(do_count:bool,page_no:u64,page_size:u64)

你必须处理sql:
返回Vec<Record>（如果参数do_count = false）
返回u64（如果参数do_count = true）

就像这个示例:
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

```<include>```允许引用SQL块，甚至来自`xxxx.html`文件的SQL块，需要指定```refid```以进行正确引用

> 步骤1.定义```<sql id="a">` and id != '' `</sql>```

> 步骤2.使用``` <include refid="a"></include> ```或```<include refid="file://../rbatis/example/example.html?refid=a"></include>```

例如:
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

* 这是一种类似Python的语法，用于操作SQL语句和插入SQL参数的语言
* 语法树

| 语法/方法                                                 | 生成的`Rust`代码                                                                                   |
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
| `set collection='ids':                       `                | `sql.trim("set ").push_str(" set name=?,age=? "); //注意 collection={name:"",age:""};                  ` |
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

#### 插件: table-sync

> 这是一个插件，用于将表结构与代码中的表结构同步，我认为这在移动开发中非常重要。
> 注意它不会改变表结构。

* 如果表不存在，则创建
* 如果表存在但缺少列，则增加缺失部分的列

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
    // ------------选择数据库驱动------------
    //rb.init(rbdc_mysql::driver::MysqlDriver {}, "mysql://root:123456@localhost:3306/test").unwrap();
    // rb.init(rbdc_pg::driver::PgDriver {}, "postgres://postgres:123456@localhost:5432/postgres").unwrap();
    // rb.init(rbdc_mssql::driver::MssqlDriver {}, "mssql://SA:TestPass!123456@localhost:1433/test").unwrap();
    rb.init(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))
        .unwrap();
    // ------------选择数据库列映射器------------
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
            //// 自定义字符串数据库类型
            //name: Some("TEXT".to_string()),
            name: Some("".to_string()),
            //// 自定义字符串数据库类型
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


#### 插件: 拦截器

> 实现接口

```rust
use rbatis::{Error, RBatis};
use rbatis::executor::Executor;
use rbatis::intercept::{Intercept, ResultType};
use rbdc::db::ExecResult;
use rbs::Value;
#[derive(Debug)]
pub struct MyInterceptor{}

impl Intercept for MyInterceptor {
    /// task_id可能是conn_id或tx_id,
    /// is_prepared_sql = !args.is_empty(),
    ///
    /// 如果返回None将返回结果
    /// 如果返回Some(true)将运行下一个拦截器
    /// 如果返回Some(false)将中断
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

    /// task_id可能是conn_id或tx_id,
    /// is_prepared_sql = !args.is_empty(),
    ///
    /// 如果返回None将返回结果
    /// 如果返回Some(true)将运行下一个拦截器
    /// 如果返回Some(false)将中断
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
//推入RBatis
fn main(){
    let mut rb=RBatis::new();
    rb.intercepts.push(Arc::new(MyInterceptor{}) as Arc<dyn Intercept>);
}
```


#### 插件: 分布式唯一ID (雪花算法(i64))

```rust
    use rbatis::plugin::snowflake::new_snowflake_id;
    #[test]
    fn test_new_async_id() {
         //Snowflake::new()  //Snowflake::new(必须是单例或全局变量)
         //默认使用
         println!("{}", new_snowflake_id().to_string());
    }
```

#### 插件: 分布式唯一ID (MongoDB对象id算法(String/u128))

```rust
    #[test]
    async fn test_new_async_id() {
       println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
    }
```



#### 内置宏

* ``` make_table```  通过依赖Default trait简化表构造
* ``` make_table_field_vec ``` 获取目标Vec成员属性Vec集合
* ``` make_table_field_map ```  获取目标Vec成员属性的HashMap集合

例如:
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

* 这个文档用于设计一个新的数据库驱动加入rbatis

* 示例点这里[rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)

* 步骤0: 创建你的cargo项目，并在Cargo.toml中添加'rbdc = "4.5"'
```
cargo new mock_driver --lib
```

* 步骤1: 添加依赖，或添加你的数据库驱动crates依赖。
```toml
rbdc = "4.5"
rbs  = "4.5"
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

* 步骤3: 实现trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};

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
        //return rbdc::impl_exchange("@P", 1, sql); //TODO 如果数据库不支持sql占位符'?'，将'@1'替换为'?'
        return sql.to_string();//如果数据库支持sql占位符'?'
    }
}
```

* 步骤4: 在rbatis中加载你的驱动

```rust
#[tokio::main]
async fn main(){
    let mut rb = RBatis::new();
    rb.init(MockDriver {}, "xxx://xxx.db").unwrap();
    rb.acquire().await.expect("connect database fail");
    println!("connect database successful");
}
```
### rbatis-v4

高性能SQL工具包和编译时ORM库。一个异步、纯`Rust` SQL框架，特点是编译时动态SQL

它是一个ORM，一个小型编译器，一种动态SQL语言

* 兼容大多数mybatis3语法。您可以开始将Java项目重写为`Rust`！
* 无运行时，无垃圾回收，高性能，基于Future/Tokio
* 零成本[动态SQL](../v4/dyn_sql.md)，使用(proc-macro,编译时,Cow(减少不必要的克隆))
  技术实现。不需要ONGL引擎(mybatis)
* JDBC式驱动设计，驱动使用cargo.toml依赖和```Box<dyn Driver>```分离
* 所有数据库驱动支持```#{arg}```, ```${arg}```,```?```占位符(pg/mssql自动处理'?'到'$1'
  和'@P1')
* 动态SQL(在SQL中自由编写代码),分页,```py_sql```查询语言和```html_sql```(受Mybatis启发)
* 动态配置连接池(基于 https://github.com/rbatis/fast_pool)
* 支持基于拦截器实现的日志
* 100%安全纯`Rust`，启用`#![forbid(unsafe_code)]`
* [rbatis/example](https://github.com/rbatis/example)
* [abs_admin project](https://github.com/rbatis/abs_admin) 一个后台用户管理系统(Vue.js+rbatis+axum)


#### 支持的数据库驱动

> RBatis支持任何实现[rdbc](https://crates.io/crates/rbdc)驱动的数据库。
> 如果你没有找到你想要的驱动，你可以自己写一个，只要实现``` rbdc::db::* ```traits

| 数据库(crates.io)                                | github链接                                                                          |
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
rbs = { version = "4.6"}
rbatis = { version = "4.6"}
rbdc-sqlite = { version = "4.6" }
#rbdc-mysql={version="4.6"}
#rbdc-pg={version="4.6"}
#rbdc-mssql={version="4.6"}

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```

* `toml` `native-tls` (可选)

```toml
rbs = { version = "4.6" }
rbdc-sqlite = { version = "4.6", default-features = false, features = ["tls-native-tls"] }
#rbdc-mysql={version="4.6", default-features = false, features = ["tls-native-tls"]}
#rbdc-pg={version="4.6", default-features = false, features = ["tls-native-tls"]}
#rbdc-mssql={version="4.6", default-features = false, features = ["tls-native-tls"]}
rbatis = { version = "4.6" }

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```



##### 表定义

> RBatis遵循简洁的代码风格，数据库表结构只是一个可能使用RBatis提供的数据库类型的普通结构
> 我们使用```crud!()```宏和```impl_*!()```宏使表结构具有查询和修改数据库的能力

> ```crud!```宏包含几个impl_**()宏，因此```crud!```是宏的超集```impl_*!()```

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
//crud = async fn insert(...)+async fn select_by_map(...)+async fn update_by_map(...)+async fn delete_by_map(...)...以及更多
rbatis::crud!(BizActivity {}); 
```

###### 自定义表名

> rbatis允许自定义表名，crud宏和impl_*()宏有所不同
> 就像SQL ```select * from ${table_name} ```
```rust
rbatis::crud!(BizActivity {},"biz_activity"); // 这种方式自定义表名
rbatis::impl_select!(BizActivity{select_by_id(id:String) -> Option => "`where id = #{id} limit 1`"},"biz_activity");// 这种方式自定义表名/表列
rbatis::impl_select!(BizActivity{select_by_id2(table_name:&str,id:String) -> Option => "`where id = #{id} limit 1`"});// 这种方式自定义表名/表列
```

###### 自定义表列

> rbatis允许自定义表列，支持任何```rbatis::impl_*!()```宏   
> 就像SQL ```select ${table_column} from ${table_name} ```

```rust
rbatis::impl_select!(BizActivity{select_by_id(table_name:&str,table_column:&str,id:String) -> Option => "`where id = #{id} limit 1`"});
```

###### 宏-插入

```rust
//#[macro_use] 在'根crate'或'mod.rs'或'main.rs'中定义
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
    /// 启用log crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis初始化失败");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接到数据库 

    //init()只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link()将设置驱动并尝试使用acquire()链接数据库
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
//#[macro_use] 在'根crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;

use rbs::value;
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
    /// 启用log crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis初始化失败");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接到数据库 

    //init()只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link()将设置驱动并尝试使用acquire()链接数据库
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

    // 使用map条件更新
    let data = BizActivity::update_by_map(&rb, &table, value!{ "id": "1" }).await;
    println!("update_by_map = {}", json!(data));

    let data = BizActivity::update_by_name(&rb, &table, "2").await;
    println!("update_by_name = {}", json!(data));
}
```

###### 宏-查询

```rust
//#[macro_use] 在'根crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;

use rbs::value;
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
    /// 启用log crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis初始化失败");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接到数据库 

    //init()只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link()将设置驱动并尝试使用acquire()链接数据库
    // sqlite 
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql 
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql 
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    // 使用map条件查询
    let data = BizActivity::select_by_map(&rb, value!{"id":"2","name":"Activity 2"}).await;
    println!("select_by_map = {}", json!(data));
    
    // LIKE查询
    let data = BizActivity::select_by_map(&rb, value!{"name like ":"%Activity%"}).await;
    println!("select_by_map like = {}", json!(data));
    
    // 大于查询
    let data = BizActivity::select_by_map(&rb, value!{"id > ":"2"}).await;
    println!("select_by_map gt = {}", json!(data));
    
    // IN查询
    let data = BizActivity::select_by_map(&rb, value!{"id": &["1", "2", "3"]}).await;
    println!("select_by_map in = {}", json!(data));

    // 使用自定义查询方法
    let data = BizActivity::select_all_by_id(&rb, "1", "1").await;
    println!("select_all_by_id = {}", json!(data));

    let data = BizActivity::select_by_id(&rb, "1").await;
    println!("select_by_id = {}", json!(data));
}
```


###### 宏-分页查询

```rust
//#[macro_use] 在'根crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;

use rbs::value;
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

/// postgres/mssql数据库不支持`limit 0,10`，应该使用limit_sql:&str并设置`limit 10 offset 0`
impl_select_page!(BizActivity{select_page_by_limit(name:&str,limit_sql:&str) => "`where name != #{name}`"});

#[tokio::main]
async fn main() {
    /// 启用log crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis初始化失败");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接到数据库 

    //init()只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link()将设置驱动并尝试使用acquire()链接数据库
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
//#[macro_use] 在'根crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;

use rbs::value;
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
    /// 启用log crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis初始化失败");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接到数据库 

    //init()只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link()将设置驱动并尝试使用acquire()链接数据库
    // sqlite 
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql 
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql 
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();

    // 使用map条件删除
    let data = BizActivity::delete_by_map(&rb, value!{"id": &["1", "2", "3"]}).await;
    println!("delete_by_map = {}", json!(data));

    let data = BizActivity::delete_by_name(&rb, "2").await;
    println!("delete_by_name = {}", json!(data));
}
```

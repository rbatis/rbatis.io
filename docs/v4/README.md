
### rbatis-v4

A highly Performant SQL Toolkit and Compile time ORM Library. An async, pure `Rust` SQL crate featuring compile-time Dynamic SQL

It is an ORM, a small compiler, a dynamic SQL languages

* Compatible with most mybatis3 syntax.You can start recoding Java projects into `Rust`!
* No Runtimes，No Garbage Collection,High performance, Based on Future/Tokio
* Zero cost [Dynamic SQL](../v4/dyn_sql.md), implemented using (proc-macro,compile-time,Cow(Reduce unnecessary cloning))
  techniques。 don't need ONGL engine(mybatis)
* JDBC-like driver design, driver use cargo.toml dependency and ```Box<dyn Driver>``` separation
* All database drivers supported ```#{arg}```, ```${arg}```,```?```  placeholder(pg/mssql auto processing '?' to '$1'
  and '@P1')
* Dynamic SQL(Write code freely in SQL),pagination, ```py_sql``` query lang and ```html_sql```(Inspired Mybatis).
* Dynamic configuration connection pool(Based on the https://github.com/rbatis/fast_pool)
* Supports logging, customizable logging based on `log` crate
* 100% Safe `Rust` with `#![forbid(unsafe_code)]` enabled
* Support use Trait System Add ```py_sql/ html_sql```
  functions.[see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_custom_func.rs)
* [rbatis/example (import into Clion!)](example/src)
* [abs_admin project](https://github.com/rbatis/abs_admin)  an complete background user management system(
  Vue.js+rbatis+actix-web)


#### Supported database driver

> the RBatis support any impl [rdbc](https://crates.io/crates/rbdc) drivers.
> If you don't have the following driver you want, you can write one yourself, just as long as the impl ``` rbdc::db::* ``` traits

| database(crates.io)                                 | github_link                                                                    |
|-----------------------------------------------------|--------------------------------------------------------------------------------|
| [Mysql](https://crates.io/crates/rbdc-mysql)        | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)   |
| [Postgres](https://crates.io/crates/rbdc-pg)        | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)         |
| [Sqlite](https://crates.io/crates/rbdc-sqlite)      | [rbatis/rbdc-sqlite](https://github.com/rbatis/rbatis/tree/master/rbdc-sqlite) |
| [Mssql](https://crates.io/crates/rbdc-mssql)        | [rbatis/rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)   |
| [MariaDB](https://crates.io/crates/rbdc-mysql)      | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)   |
| [TiDB](https://crates.io/crates/rbdc-mysql)         | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)   |
| [CockroachDB](https://crates.io/crates/rbdc-pg)     | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)         |
| [Oracle](https://crates.io/crates/rbdc-oracle)      | [chenpengfan/rbdc-oracle](https://github.com/chenpengfan/rbdc-oracle)          |
| [TDengine](https://crates.io/crates/rbdc-tdengine)  | [tdcare/rbdc-tdengine](https://github.com/tdcare/rbdc-tdengine)                |


#### CRUD-install/use

* install step: Cargo.toml(run command `cargo update`)

* `toml`(default)

```toml
#rbatis deps
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

* `toml` `native-tls` (option)

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



##### TableDefine

> RBatis follows a clean code style,so that A database table structure is just a normal structure that may use the database types provided by RBatis
> We use the ```crud!()``` macro ``` impl_*!() ``` macro Enables the table structure to have the ability to query and modify the database

> ```crud!``` macros contains several impl_**() macros,so. ```crud!``` is a superset of macros ```impl_*!()```

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
//crud = async fn insert(...)+async fn  select_by_column(...)+ async fn  update_by_column(...)+async fn  delete_by_column(...)...and more
rbatis::crud!(BizActivity {}); 

```

###### custom table_name

> rbatis allow custom your table_name, crud macro and impl_*() macro is different
> just like sql ```select * from ${table_name} ```
```rust
rbatis::crud!(BizActivity {},"biz_activity"); // this way custom table name
rbatis::impl_select!(BizActivity{select_by_id(id:String) -> Option => "`where id = #{id} limit 1`"},"biz_activity");// this way custom table_name/table_column
rbatis::impl_select!(BizActivity{select_by_id2(table_name:&str,id:String) -> Option => "`where id = #{id} limit 1`"});// this way custom table_name/table_column
```

###### custom table_column

> rbatis allow custom your table_column,it's support any ```rbatis::impl_*!()``` macros   
> just like sql ```select ${table_column} from ${table_name} ```

```rust
rbatis::impl_select!(BizActivity{select_by_id(table_name:&str,table_column:&str,id:String) -> Option => "`where id = #{id} limit 1`"});
```

###### macros-insert

```rust
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'
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

impl_insert!(BizActivity{});

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

###### macros-update

```rust
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'
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

    let data = BizActivity::update_by_column(&rb, &table, "id").await;
    println!("update_by_column = {}", json!(data));

    let data = BizActivity::update_by_name(&rb, &table, "2").await;
    println!("update_by_name = {}", json!(data));

}
```

###### macros-select

```rust
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'
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
crud!(BizActivity{});//crud = insert+select_by_column+update_by_column+delete_by_column
impl_select!(BizActivity{select_all_by_id(id:&str,name:&str) => "`where id = #{id} and name = #{name}`"});
impl_select!(BizActivity{select_by_id(id:&str) -> Option => "`where id = #{id} limit 1`"});


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

    let data = BizActivity::select_by_column(&rb, "id","1").await;
    println!("select_by_id = {}", json!(data));
    
    let data = BizActivity::select_all_by_id(&rb, "1", "1").await;
    println!("select_all_by_id = {}", json!(data));

    let data = BizActivity::select_by_id(&rb, "1").await;
    println!("select_by_id = {}", json!(data));
}
```


###### macros-select-page

```rust
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'
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

/// postgres/mssql database not support `limit 0,10`,you should use limit_sql:&str and set `limit 10 offset 0`
impl_select_page!(BizActivity{select_page_by_limit(name:&str,limit_sql:&str) => "`where name != #{name}`"});

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

    let data = BizActivity::select_page(&rb, &PageRequest::new(1, 10)).await;
    println!("select_page = {}", json!(data));

    let data = BizActivity::select_page_by_name(&rb, &PageRequest::new(1, 10), "").await;
    println!("select_page_by_name = {}", json!(data));

    let data = BizActivity::select_page_by_limit(&rb, &PageRequest::new(1, 10), "2", " limit 0,10 ").await;
    println!("select_page_by_limit = {}", json!(data));
}
```

###### macros-delete

```rust
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'
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
crud!(BizActivity{});//crud = insert+select_by_column+update_by_column+delete_by_column

impl_delete!(BizActivity {delete_by_name(name:&str) => "`where name= '2'`"});

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

    let data = BizActivity::delete_by_column(&rb, "id", "2").await;
    println!("delete_by_column = {}", json!(data));

    let data = BizActivity::delete_by_name(&rb, "2").await;
    println!("delete_by_column = {}", json!(data));
}
```

* ```cargo run```  log

```log
2023-02-19 19:56:42.1172336 INFO rbatis::plugin::log - [rbatis] [469835037769076736] exec  => `insert into biz_activity (id,name,pc_link,h5_link,pc_banner_img,h5_banner_img,sort,status,remark,create_time,version,delete_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)` ["2","2","2","2",null,null,null,2,"2",DateTime("2023-02-19 19:56:42.1171254"),1,1]
2023-02-19 19:56:42.1186233 INFO rbatis::plugin::log - [rbatis] [469835037769076736] exec  <= rows_affected=1
insert = {"Ok":{"last_insert_id":6,"rows_affected":1}}
2023-02-19 19:56:42.1187311 INFO rbatis::plugin::log - [rbatis] [469835037773271040] query => `select * from biz_activity where id = ? and name = ?` ["1","1"]
2023-02-19 19:56:42.1189244 INFO rbatis::plugin::log - [rbatis] [469835037773271040] query <= len=0,rows=[]
select_all_by_id = {"Ok":[]}
2023-02-19 19:56:42.1189982 INFO rbatis::plugin::log - [rbatis] [469835037773271041] query => `select * from biz_activity where id = ? limit 1` ["1"]
2023-02-19 19:56:42.1191375 INFO rbatis::plugin::log - [rbatis] [469835037773271041] query <= len=0,rows=[]
select_by_id = {"Ok":null}
2023-02-19 19:56:42.1192367 INFO rbatis::plugin::log - [rbatis] [469835037777465344] exec  => `update biz_activity set name=?,pc_link=?,h5_link=?,status=?,remark=?,create_time=?,version=?,delete_flag=? where id = ?` ["2","2","2",2,"2",DateTime("2023-02-19 19:56:42.1171254"),1,1,"2"]
2023-02-19 19:56:42.1193645 INFO rbatis::plugin::log - [rbatis] [469835037777465344] exec  <= rows_affected=1
update_by_column = {"Ok":{"last_insert_id":6,"rows_affected":1}}
2023-02-19 19:56:42.1194569 INFO rbatis::plugin::log - [rbatis] [469835037777465345] exec  => `update biz_activity set id=?,name=?,pc_link=?,h5_link=?,status=?,remark=?,create_time=?,version=?,delete_flag=? where id = 1` ["2","2","2","2",2,"2",DateTime("2023-02-19 19:56:42.1171254"),1,1]
update_by_name = {"Ok":{"last_insert_id":6,"rows_affected":0}}
2023-02-19 19:56:42.1195986 INFO rbatis::plugin::log - [rbatis] [469835037777465345] exec  <= rows_affected=0
2023-02-19 19:56:42.1196641 INFO rbatis::plugin::log - [rbatis] [469835037777465346] exec  => `delete from biz_activity where id = ?` ["2"]
2023-02-19 19:56:42.1204548 INFO rbatis::plugin::log - [rbatis] [469835037777465346] exec  <= rows_affected=1
delete_by_column = {"Ok":{"last_insert_id":6,"rows_affected":1}}
2023-02-19 19:56:42.1205258 INFO rbatis::plugin::log - [rbatis] [469835037781659648] exec  => `delete from biz_activity where name= '2'` []
delete_by_column = {"Ok":{"last_insert_id":6,"rows_affected":0}}
2023-02-19 19:56:42.1205991 INFO rbatis::plugin::log - [rbatis] [469835037781659648] exec  <= rows_affected=0
2023-02-19 19:56:42.1206568 INFO rbatis::plugin::log - [rbatis] [469835037781659649] query => `select count(1) as count from biz_activity where name != ?` ["2"]
2023-02-19 19:56:42.1207777 INFO rbatis::plugin::log - [rbatis] [469835037781659649] query <= len=1,rows=[{"count":4}]
2023-02-19 19:56:42.1208308 INFO rbatis::plugin::log - [rbatis] [469835037781659650] query => `select * from biz_activity where name != ? limit 0,10` ["2"]
2023-02-19 19:56:42.121063  INFO rbatis::plugin::log - [rbatis] [469835037781659650] query <= len=4,rows=[{"h5_banner_img":"","pc_banner_img":"","delete_flag":0,"create_time":"2020-06-17 20:08:13","remark":"","version":0,"status":0,"sort":"1","h5_link":"","pc_link":"","name":"test_insret","id":"178"},{"h5_banner_img":"","pc_banner_img":"","delete_flag":0,"create_time":"2020-06-17 20:10:23","remark":"","version":0,"status":0,"sort":"0","h5_link":"","pc_link":"","name":"test","id":"221"},{"h5_banner_img":"","pc_banner_img":"","delete_flag":0,"create_time":"2020-06-17 20:10:23","remark":"","version":0,"status":0,"sort":"0","h5_link":"","pc_link":"","name":"test","id":"222"},{"h5_banner_img":"","pc_banner_img":"","delete_flag":0,"create_time":"2020-06-17 20:10:23","remark":"","version":0,"status":0,"sort":"0","h5_link":"","pc_link":"","name":"test","id":"223"}]
select_page = {"Ok":{"page_no":1,"page_size":10,"pages":1,"records":[{"create_time":"2020-06-17 20:08:13","delete_flag":0,"h5_banner_img":"","h5_link":"","id":"178","name":"test_insret","pc_banner_img":"","pc_link":"","remark":"","sort":"1","status":0,"version":0},{"create_time":"2020-06-17 20:10:23","delete_flag":0,"h5_banner_img":"","h5_link":"","id":"221","name":"test","pc_banner_img":"","pc_link":"","remark":"","sort":"0","status":0,"version":0},{"create_time":"2020-06-17 20:10:23","delete_flag":0,"h5_banner_img":"","h5_link":"","id":"222","name":"test","pc_banner_img":"","pc_link":"","remark":"","sort":"0","status":0,"version":0},{"create_time":"2020-06-17 20:10:23","delete_flag":0,"h5_banner_img":"","h5_link":"","id":"223","name":"test","pc_banner_img":"","pc_link":"","remark":"","sort":"0","status":0,"version":0}],"search_count":true,"total":4}}
```

#### debug_mode

if you open features on Cargo.toml "debug_mode", You will see the following features

*  show the project build Generated code(`rbatis_codgen` Generated code). you can see build log(`............gen macro py_sql :............`)
*  show the database `rows` data . you can see log(```query <= len=1,rows=[{"id":1}]```)
*  show decoding invalid type Which field did the parsing fail. you can see error(```"invalid type: integer `1`, expected a string, key=`status`"```)

please notice, debug_mode should set log level to 'debug'

> how to open debug_mode features on Cargo.toml?
```toml
rbatis = { version = "4",features = ["debug_mode"]}
```

> need fast_log set level = Debug
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





#### Transaction

> The essence of a transaction is to use the SQL statements BEGIN, COMMIT, and ROLLBACK.
> The RBatis provides these three functions but also support ```defer_async()``` to prevent forgotten commits 

example [see](https://github.com/rbatis/rbatis/blob/master/example/src/transaction.rs)

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
    let mut tx = rb.acquire_begin().await.unwrap();
    // defer_async will be rollback if tx drop
    // let mut tx = tx.defer_async(|mut tx| async move {
    //     if !tx.done {
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


#### Raw Sql

> the RBatis also support Write the original statements of the database
> And the drivers provided by RBatis all support placeholder '?',so you can write '?' on Postgres/mssql...and more

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


#### HtmlSql
> It is implemented by RBatis a set of compatible MyBtais3 SQL editing language, support common such as if, Foreach, string interpolation

* When the RBatis dependency in Cargo.toml turns on the ```debug_mode``` feature, the generated function implementation code is printed
* Language parsing -> Lexical analysis -> Syntax analysis -> generation of abstract syntax trees ->  translation to `Rust` code。Have the performance of native `Rust`
* Of course, PySql is also a syntax tree using HtmlSql,PySql will be Convert to HtmlSql
* It uses crates [rbs](https://crates.io/crates/rbs)  of   ```rbs::Value``` as the base object and operates on and any func
* you can call any method/trait on ```rbs::Value``` such as ``` #{1 + 1}, #{arg}, #{arg [0]}, #{arg [0] + 'string'}  ``` or  ```  if sql.contans('count'):   ```
* Strings can be reserved for Spaces using ``` ` ``` such as ``` ` select * from table where ` ```
* method will create 2 variable on method body.So you can determine whether the variable SQL contains a COUNT statement or a SELECT statement in a paging operation
```rust
let mut sql = String::with_capacity(1000);
let mut args = Vec::with_capacity(20);
```

* HtmlSql Syntax tree

| Syntax/method                                                                                 | Generated `Rust` code                                                             |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| ``` <trim prefixOverrides=" and">` and name != '' `</trim> ```                                | `sql.trim(" and")                      `                                          |
| ``` <if test="key == 'id'">`select * from table`</if> ```                                     | `if  key == "id"{sql.push_str("select * from table");}                      `     |
| ``` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  ``` | `for (key,item) in arg{}               `                                          |
| ``` <continue/>  ```                                                                          | `for (key,item) in arg{ continue;}     `                                          |
| ``` <set>  ```                                                                                | `sql.push_str("SET").trim("SET")       `                                          |
| ``` <choose>  ```                                                                             | `match {}                              `                                          |
| ``` <when test="true">  ```                                                                   | `match true{ true=>{} _ => {} }        `                                          |
| ``` <otherwise>  ```                                                                          | `match { _ =>{} }                      `                                          |
| ``` <where>  ```                                                                              | `sql.push_str("WHERE").trim("WHERE")       `                                      |
| ``` <bind name="a" value="1+1"></bind> ```                                                    | `let a = rbs::Value::I32(1 + 1)            `                                      |
| ``` `select * from table`    ```                                                              | `sql.push_str("select * from table"); `                                           |
| ``` `#{name}`    ```                                                                          | `sql.push_str("?");args.push(rbs::Value::String(name));`                          |
| ``` `${name}`     ```                                                                         | `sql.push_str(&format!("{}",name));                    `                          |
| ``` `${1 + 1}`   ```                                                                          | `sql.push_str(&format!("{}", 1 + 1));    `                                        |
| ``` `#{1 + 1}`   ```                                                                          | `sql.push_str("?");args.push(rbs::Value::from(1+1));`                             |
| ``` `${name + '_tag'}`  ```                                                                   | `sql.push_str(&format!("{}",name + "_tag"));    `                                 |
| ``` `#{name + '_tag'}`  ```                                                                   | `sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    ` |
| ``` `${age + 1}`  ```                                                                         | `sql.push_str(&format!("{}", age + 1));    `                                      |
| ``` `#{age + 1}`  ```                                                                         | `sql.push_str("?");args.push(rbs::Value::from(age+1));     `                      |
| ``` `${true  & true}`  ```                                                                    | `sql.push_str(&format!("{}", true & true));    `                                  |
| ``` `#{true  & true}`  ```                                                                    | `sql.push_str("?");args.push(rbs::Value::from(true & true));    `                 |
| ``` `${2 >  1}`  ```                                                                          | `sql.push_str(&format!("{}",2 >  1));    `                                        |
| ``` `${2 /  1}`  ```                                                                          | `sql.push_str(&format!("{}", 2 / 1));    `                                        |
| ``` `${2 ==  1}`  ```                                                                         | `sql.push_str(&format!("{}", 2 == 1));    `                                       |
| ``` `${2 *  1}`  ```                                                                          | `sql.push_str(&format!("{}", 2 * 1));    `                                        |
| ``` `${ !false }`  ```                                                                        | `sql.push_str(&format!("{}", !false));    `                                       |
| ``` `${ 2 % 1 }`  ```                                                                         | `sql.push_str(&format!("{}", 2 % 1));    `                                        |
| ``` `${ 2 - 1 }`  ```                                                                         | `sql.push_str(&format!("{}", 2 - 1));    `                                        |
* define on `Rust` code [see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql.rs)
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


* define on `Rust` from file [see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_an_file.rs)

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

> rust code
```rust
#[html_sql("example/example.html")]
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {
    impled!()
}
```

> rust code
```rust
htmlsql!(select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> rbatis::Result<Vec<BizActivity>> => "example.html");
```

##### Page
> impl html_sql select page.
  
   you must deal with 3 param:
   (do_count:bool,page_no:u64,page_size:u64)
  
   you must deal with sql:
   return Vec<Record>（if param do_count = false）
   return u64（if param do_count = true）
  
   just like this exmaple:
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


##### Include

```<include>``` allows reference  SQL blocks and even SQL blocks from `xxxx.html` files, requiring ```refid``` to be specified for proper reference

> step1.define ```<sql id="a">` and id != '' `</sql>``` 

> step2.use ``` <include refid="a"></include> ``` or ```<include refid="file://../rbatis/example/example.html?refid=a"></include>```

for example:
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

#### PySql

* It is a Python-like syntax, a language for manipulating SQL statements and inserting SQL parameters
* Syntax tree 

| Syntax/method                                                 | Generated `Rust` code                                                             |
|---------------------------------------------------------------|-----------------------------------------------------------------------------------|
| `trim 'AND ':      `                                          | `sql.trim_end_matches("AND ").trim_start_matches("AND ")       `                  |
| `trim start='AND ':      `                                    | `sql.trim_start_matches("AND ")      `                                            |
| `trim end='AND ':      `                                      | `sql.trim_end_matches("AND ")      `                                              |
| `if arg!=1:         `                                         | `if arg !=1 {}               `                                                    |
| `if true:`<br/>   ```  `select * from table` ```              | ```if true { sql.push_str("select * from table");}  ```                           |
| `for key,item in arg:      `                                  | `for (key,item) in arg{ }     `                                                   |
| `for key,item in arg:`<br/>  ```  `and name = ${name}`    ``` | `for (key,item) in arg{ sql.push_str(&format!("and name = {}",name)); }     `     |
| `for key,item in arg:`<br/>  ```  `continue:`            ```  | `for (key,item) in arg{ continue; }      `                                        |
| `set :                       `                                | `sql.push_str("SET").trim("SET")        `                                         |
| `choose :                     `                               | `match {}                                `                                        |
| `when :              `                                        | `match true{ true=>{} _ => {} }       `                                           |
| `otherwise :           `                                      | `match { _ =>{} }                    `                                            |
| `_:              `                                            | `match { _ =>{} }(v1.8.54 later)         `                                        |
| `where :              `                                       | `sql.push_str("WHERE").trim("WHERE")    `                                         |
| `bind a=1+1:       `                                          | `let a = rbs::Value::I32(1 + 1) `                                                 |
| `let  a=1+1:     `                                            | `let a = rbs::Value::I32(1 + 1) `  (v1.8.54 later)                                |
| ``` `select * from table`    ```                              | `sql.push_str("select * from table"); `                                           |
| ``` `#{name}`    ```                                          | `sql.push_str("?");args.push(rbs::Value::String(name));`                          |
| ``` `${name}`     ```                                         | `sql.push_str(&format!("{}",name));                    `                          |
| ``` `${1 + 1}`   ```                                          | `sql.push_str(&format!("{}", 1 + 1));    `                                        |
| ``` `#{1 + 1}`   ```                                          | `sql.push_str("?");args.push(rbs::Value::from(1+1));`                             |
| ``` `${name + '_tag'}`  ```                                   | `sql.push_str(&format!("{}",name.to_string() + "_tag"));    `                     |
| ``` `#{name + '_tag'}`  ```                                   | `sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    ` |
| ``` `${age + 1}`  ```                                         | `sql.push_str(&format!("{}", age + 1));    `                                      |
| ``` `#{age + 1}`  ```                                         | `sql.push_str("?");args.push(rbs::Value::from(age+1));     `                      |
| ``` `${true  & true}`  ```                                    | `sql.push_str(&format!("{}", true & true));    `                                  |
| ``` `#{true  & true}`  ```                                    | `sql.push_str("?");args.push(rbs::Value::from(true & true));    `                 |
| ``` `${2 >  1}`  ```                                          | `sql.push_str(&format!("{}",2 >  1));    `                                        |
| ``` `${2 /  1}`  ```                                          | `sql.push_str(&format!("{}", 2 / 1));    `                                        |
| ``` `${2 ==  1}`  ```                                         | `sql.push_str(&format!("{}", 2 == 1));    `                                       |
| ``` `${2 *  1}`  ```                                          | `sql.push_str(&format!("{}", 2 * 1));    `                                        |
| ``` `${ !false }`  ```                                        | `sql.push_str(&format!("{}", !false));    `                                       |
| ``` `${ 2 % 1 }`  ```                                         | `sql.push_str(&format!("{}", 2 % 1));    `                                        |
| ``` `${ 2 - 1 }`  ```                                         | `sql.push_str(&format!("{}", 2 - 1));    `                                        |



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

#### plugin: table-sync

> This IS a PLUGIN THAT SYNCHRONIZES THE TABLE STRUCTURE WITH THE TABLE STRUCTURE IN THE code, which I believe is VERY important in MOBILE DEVELOPMENT.
> Note that it does not change the table structure.

* If the table does not exist, it is created
* If the table exists but a column is missing, increment the column of the missing section

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


#### plugin: Intercept

> Implementing an interface

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
    /// if return Ok(false) will be return data. return Ok(true) will run next
    fn before(
        &self,
        _task_id: i64,
        _rb: &dyn Executor,
        _sql: &mut String,
        _args: &mut Vec<Value>,
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,
    ) -> Result<bool, Error> {
        Ok(true)
    }

    /// task_id maybe is conn_id or tx_id,
    /// is_prepared_sql = !args.is_empty(),
    /// if return Ok(false) will be return data. return Ok(true) will run next
    fn after(
        &self,
        _task_id: i64,
        _rb: &dyn Executor,
        _sql: &mut String,
        _args: &mut Vec<Value>,
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,
    ) -> Result<bool, Error> {
        Ok(true)
    }
}
//push into RBatis
fn main(){
    let mut rb=RBatis::new();
    rb.intercepts.push(Arc::new(MyInterceptor{}) as Arc<dyn Intercept>);
}
```


#### Plug-in: distributed unique ID (snowflake algorithm(i64))

```rust
    use rbatis::plugin::snowflake::new_snowflake_id;
    #[test]
    fn test_new_async_id() {
         //Snowflake::new()  //Snowflake::new(Must be a singleton or global variable)
         //default use
         println!("{}", new_snowflake_id().to_string());
    }
```

#### Plug-in: distributed unique ID (MongoDB object id algorithm(String/u128))

```rust
    #[test]
    async fn test_new_async_id() {
       println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
    }
```



#### macro-built-in

* ``` make_table```  Simplifies table construction by relying on the Default trait
* ``` make_table_field_vec ``` take the target Vec member attribute Vec collection
* ``` make_table_field_map ```  Gets the HashMap collection of member attributes of the target Vec

for example:
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


#### design-driver

* This doc is used to design a new database driver to join into rbatis

* example see [rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)

* step0: create your cargo project,and add 'rbdc = "4.5"' on Cargo.toml
```
cargo new mock_driver --lib
```

* step1: add Depend,or add your database driver crates depend.
```toml
rbdc = "4.5"
rbs  = "4.5"
fastdate = { version = "0.1" }
# xx_driver = {version = "xxx"}
```

* step2: define you driver struct
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

* step3: impl trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};

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

* step4: load your driver on rbatis

```rust
#[tokio::main]
async fn main(){
    let mut rb = RBatis::new();
    rb.init(MockDriver {}, "xxx://xxx.db").unwrap();
    rb.acquire().await.expect("connect database fail");
    println!("connect database successful");
}
```

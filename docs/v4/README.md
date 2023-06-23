
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
* Dynamic configuration connection pool(Based on the mobc)
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
rbs = { version = "4.3"}
rbatis = { version = "4.3"}
rbdc-sqlite = { version = "4.3" }
#rbdc-mysql={version="4.3"}
#rbdc-pg={version="4.3"}
#rbdc-mssql={version="4.3"}

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.5"
```

* `toml` `native-tls` (option)

```toml
rbs = { version = "4.3" }
rbdc-sqlite = { version = "4.3", default-features = false, features = ["tls-native-tls"] }
#rbdc-mysql={version="4.3", default-features = false, features = ["tls-native-tls"]}
#rbdc-pg={version="4.3", default-features = false, features = ["tls-native-tls"]}
#rbdc-mssql={version="4.3", default-features = false, features = ["tls-native-tls"]}
rbatis = { version = "4.3", default-features = false, features = ["tls-native-tls","default_mode"] }

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.5"
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
    pub create_time: Option<FastDateTime>,
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

###### macros example

```rust
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'
#[macro_use]
extern crate rbatis;
extern crate rbdc;

use rbatis::{impl_insert, impl_insert, impl_update, impl_delete, impl_select_page};
use rbatis::rbdc::datetime::FastDateTime;

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
    pub create_time: Option<FastDateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}
crud!(BizActivity{});//crud = insert+select_by_column+update_by_column+delete_by_column

impl_select!(BizActivity{select_all_by_id(id:&str,name:&str) => "`where id = #{id} and name = #{name}`"});
impl_select!(BizActivity{select_by_id(id:String) -> Option => "`where id = #{id} limit 1`"});
impl_update!(BizActivity{update_by_name(name:&str) => "`where id = 1`"});
impl_delete!(BizActivity {delete_by_name(name:&str) => "`where name= '2'`"});
//limiting condition：maybe pg/mssql not support sql `limit 0,10` you should add arg  `limit_sql:&str` of set limit_sql = " limit 0 offset 10"
//`impl_select_page!(BizActivity{select_page(name:&str,limit_sql:&str) => "`where name != #{name}`"});`
impl_select_page!(BizActivity{select_page(name:&str) => "`where name != #{name}`"});

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

    let activity = BizActivity {
        id: Some("2".into()),
        name: Some("2".into()),
        pc_link: Some("2".into()),
        h5_link: Some("2".into()),
        pc_banner_img: None,
        h5_banner_img: None,
        sort: None,
        status: Some(2),
        remark: Some("2".into()),
        create_time: Some(FastDateTime::now()),
        version: Some(1),
        delete_flag: Some(1),
    };
    let data = BizActivity::insert(&mut rb, &activity).await;
    println!("insert = {}", json!(data));

    let data = BizActivity::select_all_by_id(&mut rb, "1", "1").await;
    println!("select_all_by_id = {}", json!(data));

    let data = BizActivity::select_by_id(&mut rb, "1".to_string()).await;
    println!("select_by_id = {}", json!(data));

    let data = BizActivity::update_by_column(&mut rb, &activity, "id").await;
    println!("update_by_column = {}", json!(data));

    let data = BizActivity::update_by_name(&mut rb, &activity, "test").await;
    println!("update_by_name = {}", json!(data));

    let data = BizActivity::delete_by_column(&mut rb, "id", "2").await;
    println!("delete_by_column = {}", json!(data));

    let data = BizActivity::delete_by_name(&mut rb, "2").await;
    println!("delete_by_column = {}", json!(data));

    let data = BizActivity::select_page(&mut rb, &PageRequest::new(1, 10), "2").await;
    println!("select_page = {}", json!(data));
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

>  show the project build Generated code(`rbatis_codgen` Generated code). and then you can see build log.</br>
>  show the database rows data or error. and then you can see data log.

Note! debug_mode should set log level to 'debug'

* open features on Cargo.toml
```toml
rbatis = { version = "4",features = ["debug_mode"]}
```

* just like fast_log set level
```rust
//fast_log::init(fast_log::Config::new().console().level(log::LevelFilter::Debug));
....
fast_log::LOGGER.set_level(log::LevelFilter::Debug);
```

* ```cargo run``` build log
```log
cargo run
............gen macro py_sql :
 pub async fn do_select_all(
    rb: &mut dyn rbatis::executor::Executor,
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
    pub create_time: Option<FastDateTime>,
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
        create_time: Some(FastDateTime::now()),
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
    BizActivity::insert(&mut tx, &t).await.unwrap();

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
    pub create_time: Option<FastDateTime>,
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

| Syntax/method                                                                                 | Generated `Rust` code                                              |
|-----------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| ``` <trim prefixOverrides=" and">` and name != '' `</trim> ```                                | `sql.trim(" and")                      `                           |
| ``` <if test="key == 'id'"/> ```                                                              | `if  key == "id"{}                     `                           |
| ``` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  ``` | `for (key,item) in arg{}               `                           |
| ``` <continue/>  ```                                                                          | `for (key,item) in arg{ continue;}     `                           |
| ``` <set>  ```                                                                                | `sql.push_str("SET").trim("SET")       `                           |
| ``` <choose>  ```                                                                             | `match {}                              `                           |
| ``` <when test="true">  ```                                                                   | `match true{ true=>{} _ => {} }        `                           |
| ``` <otherwise>  ```                                                                          | `match { _ =>{} }                      `                           |
| ``` <where>  ```                                                                              | `sql.push_str("WHERE").trim("WHERE")       `                       |
| ``` <bind name="a" value="1+1"></bind> ```                                                    | `let a = rbs::Value::I32(1 + 1)            `                       |
| ``` ` and name=#{name}`    ```                                                                | `sql.push_str(" and name=?");args.push(rbs::Value::String(name));` |
| ``` ` and name=${name}`     ```                                                               | `sql.push_str(&format!(" and name={}",name));                    ` |
| ``` ` and age=${1 + 1}`  ```                                                                  | `sql.push_str(&format!(" and age={}", 1 + 1));    `                |
| ``` ` and name=${name + '_tag'}`  ```                                                         | `sql.push_str(&format!(" and name={}",name + "_tag"));    `        |
| ``` ` and age=${age + 1}`  ```                                                                | `sql.push_str(&format!(" and age={}", age + 1));    `              |
| ``` ` and bitand=${true  & true}`  ```                                                        | `sql.push_str(&format!(" and bitand={}", true & true));    `       |
| ``` ` and cmp=${2 >  1}`  ```                                                                 | `sql.push_str(&format!(" and cmp={}",2 >  1));    `                |
| ``` ` and div=${2 /  1}`  ```                                                                 | `sql.push_str(&format!(" and div={}", 2 / 1));    `                |
| ``` ` and eq=${2 ==  1}`  ```                                                                 | `sql.push_str(&format!(" and eq={}", 2 == 1));    `                |
| ``` ` and mul=${2 *  1}`  ```                                                                 | `sql.push_str(&format!(" and mul={}", 2 * 1));    `                |
| ``` ` and not=${ !false }`  ```                                                               | `sql.push_str(&format!(" and not={}", !false));    `               |
| ``` ` and rem=${ 2 % 1 }`  ```                                                                | `sql.push_str(&format!(" and rem={}", 2 % 1));    `                |
| ``` ` and sub=${ 2 - 1 }`  ```                                                                | `sql.push_str(&format!(" and sub={}", 2 - 1));    `                |

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
async fn select_by_condition(rb: &mut dyn Executor, name: &str, dt: &FastDateTime) -> Vec<BizActivity> {
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

> rsut code
```rust
#[html_sql("example/example.html")]
async fn select_by_condition(rb: &mut dyn Executor, name: &str, dt: &FastDateTime) -> Vec<BizActivity> {
    impled!()
}
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

pub mod model;

use model::*;

use rbatis::rbatis::RBatis;
use rbatis::rbdc::datetime::FastDateTime;
use rbatis::sql::PageRequest;
use rbdc_sqlite::driver::SqliteDriver;

htmlsql_select_page!(select_page_data(name: &str, dt: &FastDateTime) -> BizActivity => "example/example.html");

#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    let rb = RBatis::new();
    rb.link(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))
        .await
        .unwrap();
    let a = select_page_data(&mut rb.clone(),&PageRequest::new(1, 10),"test",&FastDateTime::now().set_micro(0))
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

| Syntax/method                          | Generated `Rust` code                                              |
|----------------------------------------|--------------------------------------------------------------------|
| `trim 'AND ':      `                   | `sql.trim("AND ")      `                                           |
| `if arg!=1:         `                  | `if arg !=1 {}               `                                     |
| `for key,item in arg:      `           | `for (key,item) in arg{ }     `                                    |
| `continue:                 `           | `for (key,item) in arg{ continue; }      `                         |
| `set :                       `         | `sql.push_str("SET").trim("SET")        `                          |
| `choose :                     `        | `match {}                                `                         |
| `when :              `                 | `match true{ true=>{} _ => {} }       `                            |
| `otherwise :           `               | `match { _ =>{} }                    `                             |
| `_:              `                     | `match { _ =>{} }(v1.8.54 later)         `                         |
| `where :              `                | `sql.push_str("WHERE").trim("WHERE")    `                          |
| `bind a=1+1:       `                   | `let a = rbs::Value::I32(1 + 1) `                                  |
| `let  a=1+1:     `                     | `let a = rbs::Value::I32(1 + 1) `  (v1.8.54 later)                 |
| ``` ` and name=#{name}`    ```         | `sql.push_str(" and name=?");args.push(rbs::Value::String(name));` |
| ``` ` and name=${name}`     ```        | `sql.push_str(&format!(" and name={}",name));                    ` |
| ``` ` and age=${1 + 1}`  ```           | `sql.push_str(&format!(" and age={}", 1 + 1));    `                |
| ``` ` and name=${name + '_tag'}`  ```  | `sql.push_str(&format!(" and name={}",name + "_tag"));    `        |
| ``` ` and age=${age + 1}`  ```         | `sql.push_str(&format!(" and age={}", age + 1));    `              |
| ``` ` and bitand=${true  & true}`  ``` | `sql.push_str(&format!(" and bitand={}", true & true));    `       |
| ``` ` and cmp=${2 >  1}`  ```          | `sql.push_str(&format!(" and cmp={}",2 >  1));    `                |
| ``` ` and div=${2 /  1}`  ```          | `sql.push_str(&format!(" and div={}", 2 / 1));    `                |
| ``` ` and eq=${2 ==  1}`  ```          | `sql.push_str(&format!(" and eq={}", 2 == 1));    `                |
| ``` ` and mul=${2 *  1}`  ```          | `sql.push_str(&format!(" and mul={}", 2 * 1));    `                |
| ``` ` and not=${ !false }`  ```        | `sql.push_str(&format!(" and not={}", !false));    `               |
| ``` ` and rem=${ 2 % 1 }`  ```         | `sql.push_str(&format!(" and rem={}", 2 % 1));    `                |
| ``` ` and sub=${ 2 - 1 }`  ```         | `sql.push_str(&format!(" and sub={}", 2 - 1));    `                |



```rust
#[py_sql(
    "`select * from biz_activity where delete_flag = 0`
                  if name != '':
                    ` and name=#{name}`"
)]
async fn py_select(rb: &mut dyn Executor, name: &str) -> Result<Vec<BizActivity>, Error> {
    impled!()
}
```


#### plugin: table-sync

> This IS a PLUGIN THAT SYNCHRONIZES THE TABLE STRUCTURE WITH THE TABLE STRUCTURE IN THE code, which I believe is VERY important in MOBILE DEVELOPMENT.
> Note that it does not change the table structure.

* If the table does not exist, it is created
* If the table exists but a column is missing, increment the column of the missing section

```rust
use rbatis::rbatis::RBatis;
use rbatis::rbdc::datetime::FastDateTime;
use rbatis::table_sync::{SqliteTableSync, TableSync};
use rbdc_sqlite::driver::SqliteDriver;
use rbs::to_value;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct RBUser {
    pub id: i32,
    pub name: Option<String>,
    pub remark: Option<String>,
    pub create_time: Option<FastDateTime>,
    pub version: Option<i64>,
    pub delete_flag: Option<i32>,
}

#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    let rb = RBatis::new();
    rb.init(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))
        .unwrap();
    let mut s = SqliteTableSync::default();
    s.sql_id = " PRIMARY KEY AUTOINCREMENT NOT NULL ".to_string();
    s.sync(rb.acquire().await.unwrap(), to_value!(RBUser {
        id: 0,
        name: Some("".to_string()),
        remark: Some("".to_string()),
        create_time: Some(FastDateTime::utc()),
        version: Some(1),
        delete_flag: Some(1),
    }), "rb_user")
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
    fn before(
        &self,
        task_id: i64,
        _rb: &dyn Executor,
        sql: &mut String,
        args: &mut Vec<Value>,
    ) -> Result<(), Error> {
       Ok(())
    }

    fn after(
        &self,
        task_id: i64,
        _rb: &dyn Executor,
        sql: &mut String,
        _args: &mut Vec<Value>,
        result: Result<ResultType<&mut ExecResult, &mut Vec<Value>>, &mut Error>,
    ) -> Result<(), Error> {
       Ok(())
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
    use rbatis::rbdc::datetime::FastDateTime;
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
        pub create_time: Option<FastDateTime>,
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


#### define-driver

* example see [rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)

* step0: create your cargo project,and add 'rbdc = "4.3"' on Cargo.toml
```toml
rbdc = "4.3"
```

* step1: define you driver struct
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

* step2: impl trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};

```rust
   impl Driver for MockDriver {
    fn name(&self) -> &str {
        "MockDriver"
    }
    fn connect(&self, url: &str) -> BoxFuture<Result<Box<dyn Connection>, Error>> {
        let url = url.to_owned();
        Box::pin(async move {
            let conn;//todo make an connection
            Ok(Box::new(conn) as Box<dyn Connection>)
        })
    }

    fn connect_opt<'a>(
        &'a self,
        opt: &'a dyn ConnectOptions,
    ) -> BoxFuture<Result<Box<dyn Connection>, Error>> {
        let opt = opt.downcast_ref::<MssqlConnectOptions>().unwrap();
        Box::pin(async move {
            let conn;//todo make an connection
            Ok(Box::new(conn) as Box<dyn Connection>)
        })
    }

    fn default_option(&self) -> Box<dyn ConnectOptions> {
        Box::new(MockConnectOptions{})
    }
}
   impl MetaData for MockRowMetaData{}
   impl Row for MockRow {}
   impl Connection for MockConnection{}
   impl ConnectOptions for MockConnectOptions{}
   impl Placeholder for MssqlDriver {
       fn exchange(&self, sql: &str) -> String {
           rbdc::impl_exchange("@P", 1, sql) //if database not support sql Placeholder '?',replace '@1' to '?'
           //return sql.to_string();//if database is support sql Placeholder '?'
       }
   }
```

* step3: load your driver on rbatis

```rust
#[tokio::main]
async fn main(){
    let mut rb = RBatis::new();
    rb.init(MockDriver {}, "MockDriver").unwrap();
    rb.acquire().await.expect("connection database fail");//check is successful.
}
```

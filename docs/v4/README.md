
### rbatis-v4

A highly Performant SQL Toolkit and Compile time ORM Library. An async, pure Rust SQL crate featuring compile-time Dynamic SQL

It is an ORM, a small compiler, a dynamic SQL languages

* Compatible with most mybatis3 syntax.You can start recoding Java projects into Rust!
* No Runtimes，No Garbage Collection,High performance, Based on Future/Tokio
* Zero cost [Dynamic SQL](dyn_sql.md), implemented using (proc-macro,compile-time,Cow(Reduce unnecessary cloning))
  techniques。 don't need ONGL engine(mybatis)
* JDBC-like driver design, driver use cargo.toml dependency and ```Box<dyn Driver>``` separation
* All database drivers supported ```#{arg}```, ```${arg}```,```?```  placeholder(pg/mssql auto processing '?' to '$1'
  and '@P1')
* Dynamic SQL(Write code freely in SQL),pagination, ```py_sql``` query lang and ```html_sql```(Inspired Mybatis).
* Dynamic configuration connection pool(Based on the mobc)
* Supports logging, customizable logging based on `log` crate
* 100% Safe Rust with `#![forbid(unsafe_code)]` enabled
* Support use Trait System Add ```py_sql/ html_sql```
  functions.[see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_custom_func.rs)
* [rbatis/example (import into Clion!)](example/src)
* [abs_admin project](https://github.com/rbatis/abs_admin)  an complete background user management system(
  Vue.js+rbatis+actix-web)


#### Supported database driver

> the Rbatis support any impl [rdbc](https://crates.io/crates/rbdc) drivers.
> If you don't have the following driver you want, you can write one yourself, just as long as the impl ``` rbdc::db::* ``` traits

| database      | crates.io                                           | github_link                                                 |
|---------------|-----------------------------------------------------|-------------------------------------------------------------|
| Mysql         | [rbdc-mysql](https://crates.io/crates/rbdc-mysql)   | [rbatis](https://github.com/rbatis/rbatis)                  |
| Postgres      | [rbdc-pg](https://crates.io/crates/rbdc-pg)         | [rbatis](https://github.com/rbatis/rbatis)                  |
| Sqlite        | [rbdc-sqlite](https://crates.io/crates/rbdc-sqlite) | [rbatis](https://github.com/rbatis/rbatis)                  |
| Mssql         | [rbdc-mssql](https://crates.io/crates/rbdc-mssql)   | [rbatis](https://github.com/rbatis/rbatis)                  |
| MariaDB       | [rbdc-mysql](https://crates.io/crates/rbdc-mysql)   | [rbatis](https://github.com/rbatis/rbatis)                  |
| TiDB          | [rbdc-mysql](https://crates.io/crates/rbdc-mysql)   | [rbatis](https://github.com/rbatis/rbatis)                  |
| CockroachDB   | [rbdc-pg](https://crates.io/crates/rbdc-pg)         | [rbatis](https://github.com/rbatis/rbatis)                  |
| Oracle        | [rbdc-oracle](https://crates.io/crates/rbdc-oracle) | [chenpengfan](https://github.com/chenpengfan/rbdc-oracle)   |


#### CRUD-basic methods

* Cargo.toml

```toml
# logging(option)
log = "0.4"
fast_log = "1.5"
# serde/rbs (required)
serde = { version = "1", features = ["derive"] }
rbs = { version = "0.1"}
rbatis = { version = "4.0"}
# choose one rbdc drivier
rbdc-sqlite = { version = "0.1" }
#rbdc-mysql={version="0.1"}
#rbdc-pg={version="0.1"}
#rbdc-mssql={version="0.1"}
#...other database driver...
```

* src/main.rs

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
impl_select_page!(BizActivity{select_page(name:&str) => "`where name != #{name}`"});

#[tokio::main]
async fn main() {
    /// enable log crate to show sql logs
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point
    let rb = Rbatis::new();
    /// connect to database  
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
    println!("insert = {:?}", data);

    let data = BizActivity::select_all_by_id(&mut rb, "1", "1").await;
    println!("select_all_by_id = {:?}", data);

    let data = BizActivity::select_by_id(&mut rb, "1".to_string()).await;
    println!("select_by_id = {:?}", data);

    let data = BizActivity::update_by_column(&mut rb, &activity, "id").await;
    println!("update_by_column = {:?}", data);

    let data = BizActivity::update_by_name(&mut rb, &activity, "test").await;
    println!("update_by_name = {:?}", data);

    let data = BizActivity::delete_by_column(&mut rb, "id", &"2".into()).await;
    println!("delete_by_column = {:?}", data);

    let data = BizActivity::delete_by_name(&mut rb, "2").await;
    println!("delete_by_column = {:?}", data);

    let data = BizActivity::select_page(&mut rb, &PageRequest::new(1, 10), "2").await;
    println!("select_page = {:?}", data);
}
```

* cargo run after log

```log
2022-08-19 14:42:53.346321 INFO rbatis::plugin::log - [rbatis] [403076696909156352] Exec   ==> insert into biz_activity (id,name,pc_link,h5_link,pc_banner_img,h5_banner_img,sort,status,remark,create_time,version,delete_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                                                      [rbatis]                      Args   ==> ["2","2","2","2",null,null,null,2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1]
insert = Ok(ExecResult { rows_affected: 1, last_insert_id: U64(6) })
2022-08-19 14:42:53.370667 INFO rbatis::plugin::log - [rbatis] [403076696909156352] RowsAffected <== 1
insert_batch = Ok(ExecResult { rows_affected: 2, last_insert_id: U64(7) })
update_by_column_batch = Ok(ExecResult { rows_affected: 2, last_insert_id: Null })
2022-08-19 14:42:53.372331 INFO rbatis::plugin::log - [rbatis] [403076697018208256] Exec   ==> delete from biz_activity where name= '2'
                                                      [rbatis]                      Args   ==> []
2022-08-19 14:42:53.378375 INFO rbatis::plugin::log - [rbatis] [403076697018208256] RowsAffected <== 1
2022-08-19 14:42:53.378378 INFO rbatis::plugin::log - [rbatis] [403076697022402560] Exec   ==> delete from biz_activity where name= '2'
                                                      [rbatis]                      Args   ==> []
2022-08-19 14:42:53.378382 INFO rbatis::plugin::log - [rbatis] [403076697022402560] RowsAffected <== 0
2022-08-19 14:42:53.378382 INFO rbatis::plugin::log - [rbatis] [403076697022402561] Exec   ==> insert into biz_activity (id,name,pc_link,h5_link,pc_banner_img,h5_banner_img,sort,status,remark,create_time,version,delete_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?),(?,?,?,?,?,?,?,?,?,?,?,?)
                                                      [rbatis]                      Args   ==> ["2","2","2","2",null,null,null,2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1,"3","2","2","2",null,null,null,2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1]
2022-08-19 14:42:53.378384 INFO rbatis::plugin::log - [rbatis] [403076697022402561] RowsAffected <== 2
2022-08-19 14:42:53.378384 INFO rbatis::plugin::log - [rbatis] [403076697026596864] Exec   ==> update biz_activity set name=?,pc_link=?,h5_link=?,status=?,remark=?,create_time=?,version=?,delete_flag=? where  id = ?
                                                      [rbatis]                      Args   ==> ["2","2","2",2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1,"2"]
2022-08-19 14:42:53.378385 INFO rbatis::plugin::log - [rbatis] [403076697026596864] RowsAffected <== 1
2022-08-19 14:42:53.378386 INFO rbatis::plugin::log - [rbatis] [403076697026596865] Exec   ==> update biz_activity set name=?,pc_link=?,h5_link=?,status=?,remark=?,create_time=?,version=?,delete_flag=? where  id = ?
                                                      [rbatis]                      Args   ==> ["2","2","2",2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1,"3"]
2022-08-19 14:42:53.378387 INFO rbatis::plugin::log - [rbatis] [403076697026596865] RowsAffected <== 1
2022-08-19 14:42:55.380839 INFO rbatis::plugin::log - [rbatis] [403076705440370688] Fetch  ==> select * from biz_activity where id = ? and name = ?
                                                      [rbatis]                      Args   ==> ["1","1"]
2022-08-19 14:42:55.382669 INFO rbatis::plugin::log - [rbatis] [403076705440370688] ReturnRows <== 0
[rbatis] [debug_mode] [value]   alloc::vec::Vec<crud::model::BizActivity> => []
select_all_by_id = Ok([])
2022-08-19 14:42:57.388513 INFO rbatis::plugin::log - [rbatis] [403076713862533120] Fetch  ==> select * from biz_activity where id = ? limit 1
                                                      [rbatis]                      Args   ==> ["1"]
2022-08-19 14:42:57.389865 INFO rbatis::plugin::log - [rbatis] [403076713862533120] ReturnRows <== 1
[rbatis] [debug_mode] [value]   core::option::Option<crud::model::BizActivity> => [{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2019-12-12 00:00:00", "remark": "fff", "version": 1, "status": 1, "sort": "1", "h5_link": "", "pc_link": "", "name": "活动1", "id": "1"}]
select_by_id = Ok(Some(BizActivity { id: Some("1"), name: Some("活动1"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("1"), status: Some(1), remark: Some("fff"), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 0, min: 0, hour: 0, day: 12, mon: 12, year: 2019 })), version: Some(1), delete_flag: Some(0) }))
2022-08-19 14:42:59.396231 INFO rbatis::plugin::log - [rbatis] [403076722284695552] Exec   ==> update biz_activity set name=?,pc_link=?,h5_link=?,status=?,remark=?,create_time=?,version=?,delete_flag=? where  id = ?
                                                      [rbatis]                      Args   ==> ["2","2","2",2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1,"2"]
2022-08-19 14:42:59.397060 INFO rbatis::plugin::log - [rbatis] [403076722284695552] RowsAffected <== 1
update_by_column = Ok(ExecResult { rows_affected: 1, last_insert_id: U64(6) })
2022-08-19 14:43:01.400300 INFO rbatis::plugin::log - [rbatis] [403076730685886464] Exec   ==> update biz_activity set  id=?,name=?,pc_link=?,h5_link=?,status=?,remark=?,create_time=?,version=?,delete_flag=? where id = '2'
                                                      [rbatis]                      Args   ==> ["2","2","2","2",2,"2",DateTime("2022-08-19 14:42:53.346144"),1,1]
2022-08-19 14:43:01.404943 INFO rbatis::plugin::log - [rbatis] [403076730685886464] RowsAffected <== 1
update_by_name = Ok(ExecResult { rows_affected: 1, last_insert_id: U64(7) })
2022-08-19 14:43:03.410333 INFO rbatis::plugin::log - [rbatis] [403076739120631808] Exec   ==> delete from biz_activity where  id = ?
                                                      [rbatis]                      Args   ==> ["2"]
2022-08-19 14:43:03.411737 INFO rbatis::plugin::log - [rbatis] [403076739120631808] RowsAffected <== 1
delete_by_column = Ok(ExecResult { rows_affected: 1, last_insert_id: U64(6) })
2022-08-19 14:43:05.417838 INFO rbatis::plugin::log - [rbatis] [403076747538599936] Exec   ==> delete from biz_activity where name= '2'
                                                      [rbatis]                      Args   ==> []
2022-08-19 14:43:05.422068 INFO rbatis::plugin::log - [rbatis] [403076747538599936] RowsAffected <== 1
delete_by_column = Ok(ExecResult { rows_affected: 1, last_insert_id: U64(7) })
2022-08-19 14:43:07.428029 INFO rbatis::plugin::log - [rbatis] [403076755969150976] Fetch  ==> select count(1) as count from biz_activity 
                                                      [rbatis]                      Args   ==> []
2022-08-19 14:43:07.429972 INFO rbatis::plugin::log - [rbatis] [403076755969150976] ReturnRows <== 1
[rbatis] [debug_mode] [value]   u64 => [{"count": 5}]
2022-08-19 14:43:07.430278 INFO rbatis::plugin::log - [rbatis] [403076755981733888] Fetch  ==> select * from biz_activity order by create_time desc limit 0,10
                                                      [rbatis]                      Args   ==> []
[rbatis] [debug_mode] [value]   alloc::vec::Vec<crud::model::BizActivity> => [{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:10:23", "remark": "", "version": 0, "status": 0, "sort": "0", "h5_link": "", "pc_link": "", "name": "test", "id": "221"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:10:23", "remark": "", "version": 0, "status": 0, "sort": "0", "h5_link": "", "pc_link": "", "name": "test", "id": "222"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:10:23", "remark": "", "version": 0, "status": 0, "sort": "0", "h5_link": "", "pc_link": "", "name": "test", "id": "223"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:08:13", "remark": "", "version": 0, "status": 1, "sort": "1", "h5_link": "", "pc_link": "", "name": "test_insret", "id": "178"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2019-12-12 00:00:00", "remark": "fff", "version": 1, "status": 1, "sort": "1", "h5_link": "", "pc_link": "", "name": "活动1", "id": "1"}]
2022-08-19 14:43:07.431172 INFO rbatis::plugin::log - [rbatis] [403076755981733888] ReturnRows <== 5
select_page = Ok(Page { records: [BizActivity { id: Some("221"), name: Some("test"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("0"), status: Some(0), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 23, min: 10, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("222"), name: Some("test"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("0"), status: Some(0), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 23, min: 10, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("223"), name: Some("test"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("0"), status: Some(0), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 23, min: 10, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("178"), name: Some("test_insret"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("1"), status: Some(1), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 13, min: 8, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("1"), name: Some("活动1"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("1"), status: Some(1), remark: Some("fff"), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 0, min: 0, hour: 0, day: 12, mon: 12, year: 2019 })), version: Some(1), delete_flag: Some(0) }], total: 5, pages: 1, page_no: 1, page_size: 10, search_count: true })
2022-08-19 14:43:09.433933 INFO rbatis::plugin::log - [rbatis] [403076764382924800] Fetch  ==> select count(1) as count from biz_activity where name != ''
                                                      [rbatis]                      Args   ==> []
2022-08-19 14:43:09.435122 INFO rbatis::plugin::log - [rbatis] [403076764382924800] ReturnRows <== 1
[rbatis] [debug_mode] [value]   u64 => [{"count": 5}]
2022-08-19 14:43:09.435445 INFO rbatis::plugin::log - [rbatis] [403076764391313408] Fetch  ==> select * from biz_activity where name != '' limit 0,10
                                                      [rbatis]                      Args   ==> []
[rbatis] [debug_mode] [value]   alloc::vec::Vec<crud::model::BizActivity> => [{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2019-12-12 00:00:00", "remark": "fff", "version": 1, "status": 1, "sort": "1", "h5_link": "", "pc_link": "", "name": "活动1", "id": "1"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:08:13", "remark": "", "version": 0, "status": 1, "sort": "1", "h5_link": "", "pc_link": "", "name": "test_insret", "id": "178"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:10:23", "remark": "", "version": 0, "status": 0, "sort": "0", "h5_link": "", "pc_link": "", "name": "test", "id": "221"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:10:23", "remark": "", "version": 0, "status": 0, "sort": "0", "h5_link": "", "pc_link": "", "name": "test", "id": "222"},{"h5_banner_img": "", "pc_banner_img": "", "delete_flag": 0, "create_time": "2020-06-17 20:10:23", "remark": "", "version": 0, "status": 0, "sort": "0", "h5_link": "", "pc_link": "", "name": "test", "id": "223"}]
2022-08-19 14:43:09.436139 INFO rbatis::plugin::log - [rbatis] [403076764391313408] ReturnRows <== 5
select_page_by_name = Ok(Page { records: [BizActivity { id: Some("1"), name: Some("活动1"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("1"), status: Some(1), remark: Some("fff"), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 0, min: 0, hour: 0, day: 12, mon: 12, year: 2019 })), version: Some(1), delete_flag: Some(0) }, BizActivity { id: Some("178"), name: Some("test_insret"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("1"), status: Some(1), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 13, min: 8, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("221"), name: Some("test"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("0"), status: Some(0), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 23, min: 10, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("222"), name: Some("test"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("0"), status: Some(0), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 23, min: 10, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }, BizActivity { id: Some("223"), name: Some("test"), pc_link: Some(""), h5_link: Some(""), pc_banner_img: Some(""), h5_banner_img: Some(""), sort: Some("0"), status: Some(0), remark: Some(""), create_time: Some(FastDateTime(DateTime { micro: 0, sec: 23, min: 10, hour: 20, day: 17, mon: 6, year: 2020 })), version: Some(0), delete_flag: Some(0) }], total: 5, pages: 1, page_no: 1, page_size: 10, search_count: true })

```

#### TableDefine

> Rbatis follows a clean code style,so that A database table structure is just a normal structure that may use the database types provided by RBatis
> We use the ```crud!()``` macro ``` impl_*!() ``` macro Enables the table structure to have the ability to query and modify the database

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
crud!(BizActivity {}); //crud = async fn insert(...)+async fn  select_by_column(...)+ async fn  update_by_column(...)+async fn  delete_by_column(...)...and more
```


#### Transaction

> The essence of a transaction is to use the SQL statements BEGIN, COMMIT, and ROLLBACK.
> The Rbatis provides these three functions but also support ```defer_async()``` to prevent forgotten commits 

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
#[tokio::main]
pub async fn main() {
    let _ = fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    let rb = Rbatis::new();
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
```


#### Raw Sql

> the Rbatis also support Write the original statements of the database
> And the drivers provided by RBatis all support placeholder '?',so you can write '?' on Postgres/mssql...and more

```rust
use rbs::to_value;
use std::time::Duration;
use tokio::time::sleep;
#[tokio::main]
pub async fn main() {
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
     let rb = Rbatis::new();
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();
    rb.link(
        SqliteDriver {},
        &format!("sqlite://{}target/sqlite.db", path),
    ).await.unwrap();
    let table: Option<BizActivity> = rb
        .fetch_decode("select * from biz_activity limit ?", vec![to_value!(1)])
        .await
        .unwrap();
    let count: u64 = rb
        .fetch_decode("select count(1) as count from biz_activity", vec![])
        .await
        .unwrap();
    sleep(Duration::from_secs(1)).await;
    println!(">>>>> table={:?}", table);
    println!(">>>>> count={}", count);
}
```


#### HtmlSql
> It is implemented by Rbatis a set of compatible MyBtais3 SQL editing language, support common such as if, Foreach, string interpolation

* When the RBatis dependency in Cargo.toml turns on the ```debug_mode``` feature, the generated function implementation code is printed
* Language parsing -> Lexical analysis -> Syntax analysis -> generation of abstract syntax trees ->  translation to Rust code。Have the performance of native Rust
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

| Syntax/method                                                                                 | rust code                                                           |
|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| ``` <trim prefixOverrides=" and">` and name != '' `</trim> ```                                | .trim(" and")                                                       |
| ``` <if test="key == 'id'"/> ```                                                              | if  key == "id"{}                                                   |
| ``` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  ``` | for (key,item) in arg{}                                             |
| ``` <set>  ```                                                                                | sql.push_str("SET").trim("SET")                                     |
| ``` <choose>  ```                                                                             | match                                                               |
| ``` <when test="true">  ```                                                                   | match expr                                                          |
| ``` <otherwise>  ```                                                                          | match { _ =>{} }                                                    |
| ``` <where>  ```                                                                              | sql.push_str("WHERE").trim("WHERE")                                 |
| ``` <bind name="a" value="1+1"></bind> ```                                                    | let a = 1 + 1                                                       |
| ``` ` and name=#{name}`    ```                                                                | `sql.push_str(" and name=?");args.push(rbs::Value::String(name));`  |
| ``` ` and name=${name}`     ```                                                               | `sql.push_str(&format!(" and name={}",name));                    `  |
| ``` ` and name=${name + '_tag'}`  ```                                                         | `sql.push_str(&format!(" and name={}",name.push_str("_tag")));    ` |

* HtmlSql example:
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://github.com/rbatis/rbatis_codegen/raw/main/mybatis-3-mapper.dtd">
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

* define on rust code [see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql.rs)
```rust
#[html_sql("example/example.html")]
async fn select_by_condition(rb: &mut dyn Executor, name: &str, dt: &FastDateTime) -> Vec<BizActivity> {
    impled!()
}
```

#### PySql

* It is a Python-like syntax, a language for manipulating SQL statements and inserting SQL parameters
* Syntax tree 

| Syntax/method                         | rust code                                                           |
|---------------------------------------|---------------------------------------------------------------------|
| trim 'AND ':                          | .trim("AND ")                                                       |
| if arg!=1 :                           | if arg !=1 {}                                                       |
| for key,item in arg :                 | for (key,item) in arg{ }                                            |
| set :                                 | sql.push_str("SET").trim("SET")                                     |
| choose :                              | match                                                               |
| when :                                | match expr                                                          |
| otherwise :                           | match { _ =>{} }                                                    |
| _:                                    | match { _ =>{} }(v1.8.54 later)                                     |
| where :                               | sql.push_str("WHERE").trim("WHERE")                                 |
| bind a=1+1:                           | let a = 1+1                                                         |
| let  a=1+1:                           | let a = 1+1(v1.8.54 later)                                          |
| ``` ` and name=#{name}`    ```        | `sql.push_str(" and name=?");args.push(rbs::Value::String(name));`  |
| ``` ` and name=${name}`     ```       | `sql.push_str(&format!(" and name={}",name));                    `  |
| ``` ` and name=${name + '_tag'}`  ``` | `sql.push_str(&format!(" and name={}",name.push_str("_tag")));    ` |

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



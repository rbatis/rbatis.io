
### rbatis-v4(unfinished yet)

#### A highly Performant SQL Toolkit and Compile time ORM Library. An async, pure Rust SQL crate featuring compile-time Dynamic SQL

It is an ORM, a small compiler, a dynamic SQL languages

* Compatible with most mybatis3 syntax
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


#### Quick example: QueryWrapper and common usages (see example/crud_test.rs for details)

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
///...more usage,see crud.rs
```


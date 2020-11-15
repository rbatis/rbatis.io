![logo](logo.png )

# Rbatis

[GitHub](https://github.com/rbatis/rbatis)

> Rust ORM Framework Dynamic sql, No Runtime,No Garbage Collector, Low Memory,Async_std,Tokio.

* - 100% Safe security code implementation,based on Future support Tokio/AsyncStd

* - Rich plug-ins, paging, logical deletion, SQL interceptor

* - Field formatting, perfect support for various database functions, type conversion

* - Super easy to use, Wrapper+ PY_SQL Macro handles 100% of arbitrarily complex SQL

* - Inspiration comes from Mybatis(Java),MybatisPlus(Java)


### Support database
| database    | support |
| ------ | ------ |
| Mysql            | √     |   
| Postgres         | √     |  
| Sqlite           | √     |  
| Mssql/Sqlserver           | √     |  
| MariaDB(Mysql)             | √     |
| TiDB(Mysql)             | √     |
| CockroachDB(Postgres)      | √     |


# Rbatis-init

> Install dependencies
``` rust
#json support(must)
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

#date(must)
chrono = { version = "0.4", features = ["serde"] }

#log support(must)
log = "0.4"
fast_log="1.2.9"

#BigDecimal support(not must)
bigdecimal = "0.2"

#rbatis support,Keep the same version(must)
rbatis =  { version = "1.8" } 
rbatis-macro-driver = { version = "1.8" }
```


> Ordinary init
```rust
let rb = Rbatis::new();
///Connect to the database, automatic judgment drive type "mysql: / / *", "postgres: / / *", "sqlite: / / *","mssql://*"  load driver  
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
///Customize connection pool parameters. (optional)
// let mut opt =PoolOptions::new();
// opt.max_size=100;
// rb.link_opt("mysql://root:123456@localhost:3306/test",&opt).await.unwrap();

//With log output enabled, you can also use other logging frameworks, which are not qualified
fast_log::init_log("requests.log", 1000,log::Level::Info,true);
```

> Initialize with a global variable (depending on the library lazy_static)
```rust
lazy_static! {
  // Rbatis is thread-safe, and the runtime method is Send+Sync. Internally, DashMap and other concurrent and safe map implementations are used, so there is no need to worry about thread contention
  static ref RB:Rbatis=Rbatis::new();
}
//Use the async_STd main method here, you can select actix, ToKIO, and other runtime main methods or spawn
#[async_std::main]
async fn main() {
      fast_log::init_log("requests.log", 1000,log::Level::Info,true);
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}

```



# CRUDEnable

>  CRUDEnable An interface is a Trait that helps define the table structure, and it provides the following methods

*  IdType (The id field type corresponding to the struct must be declared)
*  id_name() The name of the primary key ID (non-mandatory, default ID)
*  table_name() Table name (serpentine name corresponding to struct, optional rewrite)
*  table_columns() Comma-separated string of table fields (all field names corresponding to the struct, optionally overridden)
*  format_chain() Field formatting chain (you can format fields such as Pg database string date to timestamp #{date}:: Timestamp, optional override)


>  The benefit of implementing CRUDEnable using derive macros is that the macros generate code in the compiler and have higher performance.
```rust
#[macro_use]
extern crate rbatis_macro_driver;

#[derive(CRUDEnable,Serialize, Deserialize, Clone, Debug)] 
pub struct BizActivity {    //will be table_name BizActivity => "biz_activity"
    pub id: Option<String>, 
    pub name: Option<String>,
    pub pc_link: Option<String>,
    pub h5_link: Option<String>,
    pub pc_banner_img: Option<String>,
    pub h5_banner_img: Option<String>,
    pub sort: Option<String>,
    pub status: Option<i32>,
    pub remark: Option<String>,
    pub create_time: Option<NaiveDateTime>,
    pub version: Option<i32>,
    pub delete_flag: Option<i32>,
}
```

> Another option is to use the Attr attribute macro to achieve CRUDEnable, which is more scalable and allows you to customize table names and fields

| attr    | doc |
| ------ | ------ |
| id_name | the table id name |
| id_type | the table id type |
| table_name | table name |
| table_columns | table columns use ',' split |

```rust
//for example-1(All automatic generation):

    #[crud_enable]
    #[derive(Serialize, Deserialize, Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// for example-2（Only the table name is changed, the rest is generated automatically）:
    #[crud_enable(table_name:biz_activity)]
    #[derive(Serialize, Deserialize, Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
//for example-3（Full customization）:
    #[crud_enable( id_name:id |  id_type:String | table_name:biz_activity | table_columns:id,name,delete_flag )]
    #[derive(Serialize, Deserialize, Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
```

>  (Optional) Or using IMPL to achieve CRUDEnable has the benefit of high custom controllability and can reduce JSON serialization if you override methods such as field_name
```rust
    impl CRUDEnable for BizActivity {
        type IdType = String; //By default, IdType is provided; other methods in the interface use JSON serialization by default
        //fn table_name() -> String {} //Can be rewritten
        //fn table_columns() -> String {}  //Can be rewritten
        //fn format_chain() -> Vec<Box<dyn ColumnFormat>>{} //Can be rewritten
    }
```

# Wrapper

> Wrapper Is a series of wrappers around SQL, note that the end call check() checks correctness

| method    | sql |
| ------ | ------ |
| and            |  AND     |   
| or         | OR     |  
| having           | HAVING {}     |  
| all_eq(map[String,#{}#{}])             | a = #{}, b= #{},c=#{}     |
| eq      |  a = #{}    |
| ne      |  a <> #{}    |
| order_by(bool,&[str])      |  order by #{} desc, #{} asc....    |
| group_by      |  group by #{},#{},#{}    |
| gt      |  a > #{}    |
| ge      |  a >= #{}    |
| lt      |  a < #{}    |
| le      |  a <= #{}    |
| between(column,min,max)      |  BETWEEN #{} AND #{}    |
| not_between(column,min,max)      |  NOT BETWEEN #{} AND #{}    |
| like(column,obj)      |   LIKE '%#{}%'   |
| like_left(column,obj)      |   LIKE '%#{}'   |
| like_right(column,obj)      |   LIKE '#{}%'   |
| not_like(column,obj)      |   NOT LIKE  '%#{}%'   |
| is_null(column)      |   #{} IS NULL   |
| is_not_null(column)      |   #{} IS NOT NULL   |
| r#in(column,args)      |   IN (#{},#{},#{},#{})  |
| not_in(column,args)      |   NOT IN (#{},#{},#{},#{})  |

> Wrapper Special methods

| method    | sql/rust_code | features |
| ------ | ------ |------ |
| push_wrapper(sql,wrapper)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |  Wrapper add wrapper    |   
| push(sql,args)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |   SQL and parameters are added to the Wrapper   |   
| push_sql(sql)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |    Add SQL wrapper  |   
| push_arg(arg)            |   wrapper.push(*)     |   Wrapper add parameter   |   
| do_if(test:bool,method)            |  wrapper.do_if(p.is_some(), *)    |  Wrapper execution judgment    |   
| do_match(&[method...])  |  wrapper.do_match(p.is_some(), *))    |    The Wrapper performs a match condition match  |   

> Wrapper use case
```rust
  let w = Wrapper::new(&DriverType::Mysql).eq("id", 1)
            .ne("id", 1)
            .r#in("id", &[1, 2, 3])
            .not_in("id", &[1, 2, 3])
            .all_eq(&m)
            .like("name", 1)
            .or()
            .not_like("name", "asdf")
            .between("create_time", "2020-01-01 00:00:00", "2020-12-12 00:00:00")
            .group_by(&["id"])
            .order_by(true, &["id", "name"])
            .check().unwrap();
```


# CRUD

```rust
let rb = Rbatis::new();
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();

let wrapper = rb.new_wrapper()
            .eq("id", 1)                    //sql:  id = 1
            .and()                          //sql:  and 
            .ne("id", 1)                    //sql:  id <> 1
            .r#in("id", &[1, 2, 3])     //sql:  id in (1,2,3)
            .not_in("id", &[1, 2, 3])       //sql:  id not in (1,2,3)
            .like("name", 1)                //sql:  name like 1
            .or()                           //sql:  or
            .not_like("name", "asdf")       //sql:  name not like 'asdf'
            .between("create_time", "2020-01-01 00:00:00", "2020-12-12 00:00:00")//sql:  create_time between '2020-01-01 00:00:00' and '2020-01-01 00:00:00'
            .group_by(&["id"])              //sql:  group by id
            .order_by(true, &["id", "name"])//sql:  group by id,name
            .check().unwrap();

let activity = BizActivity {
                id: Some("12312".to_string()),
                name: None,
                remark: None,
                create_time: Some(NaiveDateTime::now()),
                version: Some(1),
                delete_flag: Some(1),
            };
///save
rb.save("",&activity).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///save batch
rb.save_batch("", &vec![activity]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ),( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///The query, Option wrapper, is None if the data is not found
let result: Option<BizActivity> = rb.fetch_by_id("", &"1".to_string()).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///query all
let result: Vec<BizActivity> = rb.list("").await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1

///query id vec, return vec result
let result: Vec<BizActivity> = rb.list_by_ids("",&["1".to_string()]).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id IN  (?) 

///custom  query
let w = rb.new_wrapper().eq("id", "1").check().unwrap();
let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper("", &w).await;
//Query ==> SELECT  create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///delete
rb.remove_by_id::<BizActivity>("", &"1".to_string()).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id = 1

///delete batch
rb.remove_batch_by_id::<BizActivity>("", &["1".to_string(), "2".to_string()]).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id IN (  ?  ,  ?  ) 

///update
let w = rb.new_wrapper().eq("id", "12312").check().unwrap();
rb.update_by_wrapper("", &activity, &w).await;
//Exec ==> UPDATE biz_activity SET  create_time =  ? , delete_flag =  ? , status =  ? , version =  ?  WHERE id =  ? 
}

///...For more, check out CRUd.rs
```

# SQL-Raw sql/Py sql

> The PY syntax is used in SQL to modify the SYNTAX of SQL and is a form of dynamic SQL

* py syntax, support for addition, subtraction, multiplication, and division if, for, in the trim, include, where, the set, choose, and so on syntax (and mybatis using the functions are almost the same)In the 
* PY syntax, the line space for Child must be greater than that for father. It says it's its child
* PY syntax must end with:
* PY syntax support many express in same line.for example      trim 'a': for item in arg:

| method    | rust code |
| ------ | ------ |
| trim 'AND ': | trim |
| if arg!=1 : | if |
| for item in arg : | for |
| set : | sql:"SET" |
| choose : | match |
| when : | match expr |
| otherwise : | match default value |
| where : | sql:"WHERE" |
| bind a,1+1: | let a = 1+1 |

> example
```rust
    SELECT * FROM biz_activity
    if  name!=null:
      AND delete_flag = #{del}
      AND version = 1
      if  age!=1:
        AND version = 1
      AND version = 1
    AND a = 0
      yes
    for item in ids:
      #{item}
    for index,item in ids:
      #{item}
    trim 'AND':
      AND delete_flag = #{del2}
    choose:
        when age==27:
          AND age = 27
        otherwise:
          AND age = 0
    WHERE id  = '2';
```

> 1 Execute PysQL directly using Rbatis
``` python
        let rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
            let py = r#"
        SELECT * FROM biz_activity
        WHERE delete_flag = #{delete_flag}
        if name != null:
          AND name like #{name+'%'}
        if ids != null:
          AND id in (
          trim ',':
             for item in ids:
               #{item},
          )"#;
            let data: serde_json::Value = rb.py_fetch("", py, &json!({   "delete_flag": 1 })).await.unwrap();
            println!("{}", data);
```

> 2 Use Macro mapping to perform PysQL, see # Macro-Intelligent Macro mapping

# Macro impl SQL

> Macros make it easy to write custom SQL, which is useful when you're writing complex multi-table associated queries, while keeping things simple and extensible

*  The first parameter to the SQL macro is the Rbatis instance name followed by SQL. Note that the SQL macro executes SQL that is driven to run directly, so it must be a replacement symbol for a specific database, such as mysql(? ,?) ,pg($1,$2) for example #[SQL (RB, "select * from biz_activity where ID =?")]
*  Py_sql macros are similar to SQL macros, except that #{} is used instead of precompiled parameters (precompiled is safer and anti-SQL injection), and ${} is used instead of direct replacement parameters (SQL injection risk).
*  The macro generates execution logic based on the method definition, similar to @select dynamic SQL for Java/MybATIS
*  The first parameter, RB, is a name referenced locally by Rbatis, such as 'dao::RB', 'com:: XXX ::RB'
*  The second parameter is the standard driver SQL, note that the corresponding database parameter mysql is? , pg is $1...
*  The macro automatically converts the function pub async fn select(name: & STR) -> rbatis::core::Result {}
*  The macro support Page Plugin!

> Macro mapping native driver SQL
```rust
    lazy_static! {
     static ref RB:Rbatis=Rbatis::new();
   }

    #[sql(RB, "select * from biz_activity where id = ?")]
    fn select(name: &str) -> BizActivity {}

    #[async_std::test]
    pub async fn test_macro() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = select("1").await.unwrap();
        println!("{:?}", a);
    }
```

> Macro mapping py_SQL (passed in schema referenced by Rbatis)
```rust
    lazy_static! {
     static ref RB:Rbatis=Rbatis::new();
   }

    #[py_sql(rbatis, "select * from biz_activity where id = #{name}
                  if name != '':
                    and name=#{name}")]
    fn py_select(rbatis:&Rbatis,name: &str) -> Option<BizActivity> {}
   
    #[async_std::test]
    pub async fn test_macro_py_select() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = py_select(&RB,"1").await.unwrap();
        println!("{:?}", a);
    }
```

> Macro mapping py_SQL (schema passing in transaction TX_ID)
```rust
    lazy_static! {
     static ref RB:Rbatis=Rbatis::new();
   }

    #[py_sql(RB, "select * from biz_activity where id = #{name}
                  if name != '':
                    and name=#{name}")]
    fn py_select(tx_id:&str,name: &str) -> Option<BizActivity> {}
    #[async_std::test]
    pub async fn test_macro_py_select() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = py_select("","1").await.unwrap();
        println!("{:?}", a);
    }
```

> Macro mapping py_SQL (join)
```rust
#[py_sql(rbatis, "SELECT a1.name as name,a2.create_time as create_time 
                  FROM test.biz_activity a1,biz_activity a2 
                  WHERE a1.id=a2.id and a1.name=#{name}")]
    fn join_select(rbatis: &Rbatis, name: &str) -> Option<Vec<BizActivity>> {}

    #[async_std::test]
    pub async fn test_join() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let results = join_select(&RB, "test").await.unwrap();
        println!("data: {:?}", results);
    }
```

> Macro mapping use page plugin
```rust
#[sql(RB, "select * from biz_activity where delete_flag = 0 and name = ?")]
fn sql_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}

#[py_sql(RB, "select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
fn py_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}
```

> Disable generate Rust code print
```toml
rbatis-macro-driver = { version = "last version" , default-features=false, features = ["no_print"]}
```



# choose Runtime
> Rbatis new version will remove the Tokio dependency and switch to async_std because async-global-executor already relies on tokio0.2 and tokio0.3 for the top layer of async_std
And its API support is even better, Async_STD supports fetching the coroutine ID. Here is the switch configuration

```rust
# use tokio runtime
async-std = { version = "*", features = ["attributes","tokio02"] }
rbatis-core = { version = "*", default-features = false ,  features = ["all","tokio02"] }
rbatis = { version = "*", default-features = false , features = ["tokio02"] }
# use async-std runtime
async-std = { version = "*", features = ["attributes"] }
```


# Plugin: RbatisPagePlugin
```rust
        let mut rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        //The framework defaults to the RbatisPagePlugin. If customization is needed, the structure must implement Impl PagePlugin for Plugin***{}, for example:
        //rb.page_plugin = Box::new(RbatisPagePlugin {});

        let req = PageRequest::new(1, 20);//分页请求，页码，条数
        let wraper= rb.new_wrapper()
                    .eq("delete_flag",1)
                    .check()
                    .unwrap();
        let data: Page<BizActivity> = rb.fetch_page_by_wrapper("", &wraper,  &req).await.unwrap();
        println!("{}", serde_json::to_string(&data).unwrap());
```
> json result
```json
//2020-07-10T21:28:40.036506700+08:00 INFO rbatis::rbatis - [rbatis] Query ==> SELECT count(1) FROM biz_activity  WHERE delete_flag =  ? LIMIT 0,20
//2020-07-10T21:28:40.040505200+08:00 INFO rbatis::rbatis - [rbatis] Args  ==> [1]
//2020-07-10T21:28:40.073506+08:00 INFO rbatis::rbatis - [rbatis] Total <== 1
//2020-07-10T21:28:40.073506+08:00 INFO rbatis::rbatis - [rbatis] Query ==> SELECT  create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity  WHERE delete_flag =  ? LIMIT 0,20
//2020-07-10T21:28:40.073506+08:00 INFO rbatis::rbatis - [rbatis] Args  ==> [1]
//2020-07-10T21:28:40.076506500+08:00 INFO rbatis::rbatis - [rbatis] Total <== 5
{
	"records": [{
		"id": "12312",
		"name": "null",
		"pc_link": "null",
		"h5_link": "null",
		"pc_banner_img": "null",
		"h5_banner_img": "null",
		"sort": "null",
		"status": 1,
		"remark": "null",
		"create_time": "2020-02-09T00:00:00+00:00",
		"version": 1,
		"delete_flag": 1
	}],
	"total": 5,
	"size": 20,
	"current": 1,
	"serch_count": true
}
```


# transaction

> default transaction 
```rust
#[async_std::test]
pub async fn test_tx() {
    fast_log::init_log("requests.log", 1000,log::Level::Info,true);
    let RB = Rbatis::new();
    RB.link(MYSQL_URL).await.unwrap();
    let tx_id = "1";
    //begin
    RB.begin(tx_id).await.unwrap();
    let v: serde_json::Value = RB.fetch(tx_id, "SELECT count(1) FROM biz_activity;").await.unwrap();
    println!("{}", v.clone());
    //commit or rollback
    RB.commit(tx_id).await.unwrap();
}
```

> macro transaction
```rust
    #[py_sql(rbatis, "SELECT a1.name as name,a2.create_time as create_time
                      FROM test.biz_activity a1,biz_activity a2
                      WHERE a1.id=a2.id
                      AND a1.name=#{name}")]
    fn join_select(rbatis: &Rbatis , tx_id:&str , name: &str) -> Option<Vec<BizActivity>> {}

    #[async_std::test]
    pub async fn test_join() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();

        let tx_id = "1";
        //begin
        RB.begin(tx_id).await.unwrap();
        let results = join_select(&RB, "test").await.unwrap();
        println!("data: {:?}",tx_id, results);
        //commit or rollback
        RB.commit(tx_id).await.unwrap();
    }
```

# Plugin: RbatisLogicDeletePlugin
> (Logical delete the query and delete methods provided for Rbatis are valid, such as list**(),remove**(), fetch**())
```rust
   let mut rb = init_rbatis().await;
   //rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new_opt("delete_flag",1,0)));//Customize deleted/undeleted writing
   rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new("delete_flag")));
   rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
           let r = rb.remove_batch_by_id::<BizActivity>("", &["1".to_string(), "2".to_string()]).await;
           if r.is_err() {
               println!("{}", r.err().unwrap().to_string());
   }
```

# Plug-in: SqlIntercept

> Implementing an interface
```rust
pub struct Intercept{}

impl SqlIntercept for Intercept{

    ///the intercept name
    fn name(&self) -> &str;

    /// do intercept sql/args
    /// is_prepared_sql: if is run in prepared_sql=ture
    fn do_intercept(&self, rb: &Rbatis, sql: &mut String, args: &mut Vec<serde_json::Value>, is_prepared_sql: bool) -> Result<(), rbatis::core::Error>;
}
```

# Plug-in: LogPlugin
```rust
use log::{debug, error, info, LevelFilter, trace, warn};
pub struct RbatisLog {}

impl LogPlugin for RbatisLog {
    fn error(&self, data: &str) {
        error!("{}", data);
    }

    fn warn(&self, data: &str) {
        warn!("{}", data);
    }

    fn info(&self, data: &str) {
        info!("{}", data);
    }

    fn debug(&self, data: &str) {
        debug!("{}", data);
    }

    fn trace(&self, data: &str) {
        trace!("{}", data);
    }
}
```
> set into Rbatis
```rust
let mut rb=Rbatis::new();
rb.log_plugin = Box::new(RbatisLog{});
```

> Set to Rbatis
```rust
let mut rb=Rbatis::new();
rb.sql_intercepts.push(Box::new(Intercept{}));
```






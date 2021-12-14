* [中文](https://rbatis.github.io/rbatis.io/#/)

[![Gitter](https://badges.gitter.im/rbatis_orm/community.svg)](https://gitter.im/rbatis_orm/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Rbatis-init

### Support database

| database    | support |
| ------ | ------ |
| Mysql            | √     |   
| Postgres         | √     |  
| Sqlite           | √     |  
| Mssql/Sqlserver            | √(50%)     |  
| MariaDB(Mysql)             | √     |
| TiDB(Mysql)             | √     |
| CockroachDB(Postgres)      | √     |


### Supported data structures

| data structure    | is supported |
| ------ | ------ |
| Option                   | √     | 
| Vec                      | √     |  
| HashMap                      | √     |
| i32,i64,f32,f64,bool,String...more rust type   | √     |  
| rbatis::Bytes                   | √     |  
| rbatis::DateNative              | √     |  
| rbatis::DateUtc                  | √     |  
| rbatis::DateTimeNative          | √     |  
| rbatis::DateTimeUtc             | √     |  
| rbatis::Decimal                 | √     |  
| rbatis::Json<T>                 | √     |  
| rbatis::TimeNative              | √     |  
| rbatis::TimeUtc                 | √     |  
| rbatis::Timestamp               | √     |  
| rbatis::TimestampZ              | √     |  
| rbatis::Uuid                    | √     |  
| rbatis::plugin::page::{Page<T>, PageRequest} | √     |
| rbson::Bson*                      | √     |
| serde_json::*        | √     |
| any serde type         | √     |

>  Web Framework + Rbatis example

* [actix_web](https://github.com/rbatis/rbatis/tree/master/example/src/actix_web/main.rs)
* [hyper](https://github.com/rbatis/rbatis/tree/master/example/src/hyper/main.rs)
* [ntex](https://github.com/rbatis/rbatis/tree/master/example/src/ntex/main.rs)
* [rocket](https://github.com/rbatis/rbatis/tree/master/example/src/rocket/main.rs)
* [tide](https://github.com/rbatis/rbatis/tree/master/example/src/tide/main.rs)
* [warp](https://github.com/rbatis/rbatis/tree/master/example/src/warp/main.rs)
* [axum](https://github.com/rbatis/rbatis/tree/master/example/src/axum/main.rs)


# Rbatis-install

> Install dependencies

``` toml
# rbson (required)
serde = { version = "1", features = ["derive"] }
rbson = "2.0"

# logging lib(required)
log = "0.4"
fast_log="1.3"

# rbatis (required) default is all-database+runtime-async-std-rustls
rbatis =  { version = "3.0" } 
# also if you use actix-web+mysql
# rbatis = { version = "3.0", default-features = false, features = ["mysql","runtime-async-std-rustls"] }
```



# Conditional compilation choose async Runtime or driver

> Conditional compilation can select the specified database and run-time compilation instead of compiling all databases. Conditional compilation can reduce program size

|Options | explanation|
| ------ | ------ |
| default  | "all-database","runtime-async-std-rustls" |
| runtime-tokio-rustls |tokio+rusttls   |
| runtime-actix-rustls  | actix+rusttls |
| runtime-async-std-rustls  | async_std+rustls  |
| runtime-tokio-native-tls |  tokio+local tls|
| runtime-actix-native-tls  | actix+local tls |
| runtime-async-std-native-tls  | async_std+local tls  |

> for example

```rust
rbatis = { version = "*", default-features = false, features = ["runtime-async-std-rustls","mysql"] }
```

> Ordinary init

```rust
#[macro_use]
extern crate rbatis;

let rb = Rbatis::new();
///Connect to the database, automatic judgment drive type "mysql: / / *", "postgres: / / *", "sqlite: / / *","mssql://*"  load driver  
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
///Customize connection pool parameters. (optional)
// use crate::core::db::DBPoolOptions;
// let mut opt =DBPoolOptions::new();
// opt.max_connections=100;
// rb.link_opt("mysql://root:123456@localhost:3306/test",&opt).await.unwrap();

//With log output enabled, you can also use other logging frameworks, which are not qualified
fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
```

> Initialize with a global variable (depending on the library lazy_static)

```rust
#[macro_use]
extern crate rbatis;
use rbatis::crud::CRUD;

lazy_static! {
  // Rbatis is thread-safe, and the runtime method is Send+Sync. there is no need to worry about thread contention
  static ref RB:Rbatis=Rbatis::new();
}
//Use the async_STd main method here, you can select actix, ToKIO, and other runtime main methods or spawn
#[tokio::main]
async fn main() {
      fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}

```

# CRUDTable

> CRUDTable An interface is a Trait that helps define the table structure, and it provides the following methods
* table_name() Table name (serpentine name corresponding to struct, optional rewrite)
* table_columns() Comma-separated string of table fields (all field names corresponding to the struct, optionally
  overridden)
* format_chain() Field formatting chain (you can format fields such as Pg database string date to timestamp #{date}::
  Timestamp, optional override)

  
> use the Attr attribute macro to achieve CRUDTable, which is more scalable and allows you to customize table names and fields

| attr    | doc |
| ------ | ------ |
| table_name | table name |
| table_columns | table columns use ',' split |
| formats_pg,formats_postgres | Postgres Column SQL formatting for type conversion|
| formats_mysql | Mysql Column SQL formatting for type conversion|
| formats_sqlite | Sqlite Column SQL formatting for type conversion|
| formats_mssql | Mssql Column SQL formatting for type conversion|

```rust
//for example-1(All automatic generation):
    #[crud_table]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// for example-2（Only the table name is changed, the rest is generated automatically）:
    #[crud_table(table_name:biz_activity)]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
//for example-3（Full customization）:
    #[crud_table(table_name:"biz_activity" | table_columns:"id,name,delete_flag" | formats_pg:"id:{}::uuid")]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
    //for example-4（Full customization）:
    #[crud_table(table_name:"biz_activity" | table_columns:"id,name,delete_flag" | formats_pg:"id:{}::uuid")]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
```

> (Optional) derive macro impl CRUDTable  is that the macros generate code in the compiler

```rust
#[macro_use]
extern crate rbatis;

#[derive(CRUDTable,Serialize, Deserialize, Clone, Debug)] 
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
    pub create_time: Option<rbatis::DateTimeNative>,
    pub version: Option<i32>,
    pub delete_flag: Option<i32>,
}
```

> (Optional) Or using IMPL to achieve CRUDTable has the benefit of high custom controllability and can reduce JSON serialization if you override methods such as field_name

```rust
    use rbatis::crud::CRUDTable;
    impl CRUDTable for BizActivity {
        //fn table_name() -> String {} //can rewrite
        //fn table_columns() -> String {}  //can rewrite
        //fn format_chain() -> Vec<Box<dyn ColumnFormat>>{} //can rewrite
        //... and more
    }
```

## database column formatting macro

> a Postgres database uses UUID as the primary key and fails to precompile if a string parameter is passed in under precompiled SQL.
> therefore requires a Pg database '::type' to cast, using column formatting macros The
> format macro is defined as formats_database:"column_name:format_string"  format_string with a {} symbol
> format macro use ',' split columns
> 
> Formatting is not required for special types, such as RbBytes or RbJson
> 
> for example:

```rust
#[crud_table(formats_pg:"id:{}::uuid")]
//#[crud_table(table_name:"biz_activity" | formats_pg:"id:{}::uuid,create_time:{}::timestamp")]
//#[crud_table(table_name:"biz_activity" | formats_mysql:...)]
//#[crud_table(formats_mysql:...)]
//#[crud_table(formats_sqlite:...)]
//#[crud_table(formats_mssql:...)]
//#[crud_table(formats_mssql:...|formats_pg:...)|...]
```

```rust
//this is example format.
#[crud_table(formats_pg:"id:{}::uuid")]
#[derive(Clone, Debug)]
pub struct BizUuid {
    pub id: Option<Uuid>,
    pub name: Option<String>,
}
#[tokio::test]
    pub async fn test_postgres_uuid() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        let rb = Rbatis::new();
        rb.link("postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
        let uuid = Uuid::from_str("df07fea2-b819-4e05-b86d-dfc15a5f52a9").unwrap();
        //create table
        rb.exec("CREATE TABLE biz_uuid( id uuid, name VARCHAR, PRIMARY KEY(id));",&vec![]).await;
        //insert table
        rb.save(&BizUuid { id: Some(uuid), name: Some("test".to_string()) },&[]).await;
        //update table
        rb.update_by_column::<BizUuid,_>("id",&BizUuid{ id: Some(uuid.clone()), name: Some("test_updated".to_string()) }).await;
        //query table
        let data: BizUuid = rb.fetch_by_column("id", &uuid).await.unwrap();
        println!("{:?}", data);
        //delete table
        rb.remove_by_column::<BizUuid,_>("id",&uuid).await;
    }
2020-12-14 14:26:58.072638 +08:00    INFO rbatis::plugin::log - [rbatis] [] Exec  ==> CREATE TABLE biz_uuid( id uuid, name VARCHAR, PRIMARY KEY(id));
2020-12-14 14:26:58.084423 +08:00    INFO rbatis::plugin::log - [rbatis] [] Exec  ==> INSERT INTO biz_uuid (id,name) VALUES ($1::uuid,$2)
                                                                [rbatis] [] Args  ==> ["df07fea2-b819-4e05-b86d-dfc15a5f52a9","test"]
2020-12-14 14:26:58.093312 +08:00    INFO rbatis::plugin::log - [rbatis] [] Exec  ==> UPDATE biz_uuid SET  name = $1 WHERE id = $2::uuid
                                                                [rbatis] [] Args  ==> ["test_updated","df07fea2-b819-4e05-b86d-dfc15a5f52a9"]
2020-12-14 14:26:58.103995 +08:00    INFO rbatis::plugin::log - [rbatis] [] Query ==> SELECT id,name FROM biz_uuid WHERE id = $1::uuid
                                                                [rbatis] [] Args  ==> ["df07fea2-b819-4e05-b86d-dfc15a5f52a9"]
2020-12-14 14:26:58.125965 +08:00    INFO rbatis::plugin::log - [rbatis] [] Exec  ==> DELETE FROM biz_uuid WHERE id = $1::uuid
                                                                [rbatis] [] Args  ==> ["df07fea2-b819-4e05-b86d-dfc15a5f52a9"]
```

# Wrapper( the sql Conditional constructor)

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
  //should use for example:    let RB=Rbatis::new();   RB.new_wrapper() or RB.new_wrapper_table()
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
            .order_by(true, &["id", "name"]);
  //Second step,send this into method arguments to an Rbatis object with a ***_wrapper(**), for example         
  let w = rb.new_wrapper().eq("id", "1");
  let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper( &w).await;     
```

# CRUD

```rust
let rb = Rbatis::new();
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();

let activity = BizActivity {
                id: Some("12312".to_string()),
                name: None,
                remark: None,
                create_time: Some(rbatis::DateTimeNative::now()),
                version: Some(1),
                delete_flag: Some(1),
            };
///save
rb.save(&activity,&[]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///save batch
rb.save_batch(&vec![activity],&[]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ),( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///The query, Option wrapper, is None if the data is not found
let result: Option<BizActivity> = rb.fetch_by_column("id", &"1".to_string()).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///query all
let result: Vec<BizActivity> = rb.fetch_list().await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1

///query id vec, return vec result
let result: Vec<BizActivity> = rb.fetch_list_by_column("id",&["1".to_string()]).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id IN  (?) 

///custom  query(use Wrapper)
let w = rb.new_wrapper().eq("id", "1");
let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper( &w).await;
//Query ==> SELECT  create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///delete
rb.remove_by_column::<BizActivity,_>("id", "1").await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id = 1

///delete batch
rb.remove_batch_by_column::<BizActivity,_>("id", &["1", "2"]).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id IN (  ?  ,  ?  ) 

///update(use Wrapper)  the param Skip should be empty or  &[Skip::Value(&bson::Bson::Null), Skip::Column("id"), Skip::Column(column)]
let w = rb.new_wrapper().eq("id", "12312");
rb.update_by_wrapper( &activity, &w, &[]).await;
//Exec ==> UPDATE biz_activity SET  create_time =  ? , delete_flag =  ? , status =  ? , version =  ?  WHERE id =  ? 
}

///...For more, check out CRUd.rs
```

# Expr-OperationalExpression

> expressions are used for operations on parameters, such as String CONCAT,addition, subtraction, multiplication, and division, square, mod, parameter (A.B.C), array (a[0]), comparison, etc...
> expressions are commonly found in py_sql if conditions, such as #{} or ${} expressions
> The operators supported by the > operand expression engine are shown below

| token    | doc  |
| ------ | ------ |
|   ()    |    brackets    | 
|   %     |        | 
|   ^     |   xor     | 
|   *     |        | 
|   **     |   square     | 
|   /     |        | 
|   +     |        | 
|   -     |        | 
|   <=     |        | 
|   <     |        | 
|   >     |        | 
|   > =     |        | 
|   !=     |        | 
|   ==     |        | 
|   &&     |        | 
|&#124;&#124;|        | 


# PySQL

> The PySQL syntax is used in SQL to modify the SYNTAX of SQL and is a form of dynamic SQL

> PySql syntax and the HTML_SQL syntax underlie the same Rust code compile-time generator, and since there is no expression engine, the compiled code is close to the performance of handwritten SQL

* py syntax, support for addition, subtraction, multiplication, and division if, for, in the trim, include, where, the
  set, choose, and so on syntax (and mybatis using the functions are almost the same)In the
* PY syntax, the line space for Child must be greater than that for father. It says it's its child
* PY syntax must end with:
* PY syntax support many express in same line.for example trim 'a': for item in arg:
* Py syntax support in SQL insert # {} and ${}, for example: inside the curly braces support arbitrary expressions such as ```${1 + 1}``` inserted into the SQL string '2', ```#{1 + 1}``` insert SQL '$' or'? 'and add the precompile parameter '2'

| method    | rust code |
| ------ | ------ |
| trim 'AND ': | trim |
| if arg!=1 : | if |
| for item in arg : | for |
| set : | sql:"SET" |
| choose : | match |
| when : | match expr |
| otherwise : | match { _ =>{} } |
| _: | match { _ =>{} }(v1.8.54 later) |
| where : | sql:"WHERE" |
| bind a=1+1: | let a = 1+1 |
| let  a=1+1:  | let a = 1+1(v1.8.54 later)|

> example

```rust
    SELECT * FROM biz_activity
    if  name != null:
      AND delete_flag = #{del}
      AND version = 1
      if  age!=1:
        AND version = 1
      AND version = 1
    AND a = 0
      yes
    and id in (
    trim ',': for item in ids:
      #{item},
    )
    and id in (
    trim ',': for index,item in ids:
      #{item},
    )
    trim 'AND':
      AND delete_flag = #{del2}
    choose:
        when age==27:
          AND age = 27
        otherwise:
          AND age = 0
    WHERE id  = '2';
```



# HtmlSql_Lang(mybatis3 XML compatibility)

* file("example/example_include.html")
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://github.com/rbatis/rbatis_sql/raw/main/mybatis-3-mapper.dtd">
<mapper>
    <sql id="page_sql"> select * from include </sql>
</mapper>
```

* file("example/example.html")
```html
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


```rust
    ///Here, the name of the method corresponds to the ID of the tag inside the XML. For example, id="select_by_condition" corresponds to async fn select_by_condition
    #[html_sql("example/example.html")]
    async fn select_by_condition(rb: &mut RbatisExecutor<'_,'_>, page_req: &PageRequest, name: &str) -> Page<BizActivity> { todo!() }

    #[tokio::test]
    pub async fn test_py_select_page() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        //use static ref
        let rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test")
            .await
            .unwrap();
        let a = select_by_condition(&mut rb.as_executor(), &PageRequest::new(1, 10), "test")
            .await
            .unwrap();
        println!("{:?}", a);
    }
```



# Mapper Macro

> Macros make it easy to write custom SQL, which is useful when you're writing complex multi-table associated queries, while keeping things simple and extensible. similar to @select dynamic SQL for Java/Mybatis

* sql macro:   Used to write raw SQL.   Rule: The first parameter to the SQL macro is the Rbatis instance name followed by SQL. Note that the SQL macro executes SQL
  that is driven to run directly, so it must be a replacement symbol for a specific database, such as mysql(? ,?) ,pg(
  $1,$2) for example ``` #[sql(RB, "select * from biz_activity where id = ?")] ```
* sql，py_sql,html_sql Either omit the rbatis keyword in the macro parenthesis (requires rbatis or RbatisExecutor references in the function)
* py_sql macro:  For writing 'dynamic SQL'.  Rule:   ```#{}``` is used instead of precompiled parameters (precompiled is
  safer and anti-SQL injection), and ```${}``` is used instead of direct replacement parameters (SQL injection risk).
* py_sql can use arithmetic expressions of macros, such as ` ` ` # {1 + 1}, # {arg}, # {arg [0]}, # {arg [0] + 'string'} ` ` `
* automatically converts the function ``` pub async fn select(name: & STR) -> rbatis::core::Result {} ```
* support Page Plugin!(Just put param ``` page_req: &PageRequest ```)
* param support ``` rb: &mut RbatisExecutor<'_,'_> ```or ``` rb: &Rbatis ``` ``` rb:&mut RBatisConnExecutor<'_> ``` ....more
* For PostgresSQL databases, precompiled SQL is used by default. Special types such as UUID require ::type cast type. For example, ' ' '#{arg}::uuid' ' '
* The actual execution of the function determines whether to execute Exec or Fetch depending on whether the return type contains DBExecResult


> Macro mapping native driver SQL

```rust
    lazy_static! {
     static ref RB:Rbatis=Rbatis::new();
   }

    #[sql(RB, "select * from biz_activity where id = ?")]
    async fn select(name: &str) -> BizActivity {}

    #[tokio::test]
    pub async fn test_macro() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
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

    #[py_sql("select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
    async fn py_select_page(rb: &mut RbatisExecutor<'_,'_>, page_req: &PageRequest, name: &str) -> Page<BizActivity> { todo!() }
    #[tokio::test]
    pub async fn test_macro_py_select() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = py_select_page(&mut rb.as_executor(), &PageRequest::new(1, 10), "test")
            .await
            .unwrap();
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
    async fn py_select(tx_id:&str,name: &str) -> Option<BizActivity> {}
    #[tokio::test]
    pub async fn test_macro_py_select() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = py_select("1").await.unwrap();
        println!("{:?}", a);
    }
```

> Macro mapping py_SQL (join)

```rust
#[py_sql("SELECT a1.name as name,a2.create_time as create_time 
                  FROM test.biz_activity a1,biz_activity a2 
                  WHERE a1.id=a2.id and a1.name=#{name}")]
    async fn join_select(rbatis: &Rbatis, name: &str) -> Option<Vec<BizActivity>> {}

    #[tokio::test]
    pub async fn test_join() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let results = join_select(&RB, "test").await.unwrap();
        println!("data: {:?}", results);
    }
```

> Macro mapping use page plugin

```rust

#[sql("select * from biz_activity where delete_flag = 0 and name = ?")]
async fn sql(rb:&Rbatis, page_req: &PageRequest, name: &str) -> Page<BizActivity> {}

#[sql(RB, "select * from biz_activity where delete_flag = 0 and name = ?")]
async fn sql_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}

#[py_sql(RB, "select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
async fn py_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}
```

> enable debug_mode see Rust code print

```toml
//just add Cargo.toml features "debug_mode"
//rbatis = {  features = ["debug_mode"]}
rbatis = { ...}
```


# Plugin: RbatisPagePlugin

```rust
        let mut rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        //The framework defaults to the RbatisPagePlugin. If customization is needed, the structure must implement Impl PagePlugin for Plugin***{}, for example:
        //rb.page_plugin = Box::new(RbatisPagePlugin {});

        let req = PageRequest::new(1, 20);//PageRequest(page,size)
        let wraper= rb.new_wrapper()
                    .eq("delete_flag",1);
        let data: Page<BizActivity> = rb.fetch_page_by_wrapper( &wraper,  &req).await.unwrap();
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
  "records": [
    {
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
    }
  ],
  "total": 5,
  "size": 20,
  "current": 1,
  "serch_count": true
}
```

# transaction

## default transaction

```rust
#[tokio::test]
pub async fn test_tx() {
    fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
    let RB = Rbatis::new();
    RB.link(MYSQL_URL).await.unwrap();
    
    //let (tx_id,_)=rb.begin_tx().await.unwrap();//Since version 1.8.40 also you can use begin_tx()

    // Since version 1.8.39, the transaction format is'tx:transactionID',no ‘tx:’  the id at the beginning is executed in normal mode
    let tx_id = "tx:1";
    //begin
    RB.begin(tx_id).await.unwrap();
    let v: bson::Bson = RB.fetch(tx_id, "SELECT count(1) FROM biz_activity;").await.unwrap();
    println!("{}", v.clone());
    //commit or rollback
    RB.commit(tx_id).await.unwrap();
}
```

## TxGuard

```rust
    use rbatis::executor::{RbatisRef, RBatisTxExecutor, ExecutorMut}; 
    pub async fn forget_commit(rb: &Rbatis) -> rbatis::core::Result<()> {
        // tx will be commit.when func end
        let mut tx = rb.acquire_begin().await?.defer_async(|mut tx1| async move {
            if !tx1.is_done() {
                tx1.rollback().await;
                println!("tx rollback success!");
            } else {
                println!("don't need rollback!");
            }
        });
        let v = tx
            .exec("update biz_activity set name = '6' where id = 1;", &vec![])
            .await;
        //tx.commit().await;  //if commit, print 'don't need rollback!' ,if not,print 'tx rollback success!'
        return Ok(());
    }

2020-12-03 14:53:24.908263 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Begin
2020-12-03 14:53:24.909074 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Query ==> SELECT count(1) FROM biz_activity;
2020-12-03 14:53:24.912973 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] ReturnRows <== 1
2020-12-03 14:53:24.914487 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Commit

```

## macro transaction

```rust
    ```rust
    #[py_sql("SELECT a1.name as name,a2.create_time as create_time
                      FROM test.biz_activity a1,biz_activity a2
                      WHERE a1.id=a2.id
                      AND a1.name=#{name}")]
    async fn join_select(rbatis: &mut RbatisExecutor<'_,'_> ,name: &str) -> Option<Vec<BizActivity>> {}

    #[tokio::test]
    pub async fn test_join() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        let rb: Rbatis = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();


        //begin
        let mut tx = rb.acquire_begin().await.unwrap();
        let results = join_select((&mut tx).into(), "test").await.unwrap();
        println!("data: {:?}", results);
        //commit or rollback
        tx.commit().await.unwrap();
    }
```
```


## transaction guard

```rust
#[tokio::test]
    pub async fn forget_commit(rb: &Rbatis) -> rbatis::core::Result<()> {
        // tx will be commit.when func end
        let mut tx = rb.acquire_begin().await?.defer_async(|mut tx1| async move {
            if !tx1.is_done() {
                tx1.rollback().await;
                println!("tx rollback success!");
            } else {
                println!("don't need rollback!");
            }
        });
        let v = tx
            .exec("update biz_activity set name = '6' where id = 1;", &vec![])
            .await;
        //tx.commit().await;  //if commit, print 'don't need rollback!' ,if not,print 'tx rollback success!'
        return Ok(());
    }

2020-12-03 14:53:24.908263 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Begin
2020-12-03 14:53:24.909074 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Query ==> SELECT count(1) FROM biz_activity;
2020-12-03 14:53:24.912973 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] ReturnRows <== 1
2020-12-03 14:53:24.914487 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Commit

```



# Conditional compilation switch runtime

> conditional compilation can select the specified database, run time compilation, and not compile the entire database. Conditional compilation can reduce program size
> conditional compilation supports any of the following compilation parameters

|  option | meaning |
| ------ | ------ |
| default  | default aysnc-io runtime，all of drivers(mysql,pg,sqlite,mssql) |
| async-io | async-io(async-std) runtime |
| tokio1 | tokio1.0runtime |
| tokio02 | tokio0.2 runtime |
| tokio03 | tokio0.3 runtime |
| mysql | mysql drivers |
| postgres | pg drivers |
| sqlite | sqlite drivers |
| mssql | mssql drivers |
> For example, custom selection of certain frameworks (asynchronous framework Tokio + Web framework Actix - Web + mysql database)

```rust
rbatis = { version = "*", default-features = false, features = ["tokio02","tokio1","mysql"] }
```



# Plugin: RbatisLogicDeletePlugin

> (Logical delete the query and delete methods provided for Rbatis are valid, such as fetch_list**(),remove**(), fetch**())

```rust
   let mut rb = init_rbatis().await;
   //rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new_opt("delete_flag",1,0)));//Customize deleted/undeleted writing
   rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new("delete_flag")));
   rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
           let r = rb.remove_batch_by_column::<BizActivity>("id", &["1".to_string(), "2".to_string()]).await;
           if r.is_err() {
               println!("{}", r.err().unwrap().to_string());
   }
```

> Controls whether logical delete plugins are enabled (table column contains columns as enabled)

```rust
 let mut rb = Rbatis::new();
        let mut plugin = RbatisLogicDeletePlugin::new("delete_flag");
        rb.set_logic_plugin(plugin);
        rb.link("mysql://root:123456@localhost:3306/test")
            .await
            .unwrap();

        let id = "12312".to_string();
        //logic delete sql:   "update biz_activity set delete_flag = 1 where id = ?"
        rb.remove_by_column::<BizActivity, _>("id", &id).await;
        //delete sql          "delete from biz_activity where id = ?"
        rb.remove_by_wrapper::<BizActivity>(&rb.new_wrapper().set_dml("delete").eq("id",&id)).await;
```


# macro-built-in
for example:
```rust
    #[crud_table]
    #[derive(Clone, Debug)]
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
        pub create_time: Option<rbatis::DateTimeNative>,
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

* ``` make_table```  Simplifies table construction by relying on the Default trait
* ``` make_table_field_vec ``` take the target Vec member attribute Vec collection
* ``` make_table_field_map ```  Gets the HashMap collection of member attributes of the target Vec

# Plug-in: SqlIntercept

> Implementing an interface

```rust
pub struct Intercept{}

impl SqlIntercept for Intercept{

    ///the intercept name
    fn name(&self) -> &str;

    /// do intercept sql/args
    /// is_prepared_sql: if is run in prepared_sql=ture
    fn do_intercept(&self, rb: &Rbatis, sql: &mut String, args: &mut Vec<bson::Bson>, is_prepared_sql: bool) -> Result<(), rbatis::core::Error>;
}
```

> Set to Rbatis

```rust
let mut rb=Rbatis::new();
rb.sql_intercepts.push(Box::new(Intercept{}));
```

# Plug-in: LogPlugin

```rust
use log::{debug, error, info, LevelFilter, trace, warn};
pub struct RbatisLog {}

impl LogPlugin for RbatisLog {
    
    //LevelFilter，allow close log print
    fn get_level_filter(&self) -> &LevelFilter {
        &self.level_filter
    }

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

> log plugin set into Rbatis

```rust
let mut rb=Rbatis::new();
rb.log_plugin = Box::new(RbatisLog{});
```

# Plug-in: distributed unique ID (snowflake algorithm(i64))

```rust
    use crate::plugin::snowflake::{new_snowflake_id};

    #[test]
    fn test_new_async_id() {
        crate::core::runtime::block_on(async {
            //Snowflake::new()  //Snowflake::new(Must be a singleton or global variable)
            
            //default use
            println!("{}", new_snowflake_id().to_string());
        });
    }
```

# Plug-in: distributed unique ID (MongoDB object id algorithm(String))

```rust
    #[test]
    fn test_new_async_id() {
        crate::core::runtime::block_on(async {
            println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
        });
    }
```

# Plug-in：Version lock/optimistic lock(deprecated)

> When updating a record, it is hoped that the record has not been updated by someone else
Optimistic locking implementation:

* Retrieves the current version when the record is fetched
* When updating, bring this version with you
* When updating, set version = newVersion(newVersion = oldVersion + 1) where version = oldVersion
* If the version is incorrect, it is not updated

```rust
 fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
 let mut rb = Rbatis::new();
 rb.version_lock_plugin = Some(Box::new(RbatisVersionLockPlugin::new("version")));
 rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
 let mut activity = BizActivity {
            id: Some("12312".to_string()),
            name: None,
            pc_link: None,
            h5_link: None,
            pc_banner_img: None,
            h5_banner_img: None,
            sort: None,
            status: Some(1),
            remark: None,
            create_time: Some(rbatis::DateTimeNative::now()),
            version: Some(BigDecimal::from(1)),
            delete_flag: Some(1),
        };
 let w = rb.new_wrapper().eq("id", "12312");
 let r = rb.update_by_wrapper( &mut activity, &w, &[]).await;
 //[rbatis] [] Exec  ==> UPDATE biz_activity SET  status = ?, create_time = ?, version = ?, delete_flag = ? WHERE version = ? AND id = ?
 //[rbatis] [] Args  ==> [1,"2021-01-30T01:45:35.207863200","2",1,"1","12312"]
```

#### note:
- If the optimistic lock field is NULL, it will not work. If it is not NULL, it will work
- Supported data types are: i8,i32,i64... ,u32,u64... , string (integer or bigDecimal string) "i32" for example "0"..." 99999"
- Integer or string integer newVersion = oldVersion + 1
- newVersion is written back to entity!
- Only the Update * method is supported



# Frequently Asked Questions

> Incremental Compile Causes Modifying HTML Files Without Triggering #[html_sql] Recompile?

Because the prerequisite for triggering a procedural macro recompile is a change in the current repository code

(In the root repository, a recompile can be triggered by changing a single line of code, or adding or deleting a new line. If not, force the cache to be removed using cargo clean.)

# Contact information
> WeChat ID: ``` zxj347284221  ```,WeChat group: add WeChat first, then pull in the group

<img style="width: 400px;height: 500px;" src="../_media/wechat.jpg"/>






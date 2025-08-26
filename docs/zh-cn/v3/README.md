* [常见问题](https://github.com/rbatis/rbatis/discussions)

[![Gitter](https://badges.gitter.im/rbatis_orm/community.svg)](https://gitter.im/rbatis_orm/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Rbatis-V3 文档

### 支持的数据库

| 数据库    | 支持情况 |
| ------ | ------ |
| Mysql            | √     |   
| Postgres         | √     |  
| Sqlite           | √     |  
| Mssql/Sqlserver            | √(50%)     |  
| MariaDB(Mysql)             | √     |
| TiDB(Mysql)             | √     |
| CockroachDB(Postgres)      | √     |


### 支持的数据结构

| 数据结构    | 是否支持 |
| ------ | ------ |
| Option                   | √     | 
| Vec                      | √     |  
| HashMap                      | √     |
| i32,i64,f32,f64,bool,String...更多rust类型   | √     |  
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
| 任何 serde 类型         | √     |

> Web框架 + Rbatis 示例

* [actix_web](https://github.com/rbatis/rbatis/tree/master/example/src/actix_web/main.rs)
* [hyper](https://github.com/rbatis/rbatis/tree/master/example/src/hyper/main.rs)
* [ntex](https://github.com/rbatis/rbatis/tree/master/example/src/ntex/main.rs)
* [rocket](https://github.com/rbatis/rbatis/tree/master/example/src/rocket/main.rs)
* [tide](https://github.com/rbatis/rbatis/tree/master/example/src/tide/main.rs)
* [warp](https://github.com/rbatis/rbatis/tree/master/example/src/warp/main.rs)
* [axum](https://github.com/rbatis/rbatis/tree/master/example/src/axum/main.rs)


# Rbatis 安装

> 安装依赖

``` toml
# rbson (必需)
serde = { version = "1", features = ["derive"] }
rbson = "2.0"

# 日志库(必需)
log = "0.4"
fast_log="1.3"

# rbatis (必需) 默认是 all-database+runtime-async-std-rustls
rbatis =  { version = "3.1" } 
# 如果你使用 actix-web+mysql
# rbatis = { version = "3.1", default-features = false, features = ["mysql","runtime-async-std-rustls"] }
```



# 条件编译选择异步运行时或驱动

> 条件编译可以选择指定的数据库和运行时编译，而不是编译所有数据库。条件编译可以减小程序大小

|选项 | 说明|
| ------ | ------ |
| default  | "all-database","runtime-tokio-rustls" |
| runtime-tokio-rustls |tokio+rusttls   |
| runtime-actix-rustls  | actix+rusttls |
| runtime-async-std-rustls  | async_std+rustls  |
| runtime-tokio-native-tls |  tokio+本地tls|
| runtime-actix-native-tls  | actix+本地tls |
| runtime-async-std-native-tls  | async_std+本地tls  |

> 例如

```rust
rbatis = { version = "*", default-features = false, features = ["runtime-tokio-rustls","mysql"] }
```

> 普通初始化

```rust
#[macro_use]
extern crate rbatis;

let rb = Rbatis::new();
///连接数据库，自动判断驱动类型 "mysql://*", "postgres://*", "sqlite://*","mssql://*"  加载驱动  
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
///自定义连接池参数。(可选)
// use crate::core::db::DBPoolOptions;
// let mut opt =DBPoolOptions::new();
// opt.max_connections=100;
// rb.link_opt("mysql://root:123456@localhost:3306/test",&opt).await.unwrap();

//启用日志输出，你也可以使用其他日志框架，这些都不合格
fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
```

> 使用全局变量初始化(依赖lazy_static库)

```rust
#[macro_use]
extern crate rbatis;
use rbatis::crud::CRUD;

lazy_static! {
  // Rbatis是线程安全的，运行时方法是Send+Sync。无需担心线程竞争
  static ref RB:Rbatis=Rbatis::new();
}
//这里使用async_std的main方法，你可以选择actix、tokio等其他运行时的main方法或spawn
#[tokio::main]
async fn main() {
      fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}
```

# CRUDTable

> CRUDTable 接口是一个Trait，用于帮助定义表结构，它提供了以下方法
* table_name() 表名 (struct对应的蛇形命名，可选重写)
* table_columns() 逗号分隔的表字段字符串 (struct对应的所有字段名，可选重写)
* format_chain() 字段格式化链 (可以格式化字段，如Pg数据库字符串日期到时间戳 #{date}::Timestamp，可选重写)

  
> 使用Attr属性宏实现CRUDTable，这种方式更具可扩展性，允许你自定义表名和字段

| 属性    | 说明 |
| ------ | ------ |
| table_name | 表名 |
| table_columns | 表列，用','分隔 |
| formats_pg,formats_postgres | Postgres列SQL格式化用于类型转换|
| formats_mysql | Mysql列SQL格式化用于类型转换|
| formats_sqlite | Sqlite列SQL格式化用于类型转换|
| formats_mssql | Mssql列SQL格式化用于类型转换|

```rust
//例如1(全部自动生成):
    #[crud_table]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// 例如2（只更改表名，其余自动生成）:
    #[crud_table(table_name:biz_activity)]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
//例如3（完全自定义）:
    #[crud_table(table_name:"biz_activity" | table_columns:"id,name,delete_flag" | formats_pg:"id:{}::uuid")]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
    //例如4（完全自定义）:
    #[crud_table(table_name:"biz_activity" | table_columns:"id,name,delete_flag" | formats_pg:"id:{}::uuid")]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
```

> (可选) 使用derive宏实现CRUDTable，这是宏在编译器中生成代码

```rust
#[macro_use]
extern crate rbatis;

#[derive(CRUDTable,Serialize, Deserialize, Clone, Debug)] 
pub struct BizActivity {    //将变成表名 BizActivity => "biz_activity"
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

> (可选) 或者使用IMPL实现CRUDTable，这种方式具有高自定义可控性，如果重写field_name等方法可以减少JSON序列化

```rust
    use rbatis::crud::CRUDTable;
    impl CRUDTable for BizActivity {
        //fn table_name() -> String {} //可以重写
        //fn table_columns() -> String {}  //可以重写
        //fn format_chain() -> Vec<Box<dyn ColumnFormat>>{} //可以重写
        //... 更多
    }
```

## 数据库列格式化宏

> Postgres数据库使用UUID作为主键，如果在预编译SQL下传入字符串参数会预编译失败。
> 因此需要Pg数据库'::type'进行转换，使用列格式化宏
> 格式宏定义为 formats_database:"column_name:format_string"  format_string带{}符号
> 格式宏使用','分隔列
> 
> 特殊类型不需要格式化，如RbBytes或RbJson
> 
> 例如:

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
//这是一个示例格式。
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
        //创建表
        rb.exec("CREATE TABLE biz_uuid( id uuid, name VARCHAR, PRIMARY KEY(id));",&vec![]).await;
        //插入表
        rb.save(&BizUuid { id: Some(uuid), name: Some("test".to_string()) },&[]).await;
        //更新表
        rb.update_by_column::<BizUuid,_>("id",&BizUuid{ id: Some(uuid.clone()), name: Some("test_updated".to_string()) }).await;
        //查询表
        let data: BizUuid = rb.fetch_by_column("id", &uuid).await.unwrap();
        println!("{:?}", data);
        //删除表
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

# Wrapper(SQL条件构造器)

| 方法    | SQL |
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

> Wrapper 特殊方法

| 方法    | SQL/rust代码 | 特性 |
| ------ | ------ |------ |
| push_wrapper(sql,wrapper)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |  Wrapper添加wrapper    |   
| push(sql,args)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |   SQL和参数添加到Wrapper   |   
| push_sql(sql)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |    添加SQL到wrapper  |   
| push_arg(arg)            |   wrapper.push(*)     |   Wrapper添加参数   |   
| do_if(test:bool,method)            |  wrapper.do_if(p.is_some(), *)    |  Wrapper执行判断    |   
| do_match(&[method...])  |  wrapper.do_match(p.is_some(), *))    |    Wrapper执行匹配条件  |   

> Wrapper 使用示例

```rust
  //应该这样使用:    let RB=Rbatis::new();   RB.new_wrapper() or RB.new_wrapper_table()
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
  //第二步，将此作为参数发送给带有***_wrapper(**)的Rbatis对象方法，例如         
  let w = rb.new_wrapper().eq("id", "1");
  let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper( w).await;     
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
///保存
rb.save(&activity,&[]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///批量保存
rb.save_batch(&vec![activity],&[]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ),( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///分片批量保存
rb.save_batch_slice(&vec![activity.clone(),activity.clone(),activity.clone()],2,&[]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ),( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///查询，Option包装器，如果未找到数据则为None
let result: Option<BizActivity> = rb.fetch_by_column("id", &"1".to_string()).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///查询所有
let result: Vec<BizActivity> = rb.fetch_list().await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1

///查询id向量，返回向量结果
let result: Vec<BizActivity> = rb.fetch_list_by_column("id",&["1".to_string()]).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id IN  (?) 

///自定义查询(使用Wrapper)
let w = rb.new_wrapper().eq("id", "1");
let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper( w).await;
//Query ==> SELECT  create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///删除
rb.remove_by_column::<BizActivity,_>("id", "1").await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id = 1

///批量删除
rb.remove_batch_by_column::<BizActivity,_>("id", &["1", "2"]).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id IN (  ?  ,  ?  ) 

///更新(使用Wrapper)  参数Skip应为空或 &[Skip::Value(&bson::Bson::Null), Skip::Column("id"), Skip::Column(column)]
let w = rb.new_wrapper().eq("id", "12312");
rb.update_by_wrapper( &activity, w, &[]).await;
//Exec ==> UPDATE biz_activity SET  create_time =  ? , delete_flag =  ? , status =  ? , version =  ?  WHERE id =  ? 
}

///...更多，请查看CRUd.rs
```

# Expr-操作表达式

> 表达式用于对参数进行操作，如字符串连接、加减乘除、平方、取模、参数(A.B.C)、数组(a[0])、比较等...
> 表达式常见于py_sql的if条件中，如#{}或${}表达式
> 操作数表达式引擎支持的运算符如下所示

| 符号    | 说明  |
| ------ | ------ |
|   ()    |    括号    | 
|   %     |        | 
|   ^     |   异或     | 
|   *     |        | 
|   **     |   平方     | 
|   /     |        | 
|   +     |        | 
|   -     |        | 
|   <=     |        | 
|   <     |        | 
|   >     |        | 
|   >=     |        | 
|   !=     |        | 
|   ==     |        | 
|   &&     |        | 
|&#124;&#124;|        | 

> 示例:
```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://github.com/rbatis/rbatis_sql/raw/main/mybatis-3-mapper.dtd">
<mapper>
    <sql id="page_sql"> select * from include where name like #{'%'+name+'%'} </sql>
</mapper>
```
```rust
 #[py_sql("select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
async fn py_select_page(rb: &mut RbatisExecutor<'_,'_>, page_req: &PageRequest, name: &str) -> Page<BizActivity> { todo!() }
```



# PySQL

> PySQL语法用于在SQL中修改SQL语法，是一种动态SQL形式

> PySql语法和HTML_SQL语法基于相同的Rust代码编译时生成器，由于没有表达式引擎，编译后的代码接近手写SQL的性能

* py语法，支持加减乘除if、for、trim、include、where、set、choose等语法(和mybatis使用的功能几乎相同)
* PY语法中，子级的行间距必须大于父级。这说明它是它的子级
* PY语法必须以:结尾
* PY语法支持在同一行中使用多个表达式。例如:
```
  trim ',': for item in ids:
    #{item},
```
* Py语法支持在SQL中插入#{}和${}，例如:大括号内支持任意表达式，如```${1 + 1}```插入到SQL字符串'2'中，```#{1 + 1}```插入SQL'$'或'?'并添加预编译参数'2'

| 方法    | rust代码 |
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

> 示例

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



# HtmlSql_Lang(mybatis3 XML兼容)

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
    ///这里，方法名对应XML内部标签的ID。例如，id="select_by_condition"对应async fn select_by_condition
    #[html_sql("example/example.html")]
    async fn select_by_condition(rb: &mut RbatisExecutor<'_,'_>, page_req: &PageRequest, name: &str) -> Page<BizActivity> { todo!() }

    #[tokio::test]
    pub async fn test_py_select_page() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        //使用静态引用
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



# Mapper 宏

> 宏使编写自定义SQL变得容易，这在编写复杂的多表关联查询时很有用，同时保持简单和可扩展。类似于Java/Mybatis的@select动态SQL

* sql宏: 用于编写原始SQL。规则: SQL宏的第一个参数是Rbatis实例名，后跟SQL。注意SQL宏执行SQL
  直接驱动运行，所以它必须是特定数据库的替换符号，例如mysql(? ,?) ,pg(
  $1,$2) 例如 ``` #[sql(RB, "select * from biz_activity where id = ?")] ```
* sql、py_sql、html_sql 可以省略宏括号中的rbatis关键字(需要函数中有rbatis或RbatisExecutor引用)
* py_sql宏: 用于编写'动态SQL'。规则: ```#{}``` 用于预编译参数(预编译更
  安全且防SQL注入)，```${}``` 用于直接替换参数(SQL注入风险)。
* py_sql可以使用宏的算术表达式，如 ``` # {1 + 1}, # {arg}, # {arg [0]}, # {arg [0] + 'string'} ```
* 自动转换函数 ``` pub async fn select(name: & STR) -> rbatis::core::Result {} ```
* 支持分页插件!(只需放入参数 ``` page_req: &PageRequest ```)
* 参数支持 ``` rb: &mut RbatisExecutor<'_,'_> ```或 ``` rb: &Rbatis ``` ``` rb:&mut RBatisConnExecutor<'_> ``` ....更多
* 对于PostgresSQL数据库，默认使用预编译SQL。特殊类型如UUID需要::type转换类型。例如 ' ' '#{arg}::uuid' ' '
* 函数的实际执行根据返回类型是否包含DBExecResult决定执行Exec还是Fetch


> 宏映射原生驱动SQL

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

> 宏映射py_SQL (传入Rbatis引用的模式)

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

> 宏映射py_SQL (传入事务TX_ID的模式)

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

> 宏映射py_SQL (连接)

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

> 宏映射使用分页插件

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

> 启用debug_mode查看Rust代码打印

```toml
//只需在Cargo.toml中添加features "debug_mode"
//rbatis = {  features = ["debug_mode"]}
rbatis = { ...}
```


# 插件: RbatisPagePlugin

```rust
        let mut rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        //框架默认为RbatisPagePlugin。如果需要自定义，结构体必须实现Impl PagePlugin for Plugin***{}，例如:
        //rb.page_plugin = Box::new(RbatisPagePlugin {});

        let req = PageRequest::new(1, 20);//PageRequest(页码,大小)
        
        let data: Page<BizActivity> = rb.fetch_page_by_wrapper( rb.new_wrapper()
                    .eq("delete_flag",1) ,  &req).await.unwrap();
        println!("{}", serde_json::to_string(&data).unwrap());
```

> json 结果

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

# 事务

## 默认事务

```rust
#[tokio::test]
pub async fn test_tx() {
    fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
    let RB = Rbatis::new();
    RB.link(MYSQL_URL).await.unwrap();
    
    //let (tx_id,_)=rb.begin_tx().await.unwrap();//从版本1.8.40开始也可以使用begin_tx()

    // 从版本1.8.39开始，事务格式是'tx:transactionID'，没有'tx:'开头的id在正常模式下执行
    let tx_id = "tx:1";
    //开始
    RB.begin(tx_id).await.unwrap();
    let v: bson::Bson = RB.fetch(tx_id, "SELECT count(1) FROM biz_activity;").await.unwrap();
    println!("{}", v.clone());
    //提交或回滚
    RB.commit(tx_id).await.unwrap();
}
```

## TxGuard

```rust
    use rbatis::executor::{RbatisRef, RBatisTxExecutor, ExecutorMut}; 
    pub async fn forget_commit(rb: &Rbatis) -> rbatis::core::Result<()> {
        // 当函数结束时事务将被提交
        let mut tx = rb.acquire_begin().await?.defer_async(|mut tx1| async move {
            if !tx1.is_done() {
                tx1.rollback().await;
                println!("事务回滚成功!");
            } else {
                println!("不需要回滚!");
            }
        });
        let v = tx
            .exec("update biz_activity set name = '6' where id = 1;", &vec![])
            .await;
        //tx.commit().await;  //如果提交，打印'不需要回滚!'，如果不提交，打印'事务回滚成功!'
        return Ok(());
    }

2020-12-03 14:53:24.908263 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Begin
2020-12-03 14:53:24.909074 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Query ==> SELECT count(1) FROM biz_activity;
2020-12-03 14:53:24.912973 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] ReturnRows <== 1
2020-12-03 14:53:24.914487 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Commit
```

## 宏事务

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


        //开始
        let mut tx = rb.acquire_begin().await.unwrap();
        let results = join_select((&mut tx).into(), "test").await.unwrap();
        println!("data: {:?}", results);
        //提交或回滚
        tx.commit().await.unwrap();
    }
```


## 事务保护

```rust
#[tokio::test]
    pub async fn forget_commit(rb: &Rbatis) -> rbatis::core::Result<()> {
        // 当函数结束时事务将被提交
        let mut tx = rb.acquire_begin().await?.defer_async(|mut tx1| async move {
            if !tx1.is_done() {
                tx1.rollback().await;
                println!("事务回滚成功!");
            } else {
                println!("不需要回滚!");
            }
        });
        let v = tx
            .exec("update biz_activity set name = '6' where id = 1;", &vec![])
            .await;
        //tx.commit().await;  //如果提交，打印'不需要回滚!'，如果不提交，打印'事务回滚成功!'
        return Ok(());
    }

2020-12-03 14:53:24.908263 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Begin
2020-12-03 14:53:24.909074 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Query ==> SELECT count(1) FROM biz_activity;
2020-12-03 14:53:24.912973 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] ReturnRows <== 1
2020-12-03 14:53:24.914487 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Commit
```



# 条件编译切换运行时

> 条件编译可以选择指定的数据库、运行时编译，而不编译整个数据库。条件编译可以减小程序大小
> 条件编译支持以下任何编译参数

| 选项 | 含义 |
| ------ | ------ |
| default  | 默认aysnc-io运行时，所有驱动(mysql,pg,sqlite,mssql) |
| async-io | async-io(async-std)运行时 |
| tokio1 | tokio1.0运行时 |
| tokio02 | tokio0.2运行时 |
| tokio03 | tokio0.3运行时 |
| mysql | mysql驱动 |
| postgres | pg驱动 |
| sqlite | sqlite驱动 |
| mssql | mssql驱动 |
> 例如，自定义选择某些框架(异步框架Tokio + Web框架Actix-Web + mysql数据库)

```rust
rbatis = { version = "*", default-features = false, features = ["tokio02","tokio1","mysql"] }
```



# 插件: RbatisLogicDeletePlugin

> (逻辑删除Rbatis提供的查询和删除方法有效，如fetch_list**()、remove**()、fetch**())

```rust
   let mut rb = init_rbatis().await;
   //rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new_opt("delete_flag",1,0)));//自定义已删除/未删除写入
   rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new("delete_flag")));
   rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
           let r = rb.remove_batch_by_column::<BizActivity>("id", &["1".to_string(), "2".to_string()]).await;
           if r.is_err() {
               println!("{}", r.err().unwrap().to_string());
   }
```

> 控制是否启用逻辑删除插件(表列包含列为启用)

```rust
 let mut rb = Rbatis::new();
        let mut plugin = RbatisLogicDeletePlugin::new("delete_flag");
        rb.set_logic_plugin(plugin);
        rb.link("mysql://root:123456@localhost:3306/test")
            .await
            .unwrap();

        let id = "12312".to_string();
        //逻辑删除sql:   "update biz_activity set delete_flag = 1 where id = ?"
        rb.remove_by_column::<BizActivity, _>("id", &id).await;
        //删除sql          "delete from biz_activity where id = ?"
        rb.remove_by_wrapper::<BizActivity>(&rb.new_wrapper().set_dml("delete").eq("id",&id)).await;
```


# 内置宏

例如:
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

* ``` make_table```  通过依赖Default trait简化表构造
* ``` make_table_field_vec ``` 获取目标Vec成员属性Vec集合
* ``` make_table_field_map ```  获取目标Vec成员属性的HashMap集合

# 插件: SqlIntercept

> 拦截器可以在执行前修改你的SQL和参数。

```rust
pub struct Intercept{}

impl SqlIntercept for Intercept{

    ///拦截器名称
    fn name(&self) -> &str;

    /// 执行拦截sql/args
    /// is_prepared_sql: 如果在prepared_sql=true下运行
    fn do_intercept(&self, rb: &Rbatis, sql: &mut String, args: &mut Vec<bson::Bson>, is_prepared_sql: bool) -> Result<(), rbatis::core::Error>;
}
```

> 设置到Rbatis

```rust
let mut rb=Rbatis::new();
rb.sql_intercepts.push(Box::new(Intercept{}));
```

# 插件: LogPlugin

```rust
use log::{debug, error, info, LevelFilter, trace, warn};
pub struct RbatisLog {}

impl LogPlugin for RbatisLog {
    
    //LevelFilter，允许关闭日志打印
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

> 日志插件设置到Rbatis

```rust
let mut rb=Rbatis::new();
rb.log_plugin = Box::new(RbatisLog{});
```

# 插件: 分布式唯一ID (雪花算法(i64))

```rust
    use crate::plugin::snowflake::{new_snowflake_id};

    #[test]
    fn test_new_async_id() {
        crate::core::runtime::block_on(async {
            //Snowflake::new()  //Snowflake::new(必须是单例或全局变量)
            
            //默认使用
            println!("{}", new_snowflake_id().to_string());
        });
    }
```

# 插件: 分布式唯一ID (MongoDB对象id算法(String))

```rust
    #[test]
    fn test_new_async_id() {
        crate::core::runtime::block_on(async {
            println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
        });
    }
```

# 插件：版本锁/乐观锁(已弃用)

> 更新记录时，希望记录没有被其他人更新
乐观锁实现:

* 获取记录时检索当前版本
* 更新时带上这个版本
* 更新时设置 version = newVersion(newVersion = oldVersion + 1) where version = oldVersion
* 如果版本不正确，则不更新

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
 
 let r = rb.update_by_wrapper( &mut activity, rb.new_wrapper().eq("id", "12312"), &[]).await;
 //[rbatis] [] Exec  ==> UPDATE biz_activity SET  status = ?, create_time = ?, version = ?, delete_flag = ? WHERE version = ? AND id = ?
 //[rbatis] [] Args  ==> [1,"2021-01-30T01:45:35.207863200","2",1,"1","12312"]
```

#### 注意:
- 如果乐观锁字段为NULL，则不生效。如果不为NULL，则生效
- 支持的数据类型为: i8,i32,i64... ,u32,u64... , 字符串(整数或bigDecimal字符串) "i32" 例如 "0"..." 99999"
- 整数或字符串整数 newVersion = oldVersion + 1
- newVersion会写回实体!
- 仅支持Update *方法



# 常见问题

> 增量编译导致修改HTML文件而不触发#[html_sql]重新编译?

因为触发过程宏重新编译的前提是当前存储库代码发生更改

(在根存储库中，可以通过更改单行代码或添加/删除新行来触发重新编译。如果没有，则使用cargo clean强制删除缓存。)

# 联系信息

> [github-discussions](https://github.com/rbatis/rbatis/discussions)


> 微信ID: ``` zxj347284221  ```

<img style="width: 400px;height: 500px;" src="../_media/wechat.jpg"/>
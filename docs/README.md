
* [English](https://rbatis.github.io/rbatis.io/#/README_EN)

### 支持数据库
| 数据库    | 已支持 |
| ------ | ------ |
| Mysql            | √     |   
| Postgres         | √     |  
| Sqlite           | √     |  
| Mssql/Sqlserver           | √     |  
| MariaDB(Mysql)             | √     |
| TiDB(Mysql)             | √     |
| CockroachDB(Postgres)      | √     |


# Rbatis-初始化

> 安装依赖
##### 安装依赖(Cargo.toml)，执行 cargo install
``` rust
#json支持(必须)
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

#日期支持(必须)
chrono = { version = "0.4", features = ["serde"] }

#log日志支持(必须)
log = "0.4"
fast_log="1.2.9"

#BigDecimal支持(可选)
bigdecimal = "0.2"

#rbatis支持，版本保持一致(必须)
rbatis =  { version = "1.8" } 
rbatis-macro-driver = { version = "1.8" }
```


> 普通初始化
```rust
let rb = Rbatis::new();
///连接数据库,自动判断驱动类型"mysql://*","postgres://*","sqlite://*","mssql://*"加载驱动   
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
///自定义连接池参数。(可选)
// let mut opt =PoolOptions::new();
// opt.max_size=100;
// rb.link_opt("mysql://root:123456@localhost:3306/test",&opt).await.unwrap();

//启用日志输出，你也可以使用其他日志框架，这个不限定的
fast_log::init_log("requests.log", 1000,log::Level::Info,true);
```

> 使用全局变量初始化（需依赖lazy_static这个库）
```rust
lazy_static! {
  // Rbatis是线程、协程安全的，运行时的方法是Send+Sync，内部使用DashMap等等并发安全的map实现，无需担心线程竞争
  static ref RB:Rbatis=Rbatis::new();
}
//这里使用async_std的main方法，你可以选择actix,tokio等等其他runtime运行时的main方法或者 spawn
#[async_std::main]
async fn main() {
      //启用日志输出，你也可以使用其他日志框架，这个不限定的
      fast_log::init_log("requests.log", 1000,log::Level::Info,true);
      //初始化连接池
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}

```



# 表模型定义

>  CRUDEnable 接口 是一个辅助定义表结构的Trait，它提供了以下方法

*  IdType(对应struct的id字段类型，必须声明)
*  id_name()主键id的名称（非必填，默认id）
*  table_name()表名(对应struct的蛇形命名，可选重写)
*  table_columns()表字段逗号分隔的字符串(对应struct的所有字段名称，可选重写)
*  format_chain() 字段格式化链（可以对字段做format例如Pg数据库的字符串date转timestamp #{date}::timestamp，可选重写)


>  使用derive宏实现CRUDEnable 好处是宏在编译器生成代码，性能较高.
```rust
#[macro_use]
extern crate rbatis_macro_driver;

#[derive(CRUDEnable,Serialize, Deserialize, Clone, Debug)] 
pub struct BizActivity {    //表名称 BizActivity=> "biz_activity"
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

> 另一种选择是使用Attr属性宏实现CRUDEnable，它的扩展性更高，可以自定义表名称，字段

| 属性    | 含义 |
| ------ | ------ |
| id_name | 表主键id名称 |
| id_type | 表主键类型 |
| table_name | 表名称 |
| table_columns | 表列成员用','分割 |

```rust
//例子1(全部自动判断):
    #[crud_enable]
    #[derive(Serialize, Deserialize, Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// 例子2（只自定义表名，其他自动）:
    #[crud_enable(table_name:biz_activity)]
    #[derive(Serialize, Deserialize, Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// 例子3（全部自定义，其他自动）:
    #[crud_enable( id_name:id |  id_type:String |  table_name:biz_activity |  table_columns:id,name,delete_flag )]
    #[derive(Serialize, Deserialize, Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
```


>  (可选)或者使用impl实现CRUDEnable 好处是自定义可控性高，如果重写field_name等方法可以减少json序列化
```rust
    impl CRUDEnable for BizActivity {
        type IdType = String; //默认提供IdType类型即可，接口里其他的method默认使用json序列化实现
        //fn table_name() -> String {} //可重写
        //fn table_columns() -> String {}  //可重写
        //fn format_chain() -> Vec<Box<dyn ColumnFormat>>{} //可重写
    }
```



# 使用Wrapper-Sql

> Wrapper是对sql的一系列包装，注意结尾调用check()检查正确性

| 方法    | sql |
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

> Wrapper的特殊方法

| 方法    | sql/rust_code | 功能 |
| ------ | ------ |------ |
| push_wrapper(sql,wrapper)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |  wrapper添加wrapper    |   
| push(sql,args)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |   wrapper添加sql和参数   |   
| push_sql(sql)            |  'SELECT * FROM TABLE'=> 'SELECT * FROM TABLE #{sql}'     |    wrapper添加sql  |   
| push_arg(arg)            |   wrapper.push(*)     |   wrapper添加参数   |   
| do_if(test:bool,method)            |  wrapper.do_if(p.is_some(), *)    |  wrapper执行判断    |   
| do_match(&[method...])  |  wrapper.do_match(p.is_some(), *))    |    wrapper执行match条件匹配  |   

> Wrapper使用例子
```rust
  //初始化Wrapper可以使用let rb=Rbatis::new();rb.new_wrapper()方法
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


# Wrapper增删改查

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
///保存
rb.save("",&activity).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///批量保存
rb.save_batch("", &vec![activity]).await;
//Exec ==> INSERT INTO biz_activity (create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ),( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )

///查询, Option包装，有可能查不到数据则为None
let result: Option<BizActivity> = rb.fetch_by_id("", &"1".to_string()).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///查询-全部
let result: Vec<BizActivity> = rb.list("").await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1

///批量-查询id
let result: Vec<BizActivity> = rb.list_by_ids("",&["1".to_string()]).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id IN  (?) 

///自定义查询
let w = rb.new_wrapper().eq("id", "1").check().unwrap();
let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper("", &w).await;
//Query ==> SELECT  create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///删除
rb.remove_by_id::<BizActivity>("", &"1".to_string()).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id = 1

///批量删除
rb.remove_batch_by_id::<BizActivity>("", &["1".to_string(), "2".to_string()]).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id IN (  ?  ,  ?  ) 

///修改
let w = rb.new_wrapper().eq("id", "12312").check().unwrap();
rb.update_by_wrapper("", &activity, &w).await;
//Exec ==> UPDATE biz_activity SET  create_time =  ? , delete_flag =  ? , status =  ? , version =  ?  WHERE id =  ? 
}

///...还有更多方法，请查看crud.rs
```

# Py语法

> py语法是使用在sql中，用于修改sql的语法，也是动态sql的一个形式

* py语法支持加减乘除，if，for in,trim,include,where,set,choose等等语法(和mybatis使用的功能几乎一样)
* py语法中，child的行空格必须大于father的空格。表示自己是它的child
* py语法必须以 : 结尾

| 方法    | rust代码 |
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

>例如
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

> 1 直接使用Rbatis执行pysql
``` python
//执行到远程mysql 并且获取结果。支持serde_json可序列化的任意类型
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

> 2使用宏映射执行pysql，见 #Macro-智能宏映射

# 宏映射

> 宏实现方法能非常方便的编写自定义的sql，这个在你编写复杂的多表关联查询时非常有用，同时保持简洁和扩展性

*  sql宏的第一个参数是Rbatis实例名称，后面是sql。注意sql宏执行的是驱动直接运行的sql，所以必须是具体数据库的替换符号，例如mysql(?,?),pg($1,$2)例如 #[sql(RB, "select * from biz_activity where id = ?")]
*  py_sql宏和sql宏类似，区别就是 使用#{}代替预编译参数（预编译较安全，防sql注入），${}代替直接替换参数（有sql注入风险）
*  宏根据方法定义生成执行逻辑，又点类似于 java/mybatis的@select动态sql 
*  第一个参数 RB是本地依赖Rbatis引用的名称,例如  'dao::RB', 'com::xxx::RB'都可以
*  第二个参数 是标准的驱动sql，注意对应数据库参数mysql为？,pg为$1...
*  宏会自动转换函数为  pub async fn select(name: &str) -> rbatis::core::Result<BizActivity> {}
*  宏支持分页插件

> 宏映射 原生驱动sql
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

> 宏映射 py_sql(传入Rbatis引用的模式)
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

> 宏映射 py_sql(传入事务tx_id的模式)
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

> 宏映射 py_sql (join表连接)
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

> 宏映射 使用分页插件
```rust

#[sql(RB, "select * from biz_activity where delete_flag = 0 and name = ?")]
fn sql_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}

#[py_sql(RB, "select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
fn py_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}
```


> 禁用打印宏生成的Rust代码
```toml
rbatis-macro-driver = { version = "替换版本号" ,default-features=false, features = ["no_print"]}
```



# 事务

> 普通事务 
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

> 宏事务
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
        let results = join_select(&RB,tx_id, "test").await.unwrap();
        println!("data: {:?}", results);
        //commit or rollback
        RB.commit(tx_id).await.unwrap();
    }
```


# 选择和切换运行时
> Rbatis 新版本会删除对 Tokio的依赖，改用async_std，因为async_std的顶层依赖async-global-executor已经依赖了tokio0.2 和tokio0.3
并且它的api支持做的更好，async_std支持取协程id.以下是切换配置

```rust
# 使用tokio运行时,async-std以后的版本支持tokio03,目前大部分框架基于02
async-std = { version = "*", features = ["attributes","tokio02"] }
rbatis-core = { version = "*", default-features = false ,  features = ["all","tokio02"] }
rbatis = { version = "*", default-features = false , features = ["tokio02"] }
# 使用async-std默认运行时
async-std = { version = "*", features = ["attributes"] }
```



# 插件：分页RbatisPagePlugin
```rust
        let mut rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        //框架默认RbatisPagePlugin，如果需要自定义的话需要结构体 必须实现impl PagePlugin for Plugin***{}，例如：
        //rb.page_plugin = Box::new(RbatisPagePlugin {});

        let req = PageRequest::new(1, 20);//分页请求，页码，条数
        let wraper= rb.new_wrapper()
                    .eq("delete_flag",1)
                    .check()
                    .unwrap();
        let data: Page<BizActivity> = rb.fetch_page_by_wrapper("", &wraper,  &req).await.unwrap();
        println!("{}", serde_json::to_string(&data).unwrap());
```
> json result 运行结果
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

# 插件：逻辑删除RbatisLogicDeletePlugin
> (逻辑删除针对Rbatis提供的查询方法和删除方法有效，例如方法 list**(),remove**()，fetch**())
```rust
   let mut rb = init_rbatis().await;
   //rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new_opt("delete_flag",1,0)));//自定义已删除/未删除 写法
   rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new("delete_flag")));
   rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
           let r = rb.remove_batch_by_id::<BizActivity>("", &["1".to_string(), "2".to_string()]).await;
           if r.is_err() {
               println!("{}", r.err().unwrap().to_string());
   }
```

# 插件：SQL拦截器SqlIntercept

> 实现接口
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

> 设置到Rbatis
```rust
let mut rb=Rbatis::new();
rb.sql_intercepts.push(Box::new(Intercept{}));
```

# 插件：日志打印插件
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
> 设置到Rbatis
```rust
let mut rb=Rbatis::new();
rb.log_plugin = Box::new(RbatisLog{});
```


## 欢迎捐赠
![Image text](https://zhuxiujia.github.io/gomybatis.io/assets/wx_account.jpg)
或者[GitHub](https://github.com/rbatis/rbatis) 点star

## 联系方式
微信号: zxj347284221
微信群：先加微信，然后拉进群





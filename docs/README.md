### 支持数据库类型√已支持.进行中
| 数据库    | 已支持 |
| ------ | ------ |
| Mysql            | √     |   
| Postgres         | √     |  
| Sqlite           | √     |  
| TiDB             | √     |
| CockroachDB      | √     |


# Rbatis-初始化

> 安装依赖
##### 使用方法：添加依赖(Cargo.toml)
``` rust
# add this library,and cargo install

#json支持(必须)
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

#日期支持(必须)
chrono = { version = "0.4", features = ["serde"] }

#log日志支持(必须)
log = "0.4"
fast_log="1.2.2"

#BigDecimal支持(可选)
bigdecimal = "0.2"

#rbatis支持，版本保持一致(必须)
rbatis-core = { version = "1.6", features = ["all"]}
rbatis =  { version = "1.6" } 
rbatis-macro-driver = { version = "1.6" }

```


> 普通初始化
```rust
///rbatis初始化，rbatis是线程安全可使用lazy_static 定义为全局变量
let rb = Rbatis::new();
///连接数据库   
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
///自定义连接池参数。(可选)
// let mut opt =PoolOptions::new();
// opt.max_size=100;
// rb.link_opt("mysql://root:123456@localhost:3306/test",&opt).await.unwrap();

//启用日志输出，你也可以使用其他日志框架，这个不限定的
fast_log::log::init_log("requests.log", &RuntimeType::Std).unwrap();
```

> 使用全局变量初始化
```rust
lazy_static! {
  // Rbatis是线程、协程安全的，运行时的方法是Send+Sync，内部使用DashMap等等并发安全的map实现，无需担心线程竞争
  static ref RB:Rbatis=Rbatis::new();
}
//这里使用async_std的main方法，你可以选择actix,tokio等等其他runtime运行时的main方法或者 spawn
#[async_std::main]
async fn main() {
      //启用日志输出，你也可以使用其他日志框架，这个不限定的
      fast_log::log::init_log("requests.log", &RuntimeType::Std).unwrap();
      //初始化连接池
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}

```



# CRUDEnable-模型和表定义

>  CRUDEnable 接口 是一个辅助定义表结构的Trait，它提供了以下方法
* table_name()表名(对应struct的蛇形命名)
* IdType(对应struct的id字段类型)
* table_fields()表字段逗号分隔的字符串(对应struct的所有字段名称)
* format_chain() 字段格式化链条（可以对字段做format例如Pg数据库的字符串date转timestamp #{date}::timestamp ）


>  使用宏实现CRUDEnable(可选) 好处是宏在编译器生成代码，性能较高
```rust
#[macro_use]
extern crate rbatis_macro_driver;
///数据库表模型 CRUDEnable也可以写成 impl CRUDEnable for BizActivity{}
#[derive(CRUDEnable,Serialize, Deserialize, Clone, Debug)]
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
    pub create_time: Option<NaiveDateTime>,
    pub version: Option<i32>,
    pub delete_flag: Option<i32>,
}
```

>  使用impl实现CRUDEnable(可选) 好处是自定义可控性高，如果重写field_name等方法可以减少json序列化
```rust
    impl CRUDEnable for BizActivity {
        type IdType = String;
        //fn table_name() -> String {}
        //fn table_fields() -> String {} 
        //fn format_chain() -> Vec<Box<dyn ColumnFormat>>{}
    }
```




# CRUD-简化

```rust
let rb = Rbatis::new();
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();

let wrapper = rb.new_wrapper()
            .eq("id", 1)                    //sql:  id = 1
            .and()                          //sql:  and 
            .ne("id", 1)                    //sql:  id <> 1
            .in_array("id", &[1, 2, 3])     //sql:  id in (1,2,3)
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


# Wrapper-使用Sql包装

> Wrapper是对sql的一系列包装，注意结尾调用check()检查正确性

| 方法    | sql |
| ------ | ------ |
| and            |  AND     |   
| or         | OR     |  
| having           | HAVING {}     |  
| all_eq(map[String,**])             | a = *, b= *,c=*     |
| eq      |  a = *    |
| ne      |  a <> *    |
| order_by(bool,&[str])      |  order by * desc, * asc....    |
| group_by      |  group by *,*,*    |
| gt      |  a > *    |
| ge      |  a >= *    |
| lt      |  a < *    |
| le      |  a <= *    |
| between(column,min,max)      |  BETWEEN * AND *    |
| not_between(column,min,max)      |  NOT BETWEEN * AND *    |
| like(column,obj)      |   LIKE '%*%'   |
| like_left(column,obj)      |   LIKE '%*'   |
| like_right(column,obj)      |   LIKE '*%'   |
| not_like(column,obj)      |   NOT LIKE  '%*%'   |
| is_null(column)      |   * IS NULL   |
| is_not_null(column)      |   * IS NOT NULL   |
| in_array(column,args)      |   IN (*,*,*,*)  |
| not_in(column,args)      |   NOT IN (*,*,*,*)  |


> Wrapper使用例子
```rust
  //初始化Wrapper可以使用let rb=Rbatis::new();rb.new_wrapper()方法
  let w = Wrapper::new(&DriverType::Mysql).eq("id", 1)
            .ne("id", 1)
            .in_array("id", &[1, 2, 3])
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

# Py-使用Py语法

# Macro-智能宏映射

# Xml-使用xml

> An awesome project.

### 支持数据库类型√已支持.进行中
| 数据库    | 已支持 |
| ------ | ------ |
| Mysql            | √     |   
| Postgres         | √     |  
| Sqlite           | √     |  
| TiDB             | √     |
| CockroachDB      | √     |


# Rbatis-初始化
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
      fast_log::log::init_log("requests.log", &RuntimeType::Std).unwrap();
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}

```



# CRUDEnable-模型和表定义

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

>  CRUDEnable是一个辅助定义表结构的trait，它提供了
* table_name()表名(对应struct的蛇形命名)
* IdType(对应struct的id字段类型)
* table_fields()表字段逗号分隔的字符串(对应struct的所有字段名称)
* format_chain() 字段格式化链条（可以对字段做format例如Pg数据库的字符串date转timestamp #{date}::timestamp ）


# CRUD-简化

# Wrapper-使用Sql包装

# Py-使用Py语法

# Macro-智能宏映射

# Xml-使用xml

> An awesome project.

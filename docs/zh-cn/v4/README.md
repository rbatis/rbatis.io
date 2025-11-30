### rbatis-v4

一个高性能的SQL工具包和编译时ORM库。一个异步的、纯`Rust`的SQL crate，具有编译时动态SQL特性。

它是一个ORM，一个小型编译器，一种动态SQL语言。

* 兼容大部分mybatis3语法。你可以开始将Java项目重写为`Rust`！
* 无运行时，无垃圾回收，高性能，基于Future/Tokio
* 零成本[动态SQL](../v4/dyn_sql.md)，使用(proc-macro,compile-time,Cow(减少不必要的克隆))技术实现。不需要ONGL引擎(mybatis)
* 类似JDBC的驱动设计，驱动使用cargo.toml依赖和```Box<dyn Driver>```分离
* 所有数据库驱动都支持```#{arg}```、```${arg}```、```?```占位符(pg/mssql自动处理'?'为'$1'和'@P1')
* 动态SQL(在SQL中自由编写代码)、分页、```py_sql```查询语言和```html_sql```(受Mybatis启发)。
* 动态配置连接池(基于https://github.com/rbatis/fast_pool)
* 支持基于拦截器实现的日志记录
* 100%安全的纯`Rust`，启用`#![forbid(unsafe_code)]`
* [rbatis/example](https://github.com/rbatis/rbatis/tree/master/example)
* [abs_admin项目](https://github.com/rbatis/abs_admin) 一个后台用户管理系统(Vue.js+rbatis+axum)
* [salvo_admin项目](https://github.com/feihua/salvo-admin) 一个后台权限管理系统(react+rbatis+salvo)


#### 疑难解答
一切以英文文档为主，如果更新不及时请优先参考英文版。

文档内可能写的不够详细，如果有不够明白的问题，你可以从以下几个渠道获取帮助：
1. [example 示例项目](https://github.com/rbatis/rbatis/tree/master/example) 这里展示了绝大部分的crud使用示例
2. [tests 测试用例](https://github.com/rbatis/rbatis/tree/master/tests) 这里也提供了很多测试用例
3. [Rbatis AI Wiki](https://deepwiki.com/rbatis/rbatis) deepwiki提供的ai，这里可以直接去rbatis的功能进行提问（注意可能有过时函数，请实际测试再使用）


#### 视频教程

1. [基于ai的使用教程](https://www.bilibili.com/video/BV1YwUQBXEKf/)  作者亲自录制
2. [简单的入门教程](https://www.bilibili.com/video/BV1HzSFB8E8n)


#### 支持的数据库驱动

> RBatis支持任何实现[rdbc](https://crates.io/crates/rbdc)驱动。
> 如果你没有想要的以下驱动，你可以自己编写，只要实现```rbdc::db::*``` trait即可

| 数据库(crates.io)                                 | github链接                                                                           |
|-----------------------------------------------------|---------------------------------------------------------------------------------------|
| [Mysql](https://crates.io/crates/rbdc-mysql)        | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [Postgres](https://crates.io/crates/rbdc-pg)        | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                | 
| [Sqlite](https://crates.io/crates/rbdc-sqlite)      | [rbatis/rbdc-sqlite](https://github.com/rbatis/rbatis/tree/master/rbdc-sqlite)        |
| [Mssql](https://crates.io/crates/rbdc-mssql)        | [rbatis/rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)          |
| [MariaDB](https://crates.io/crates/rbdc-mysql)      | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [TiDB](https://crates.io/crates/rbdc-mysql)         | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |
| [CockroachDB](https://crates.io/crates/rbdc-pg)     | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |
| [Oracle](https://crates.io/crates/rbdc-oracle)      | [chenpengfan/rbdc-oracle](https://github.com/chenpengfan/rbdc-oracle)                 |
| [TDengine](https://crates.io/crates/rbdc-tdengine)  | [tdcare/rbdc-tdengine](https://github.com/tdcare/rbdc-tdengine)                       |

#### 过时的方法

- xxx_by_column 在最新的4.6.8版本全部被删除，请使用xxx_by_map,或者用htmlsql等
- update_by_column_batch 
- 当你询问DeepWiki时，它可能给出的是过时的函数，这时候请复制运行一下看看是否存在


#### 安装

* 安装步骤: Cargo.toml(运行命令`cargo update`)

* `toml`(默认)

```toml
#rbatis依赖
rbs = { version = "4.6"}
rbatis = { version = "4.6"}
rbdc-sqlite = { version = "4.6" }
#rbdc-mysql={version="4.6"}
#rbdc-pg={version="4.6"}
#rbdc-mssql={version="4.6"}

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```

* `toml` `native-tls` (选项)

```toml
rbs = { version = "4.6" }
rbdc-sqlite = { version = "4.6", default-features = false, features = ["tls-native-tls"] }
#rbdc-mysql={version="4.6", default-features = false, features = ["tls-native-tls"]}
#rbdc-pg={version="4.6", default-features = false, features = ["tls-native-tls"]}
#rbdc-mssql={version="4.6", default-features = false, features = ["tls-native-tls"]}
rbatis = { version = "4.6" }

serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
log = "0.4"
fast_log = "1.6"
```

#### 数据库的初始化

后续所有代码的执行，都需要一个数据库执行器，所以第一步就是要初始化一个执行器。
示例如下：
```rust

async fn init_db() -> rbatis::RBatis {
	/// 启用日志crate显示sql日志
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");
    /// 初始化rbatis。你也可以调用rb.clone()。这是一个Arc指针
    let rb = RBatis::new();
    /// 连接数据库 

    //init() 只设置驱动
    //rb.init(rbdc_sqlite::driver::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();
    
    // link() 将设置驱动并尝试使用acquire()连接数据库
    // sqlite 
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();
    // mysql 
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();
    // postgresql 
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();
    // mssql/sqlserver
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();
	
	
    rb
}

```

#### 表定义

> RBatis遵循简洁代码风格，因此数据库表结构只是一个可能使用RBatis提供的数据库类型的普通结构体。   
> 结构体必须实现 `Serialize` 和 `Deserialize` trait                 
> 我们的结构体只是一个普通的结构体，要想生成相关的crud方法，就需要添加宏。  
> 通过宏来生成的操作数据库的代码               
  

示例：
```rust


//只是一个普通的结构体
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

```
> 下面，我们将使用```crud!()```宏```impl_*!()```宏使表结构具有查询和修改数据库的能力   

#### crud!宏
   
> `crud!` 宏是 RBatis 中最常用的宏，用于自动生成完整的 CRUD 操作方法。


> 语法规则
```rust
// 基本语法
crud!(StructName {});

// 指定表名
crud!(StructName {}, "table_name");
```


> 生成的方法

`crud!` 宏会展开为四个子宏的调用：

- `impl_insert!` - 生成插入方法
- `impl_select!` - 生成查询方法
- `impl_update!` - 生成更新方法
- `impl_delete!` - 生成删除方法

`impl_*`  宏在后面会进行讲解。


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
//crud = async fn insert(...)+async fn  select_by_map(...)+ async fn  update_by_map(...)+async fn  delete_by_map(...)...等等
rbatis::crud!(BizActivity {}); 

```




##### 查询

> crud!默认生成的方法


- `select_all()`: 查询所有记录
- `select_by_map(condition: rbs::Value) -> Vec`: 根据映射条件查询


> 综合示例
```rust

//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
crud!(BizActivity{});//crud = insert+select_by_map+update_by_map+delete_by_map

#[tokio::main]
async fn main() {
  
	//初始化数据库
	let rb = init_db().await;
	
    let all = BizActivity::select_all(&rb).await;
	println!("select_all = {}", json!(all));
	
    let data = BizActivity::select_by_map(&rb, value!{"id":"1"}).await;
    println!("select_by_map = {}", json!(data));
    
}

```


##### 插入

crud!为指定的结构体自动生成两个插入方法：
- `insert`: 插入单条记录
- `insert_batch`: 批量插入记录，支持分批处理

参数说明:

- `executor`: 数据库执行器（`&RBatis` 或事务对象）
- `table`/`tables`: 要插入的数据,&[StructName]类型
- `batch_size`: 批量插入时每批的大小

注意事项：

- 宏会自动处理 `None` 值字段，只插入非空字段
- 如果不指定表名，会使用结构体名的蛇形命名作为表名
- 批量插入会根据 `batch_size` 参数自动分批执行，避免单次插入过多数据


综合示例：
```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
#[macro_use]
extern crate rbatis;


use rbatis::rbdc::datetime::DateTime;
use serde_json::json;

/// 表
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
	let rb = init_db().await;
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




##### 更新

用于生成更新操作的方法。

> 语法规则

```rust
// 基本语法
impl_update!(StructName {});

// 自定义更新方法
impl_update!(StructName {
    method_name(param: Type) => "WHERE条件"
});
```


>综合示例
```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
	let rb = init_db().await;
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

    let data = BizActivity::update_by_map(&rb, &table, value!{"id":&table.id}).await;
    println!("update_by_map = {}", json!(data));

    let data = BizActivity::update_by_name(&rb, &table, "2").await;
    println!("update_by_name = {}", json!(data));

}
```


##### 删除

>  crud!默认生成的方法
- `delete_by_map(condition: rbs::Value)`: 根据映射条件删除

>  参数

- 删除的条件 rbs:Value

>  返回值

- 返回 `Result<ExecResult, Error>`，其中 `ExecResult` 包含受影响的行数等信息。

>综合示例

```rust

//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
crud!(BizActivity{});//crud = insert+select_by_map+update_by_map+delete_by_map

#[tokio::main]
async fn main() {
   
	let rb = init_db().await;
   
    let data = BizActivity::delete_by_map(&rb, value!{"id": "2"}).await;
    println!("delete_by_map = {}", json!(data));

}

```




#### rbs::Value 条件值


##### rbs::Value作用
>统一的参数处理（作为select_by_map、update_by_map、delete_by_map的入参）

在 py_sql 模板中，rbs::Value 被用来统一处理不同类型的条件值 ：

- 简单值：生成 key = value 条件
- 数组值：自动转换为 IN 查询
- Null 值：自动跳过，不生成条件

> 编译时代码生成需求
impl_select 使用 py_sql 宏在编译时生成 SQL 构建代码。rbs::Value 提供了：

- 类型擦除：运行时统一处理不同类型
- 操作符支持：通过 ValueOperatorSql trait 提取 SQL 操作符 
- 表达式计算：支持在 SQL 模板中进行表达式运算




##### value! 
value! 是 rbatis 框架中用于创建 rbs::Value 类型的宏，
在 select_by_map 等 CRUD 操作中用于构建查询条件。



##### 基础导入
use rbs::{value, Value};
##### 基础数据类型
> 数字类型

```rust
// 整数  
let v = value!(1);        // Value::I32(1)  
let v = value!(1i64);     // Value::I64(1)  
let v = value!(1u32);     // Value::U32(1)  
let v = value!(1u64);     // Value::U64(1)  
  
// 浮点数  
let v = value!(1f32);     // Value::F32(1.0)  
let v = value!(1f64);     // Value::F64(1.0)

```


> 字符串和布尔值

```rust
// 字符串  
let v = value!("hello");  // Value::String("hello".to_string())  
  
// 布尔值  
let v = value!(true);     // Value::Bool(true)  
  
// 空值  
let v = value!(());       // Value::Null

```
##### 复杂数据结构
> 数组
```rust
let v = value!([1, 2, 3]);  // Value::Array
```

>对象（Map）
```rust
let v = value! {  
    "key1": "value1",  
    "key2": 123,  
    "key3": true  
};  
// Value::Map
```


> 动态构建 Map
```rust
let mut conditions = value!{};  
conditions.insert(value!("id"), value!("1"));  
conditions.insert(value!("status"), value!(1));
```
>嵌套结构

```rust
let v = value! {  
    "user": {  
        "id": 1,  
        "name": "test"  
    },  
    "tags": ["tag1", "tag2"]  
};
```

#### impl宏

> 前面演示的crud! 宏只能做一些比较常见的操作，如果我们需要更加自由的sql，就需要用到impl宏。  
> 这里我们先演示：`impl_insert!`，`impl_update!`，`impl_delete!`   
> impl_select! 到下一节讲解   


##### 使用前注意
- 参数的传递

大部分情况下，impl_xxx 的模板内都可以使用 #{参数名} 的形式来传递。

- pysql模板内 "\` \`" 的使用

根据观察，凡是用到了pysql代码，比如if判断的，不应该包含在`` 内


##### impl_insert


`impl_insert!` 是 RBatis 框架中用于自动生成插入操作方法的宏。

为指定的结构体自动生成两个插入方法：
- `insert`: 插入单条记录
- `insert_batch`: 批量插入记录，支持分批处理


> 基本语法

```rust
impl_insert!(StructName {});
```

> 指定表名语法

```rust
impl_insert!(StructName {}, "table_name");
```

> 生成的方法签名

宏会为结构体生成以下两个方法： 

1. 单条插入方法：
```rust
pub async fn insert(
    executor: &dyn Executor,
    table: &StructName,
) -> Result<ExecResult, Error>
```



2. 批量插入方法： 

```rust
pub async fn insert_batch(
    executor: &dyn Executor,
    tables: &[StructName],
    batch_size: u64,
) -> Result<ExecResult, Error>

```

参数说明:

- `executor`: 数据库执行器（`&RBatis` 或事务对象）
- `table`/`tables`: 要插入的数据
- `batch_size`: 批量插入时每批的大小

返回值:

两个方法都返回 `Result<ExecResult, Error>`，其中： 
- `ExecResult` 包含 `rows_affected`（影响行数）和 `last_insert_id`（最后插入的ID）
- `Error` 为 RBatis 错误类型

> 使用示例

单条插入示例 
```rust
   let table = Activity {
        id: Some("1".into()),
        name: Some("1".into()),
        pc_link: Some("1".into()),
        h5_link: Some("1".into()),
        pc_banner_img: None,
        h5_banner_img: None,
        sort: Some("1".to_string()),
        status: Some(1),
        remark: Some("1".into()),
        create_time: Some(DateTime::now()),
        version: Some(1),
        delete_flag: Some(1),
    };

    let data = Activity::insert(&rb, &table).await;
    println!("insert = {}", json!(data));
```
批量插入示例
```rust
    let tables = vec![
        Activity {
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
            version: Some(2),
            delete_flag: Some(2),
        },
        Activity {
            id: Some("3".into()),
            name: Some("3".into()),
            pc_link: Some("3".into()),
            h5_link: Some("3".into()),
            pc_banner_img: None,
            h5_banner_img: None,
            sort: Some("3".to_string()),
            status: Some(3),
            remark: Some("3".into()),
            create_time: Some(DateTime::now()),
            version: Some(3),
            delete_flag: Some(3),
        },
    ];
    let data = Activity::insert_batch(&rb, &tables, 10).await;
    println!("insert_batch = {}", json!(data));
```

> 注意事项：

- 宏会自动处理 `None` 值字段，只插入非空字段
- 如果不指定表名，会使用结构体名的蛇形命名作为表名
- 批量插入会根据 `batch_size` 参数自动分批执行，避免单次插入过多数据




##### impl_update!

用于生成更新操作的方法。

> 语法规则

```rust
// 基本语法
impl_update!(StructName {});

// 自定义条件更新方法
impl_update!(StructName {
    method_name(param: Type) => "WHERE条件"
});
```


>综合示例
```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
    let rb = init_db().await;
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

    let data = BizActivity::update_by_map(&rb, &table, value!{"id":&table.id}).await;
    println!("update_by_map = {}", json!(data));

    let data = BizActivity::update_by_name(&rb, &table, "2").await;
    println!("update_by_name = {}", json!(data));

}
```

##### impl_delete!


`impl_delete!` 宏用于为 Rust 结构体自动生成数据库删除方法，支持动态 SQL 生成和类型安全的删除操作。 


> 基本语法格式

```rust
impl_delete!(结构体类型{方法名(参数列表) => "WHERE条件SQL"}[, "表名"]);
```

>  参数说明

- **结构体类型**: 要为其生成方法的数据结构
- **方法名**: 生成的删除方法名称
- **参数列表**: 方法参数，格式为 `参数名:参数类型`
- **WHERE条件SQL**: PySql 格式的动态 WHERE 条件模板
- **表名**: 可选，指定数据库表名

>  默认生成的方法

当使用 `impl_delete!(Table{})` 时，会自动生成以下方法：

- `delete_by_map(condition: rbs::Value)`: 根据映射条件删除

>  输入参数

生成的方法接受以下参数：
- `executor: &dyn Executor`: 数据库执行器
- 自定义参数列表

>  返回值

返回 `Result<ExecResult, Error>`，其中 `ExecResult` 包含受影响的行数等信息。


>  基本删除方法
```rust
impl_delete!(MockTable {delete_by_name(name:&str) => "`where name= '2'`"});

// 使用示例
let r = MockTable::delete_by_name(&mut rb, "2").await.unwrap();
// 生成的 SQL: "delete from mock_table where name= '2'"
```

> 复杂条件删除

```rust
// 使用映射条件删除
let r = MockTable::delete_by_map(
    &mut rb,
    value!{
        "id":"1",
        "name":"1",
    },
).await.unwrap();
// 生成的 SQL: "delete from mock_table where id = ? and name = ?"
```

> 批量删除示例 （in 删除）

```rust
let ids:Vec<i64> = vec![1,2,3,4,5];
let r = MockTable::delete_by_map(
    &mut rb,
    value!{
        "id":&ids
    },
).await.unwrap();
// 生成的 SQL: "delete from mock_table where id in (1,2,3,4,5) "
```


> 注意事项

1. **WHERE 条件**: 删除操作必须包含 WHERE 条件，避免误删全表数据
2. **参数化查询**: 使用 `#{参数名}` 进行安全的参数绑定
3. **返回值**: 返回 `ExecResult` 包含受影响的行数信息

>综合示例

```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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
crud!(BizActivity{});//crud = insert+select_by_map+update_by_map+delete_by_map

impl_delete!(BizActivity {delete_by_name(name:&str) => "`where name= '2'`"});

#[tokio::main]
async fn main() {
	let rb = init_db().await;
    let data = BizActivity::delete_by_map(&rb, value!{"id": "2"}).await;
    println!("delete_by_map = {}", json!(data));

    let data = BizActivity::delete_by_name(&rb, "2").await;
    println!("delete_by_name = {}", json!(data));
}

```

#### 自定义查询

##### impl_select简介

```rust
impl_select!(结构体类型{方法名(参数列表) -> 返回类型 => "SQL模板"}[, "表名"]);
```

> 参数说明

- **结构体类型**: 要为其生成方法的数据结构
- **方法名**: 生成的方法名称
- **参数列表**: 方法参数，格式为 `参数名:参数类型`
- **返回类型**: 可选，默认为 `Vec<结构体>`，支持 `Vec`、`Option` 等
- **SQL模板**: PySql 格式的动态 SQL 模板
- **表名**: 可选，指定数据库表名

> 默认生成的方法

当使用 `impl_select!(Table{})` 时，会自动生成以下方法：

- `select_all()`: 查询所有记录
- `select_by_map(condition: rbs::Value) -> Vec`: 根据映射条件查询


> 返回值类型的定义
对于impl_select相关的方法，默认返回的是Vec<结构体> 类型，如果想自定义返回值类型，可以参照以下示例：

```rust
/// 通过 `-> 返回值` 来指定类型
/// 注意，返回值的类型不能再有泛型，比如只能是Vec, 不能是Vec<T>。只能是Option，不能是Option<T>
impl_select!(结构体{方法名(参数列表) -> 返回类型 => "SQL模板"});
```


##### 基于默认的select_by_map的条件查询

select_by_map是crud!和 impl_select! 默认生成的方法，用法比较简单和方便，首选使用。

###### 基本用法

```rust
#[derive(serde::Serialize, serde::Deserialize)]
pub struct MockTable {
    pub id: Option<String>,
    pub name: Option<String>,
}

// 生成默认查询方法
impl_select!(MockTable{});




#[tokio::main]
async fn main() {
  
	//初始化数据库
	let rb = init_db().await;
	
	//根据id 全等查询
    let data = MockTable::select_by_map(&rb, value!{"id":"1"}).await;
    println!("select_by_map = {}", json!(data));
    

}

```  


###### 带符号查询

rbatis支持这些符号

- `= (默认)`
- `like`
- `>`
- `>=`
- `<`
- `<=`
- `!=`


```rust

//id大于多少
MockTable::select_by_map(
		&rb,
        value! {
            "id > ": 5 
        }
    )
    .await?


//between查询
MockTable::select_by_map(&rb, value!{  
    "id >= ": "1",  
    "id <= ": "5"  
}).await;  


``` 

###### LIKE 查询实现


```rust
	
	//`select * from user where email like %example.com% `
	let users = User::select_by_map(rb, value!{"email like ": "%example.com%"}).await;
	println!("查询结果: {:?}", users);

```

###### IN 查询实现


```rust

let v: Vec<String> = vec!["1","2"];
Dict::select_by_map(
		&rb,
        value! {
             "id":&v,
             "access_type":"OTHER",
             "dict_type":"STOP_WORDS",
        }
    )
    .await?
	
//生成的sql类似： select * from dict where id in ('1','2') and access_type = "OTHER" and dict_type = "STOP_WORDS"
``` 


###### 动态条件查询

```

// 动态构建查询条件  
let mut conditions = value!{};  
  
// 如果 name 不为 None，添加 name 条件  
let name = Some(String::from("张三"));
if let Some(name) = name {  
    conditions.insert(value!("name"), value!(name));  
}  
  
// 如果 email 不为 None，添加 email 条件    
if let Some(email) = email {  
    conditions.insert(value!("email"), value!(email));  
}  
  
// 执行查询  
let results = User::select_by_map(&rb, conditions).await?;



```


##### 基于自定义impl_select的条件查询
`impl_select!` 宏用于为 Rust 结构体自动生成数据库查询方法，支持动态 SQL 生成和类型安全的查询操作。






###### 基本用法

```rust
#[derive(serde::Serialize, serde::Deserialize)]
pub struct MockTable {
    pub id: Option<String>,
    pub name: Option<String>,
}



// 根据id和name 全等查询，使用#{参数} 来传递参数
impl_select!(MockTable{select_all_by_id(id:&str,name:&str) => "`where id = #{id} and name = #{name}`"});

// 根据id 查询一条数据
impl_select!(MockTable{select_by_id(id:&str) -> Option => "`where id = #{id} limit 1`"});



#[tokio::main]
async fn main() {
  
	//初始化数据库
	let rb = init_db().await;
	
  
    
    let data = MockTable::select_all_by_id(&rb, "1", "1").await;
    println!("select_all_by_id = {}", json!(data));

    let data = MockTable::select_by_id(&rb, "1").await;
    println!("select_by_id = {}", json!(data));
}

```  

###### 指定返回类型

```rust
// 返回 Option<T>
impl_select!(MockTable{select_by_id(id:&str) -> Option => "`where id = #{id} limit 1`"});

// 返回 Vec<T>（默认）
impl_select!(MockTable{select_by_id2(id:String) -> Vec => "`where id = #{id} limit 1`"});
``` 

###### 指定表名

```rust
// 使用自定义表名
impl_select!(MockTable{}, "custom_table_name");
``` 



###### LIKE 查询实现


> 基本使用
```rust
impl_select!(MockTable{
    select_by_name_like(name: &str) -> Vec => 
    "`where name like #{name}`"
});
```

在实际使用中，您需要在传入参数时添加通配符：

```rust
// 使用示例
let results = MockTable::select_by_name_like(&rb, "%test%").await?;
```

> 还可以带条件

使用 PySql 语法实现条件性 LIKE 查询：

```rust
impl_select!(MockTable{
    select_by_name_like_dynamic(name: &str) -> Vec => 
    "if name != '':
        ` where name like #{name}`"
});
``` 

在实际使用中，您需要在传入参数时添加通配符：

```rust
// 使用示例
let results = MockTable::select_by_name_like(&rb, "%test%").await?;
```





##### 分页查询 impl_select_page!


`impl_select_page!` 是 RBatis 框架中用于生成分页查询方法的宏，
它可以自动生成带有分页功能的查询方法。

请注意，默认的crud!不会包含impl_select_page.

###### 基本语法

>  无条件分页查询语法

最简单的无条件分页查询语法如下：
```rust
impl_select_page!(结构体类型{方法名() => ""});
```

>  带条件分页语法规则

```rust
impl_select_page!(结构体类型{方法名(参数列表) => "WHERE条件SQL"});  
impl_select_page!(结构体类型{方法名(参数列表) => "WHERE条件SQL"}, "表名");
```


>  参数说明

- **结构体类型**: 要为其生成方法的数据结构
- **方法名**: 生成的分页查询方法名称
- **参数列表**: 方法参数，格式为 `参数名:参数类型`
- **WHERE条件SQL**: PySql 格式的动态 WHERE 条件模板
- **表名**: 可选，指定数据库表名



> 输入参数

生成的方法接受以下参数：
- `executor: &dyn Executor`: 数据库执行器
- `page_request: &dyn IPageRequest`: 分页请求对象
- 自定义参数列表
    - 参数引用语法:
        - #{参数名}: 用于参数化查询，防止 SQL 注入
        - ${参数名}: 直接字符串替换（谨慎使用）
        - 条件判断: 直接使用参数名进行条件判断


>  返回值

返回 `Result<Page<T>, Error>`，其中 `Page<T>` 包含：
- `page_no`: 当前页码
- `page_size`: 每页大小
- `total`: 总记录数
- `records`: 当前页数据列表


> 特殊参数说明

在 WHERE 条件 SQL 中，可以通过${}使用以下特殊参数：

- `do_count`: bool 布尔值，用于区分是统计查询还是数据查询
- `page_no`: 页码偏移量 (page_no - 1) * page_size
- `page_size`: 每页大小
- `sql`: 当前生成的 SQL 字符串，可用于条件判断

>使用特殊参数

在 WHERE 条件 SQL 中，可以使用以下特殊参数：

> 1. `do_count` 参数

用于区分是统计查询还是数据查询：

```rust
impl_select_page!(Activity{select_page() =>"
     if do_count == false:
       `order by create_time desc`"});
```

> 2. `page_no` 和 `page_size` 参数

- `page_no`: 页码偏移量，计算为 `(page_no - 1) * page_size`
- `page_size`: 每页大小

```rust
impl_select_page!(Activity{select_page_custom() =>"
     `where status = 1`
     if do_count == false:
       ` limit ${page_no}, ${page_size}`"});
```

> 3. `sql` 参数

当前生成的 SQL 字符串，可用于条件判断：

```rust
impl_select_page!(Activity{select_page() =>"
     if !sql.contains('count(1)'):
       `order by create_time desc`"});
```






###### 分页查询的双重执行机制

该宏内部使用 `pysql_select_page!` 宏来处理分页逻辑 。
分页查询会自动处理以下变量：
- `${page_no}` = (page_no - 1) * page_size
- `${page_size}` = page_size
- `do_count` 参数用于区分是查询总数还是查询数据


宏会生成两次 SQL 执行：

1. **计数查询**：执行时 `do_count=true`，SQL 会被 `PageIntercept` 拦截器修改为 `select count(1) as count from table_name`
2. **数据查询**：执行时 `do_count=false`，SQL 保持原样并添加 LIMIT 分页条件

实际生成的 SQL：
- **数据查询**：`select * from mock_table order by create_time desc limit 0,10`
- **计数查询**：`select count(1) as count from mock_table order by create_time desc`



###### 基本用法

```rust
//无条件
impl_select_page!(Activity{select_page() => ""});
let page_data = Activity::select_page(&rb, &PageRequest::new(1, 10)).await?;


//无条件带排序
impl_select_page!(MockTable{select_page() => "`order by create_time desc`"});

//或：更好的性能，在计数查询中不带排序
impl_select_page!(MockTable{select_page() => "  
     if !sql.contains('count(1)'):  
       `order by create_time desc`"});
       
let r = MockTable::select_page(&mut rb, &PageRequest::new(1, 10))
                .await
                .unwrap();

```



###### 带条件查询
```rust
impl_select_page!(MockTable{select_page_by_name(name:&str) =>"
     if name != null && name != '':
       `where name = #{name}`
"});

let r = MockTable::select_page_by_name(&mut rb, &PageRequest::new(1, 10), "张三")
            .await
            .unwrap();

//生成的sql： "select * from mock_table where name = '张三' limit 0,10 "

```

###### like查询
```rust 

//方式1：在 SQL 中直接使用 LIKE
impl_select_page!(Activity{select_page_by_name(name: &str) => "where name like #{name}"});  
  
// 调用时传入包含通配符的字符串  
let page_data = Activity::select_page_by_name(&rb, &PageRequest::new(1, 10), "%test%").await?;


//方式2：在 SQL 中拼接通配符
impl_select_page!(Activity{select_page_by_name(name: &str) => "where name like concat('%', #{name}, '%')"});  
  
// 调用时只传入关键词  
let page_data = Activity::select_page_by_name(&rb, &PageRequest::new(1, 10), "test").await?;


```

###### in查询


```rust

impl_select_page!(Activity{select_page_by_ids(ids: &[i32]) => "  
    if !ids.is_empty():  
        `where id in (`  
        trim ',': for _,id in ids:  
            #{id},  
        `)`  
    "});  
	
	

let ids = vec![1, 2];  

//会生成两条sql
// `select count(1) as count from activity where id in (?, ?, ?, ? )` [1,2]
// `select * from activity where id in (?, ?, ?, ? ) limit 0,10 ` [1,2]
let page = Activity::select_page_by_ids(rb, &PageRequest::new(1, 10), &ids).await.unwrap();

println!("查询结果: {:#?}", page);

```


其他方式，参考后面的 [htmlsql章节](https://rbatis.github.io/rbatis.io/#/zh-cn/v4/?id=htmlsql) 或 [pysql章节](https://rbatis.github.io/rbatis.io/#/zh-cn/v4/?id=pysql)


###### 综合示例
```rust
//#[macro_use] 在'root crate'或'mod.rs'或'main.rs'中定义
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

/// postgres/mssql数据库不支持`limit 0,10`，你应该使用limit_sql:&str并设置`limit 10 offset 0`
impl_select_page!(BizActivity{select_page_by_limit(name:&str,limit_sql:&str) => "`where name != #{name}`"});

#[tokio::main]
async fn main() {
    let rb = init_db().await;
	
	
    let data = BizActivity::select_page(&rb, &PageRequest::new(1, 10)).await;
    println!("select_page = {}", json!(data));

    let data = BizActivity::select_page_by_name(&rb, &PageRequest::new(1, 10), "").await;
    println!("select_page_by_name = {}", json!(data));

    let data = BizActivity::select_page_by_limit(&rb, &PageRequest::new(1, 10), "2", " limit 0,10 ").await;
    println!("select_page_by_limit = {}", json!(data));
}
```







##### 自定义表名

> rbatis允许自定义表名
> 就像sql ```select * from ${table_name} ```
> 需要注意的是，crud宏和impl_*()宏不同


```rust
//方法1：通过 crud! 宏参数指定
rbatis::crud!(BizActivity {},"biz_activity"); // 自定义表名为 biz_activity

//方法2：通过 impl_* 宏的最后一个参数指定
rbatis::impl_select!(BizActivity{select_by_id(id:String) -> Option => "`where id = #{id} limit 1`"},"biz_activity");

//方法3：通过函数参数动态指定,参数固定是 table_name:&str
rbatis::impl_select!(BizActivity{select_by_id2(table_name:&str,id:String) -> Option => "`where id = #{id} limit 1`"});

//"select * from mock_table2 where id = ?"
let r = MockTable::select_from_table_name_by_id(&mut rb, "1", "mock_table2")
            .await
            .unwrap();
```

##### 自定义表列

> rbatis允许自定义表列，它支持任何```rbatis::impl_*!()```宏   
> 就像sql ```select ${table_column} from ${table_name} ```

> 语法：
```rust
// 固定的两个参数名是table_name和table_column，其他参数时sql的自定义参数。参数顺序不限制
//table_name是表名,默认值为 "*"
//table_column是列，多个列用,隔开
impl_select!(
    StructName｛ 
        method_name(table_name:&str,table_column:&str, param1:Type1, param2:Type2,...) 
            -> returnType => " SQL条件语句" 
    ｝
)

```

> 示例1：
```rust
rbatis::impl_select!(BizActivity{select_by_id(table_name:&str,table_column:&str,id:String) -> Option => "`where id = #{id} limit 1`"});
```
> 示例2：
```rust
impl_select!(MockTable{select_table_column_from_table_name_by_id(id:&str,table_column:&str) => "`where id = #{id}`"});

//"select id,name from mock_table where id = ?"
let r = MockTable::select_table_column_from_table_name_by_id(&mut rb, "1", "id,name")
.await
.unwrap();


```

> called `Result::unwrap()` on an `Err` value: E("missing field `xxxx`") 问题：           
> RBatis 的反序列化机制基于 serde，当从数据库查询结果转换为 Rust 结构体时，serde 期望所有非 Option 字段都存在于数据中。      
> 对于某些字段是 Option<T> 类型（尤其是自定义反序列化的字段），如果没有使用 #[serde(default)] 注解，serde 仍然会要求该字段在输入数据中存在。         
> 所以，对于非Option字段，必须查询该字段，对于Option字段，某些情况需要使用 #[serde(default)] 注解来指定默认值。        














#### 数据类型的转换
| Data Type                                                               | Support |
|-------------------------------------------------------------------------|---------|
| `Option`                                                                | ✓       |
| `Vec`                                                                   | ✓       |
| `HashMap`                                                               | ✓       |
| `i32, i64, f32, f64, bool, String`, 以及其他 Rust 基类型           | ✓       |
| `rbatis::rbdc::types::{Bytes, Date, DateTime, Time, Timestamp, Decimal, Json}` | ✓ |
| `rbatis::plugin::page::{Page, PageRequest}`                             | ✓       |
| `rbs::Value`                                                            | ✓       |
| `serde_json::Value` 和其他 serde 类型                               | ✓       |
| 来自 rbdc-mysql、rbdc-pg、rbdc-sqlite、rbdc-mssql 的驱动程序特定类型 | ✓       |


注：如果你遇到了一些类型不知道怎么转换，或者转换失败，你可以尝试先转换为serde_json::Value。

以下是作者的示例：将mysql 的 tinyint类型转换为rust的bool类型
```rust
use serde::{Deserialize, Deserializer, de};

#[derive(Debug, Deserialize)]
struct MyStruct {
    #[serde(deserialize_with = "bool_or_int")]
    my_field: bool,
}

fn bool_or_int<'de, D>(deserializer: D) -> Result<bool, D::Error>
where
    D: Deserializer<'de>,
{
    struct BoolOrIntVisitor;

    impl<'de> de::Visitor<'de> for BoolOrIntVisitor {
        type Value = bool;

        fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
            formatter.write_str("a boolean or an integer")
        }

        fn visit_bool<E>(self, value: bool) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(value)
        }

        fn visit_i32<E>(self, value: i32) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            // Map 0 to false, any other value to true
            Ok(value != 0)
        }
    }

    deserializer.deserialize_any(BoolOrIntVisitor)
}
```

参考：
-   https://github.com/rbatis/rbatis/pull/472
-   https://github.com/rbatis/rbatis/issues/324


#### 关于序列化给前端需要指定格式
建议单独使用一个DTO 或者VO，然后在这个VO上加上相关注解，比如`小驼峰：#[serde(rename_all = "camelCase")]`。

而不要在实体类上加这个属性。 因为rbatis序列化到数据库也会使用serde的宏。


#### debug_mode

如果你在Cargo.toml中开启"debug_mode"特性，你将看到以下特性

* 显示项目构建生成的代码(`rbatis_codgen`生成的代码)。你可以看到构建日志(`............gen macro py_sql :............`)
* 显示数据库`rows`数据。你可以看到日志(```query <= len=1,rows=[{"id":1}]```)
* 显示解码无效类型时哪个字段解析失败。你可以看到错误(```"invalid type: integer `1`, expected a string, key=`status`"```)

请注意，debug_mode应该将日志级别设置为'debug'

> 如何在Cargo.toml中开启debug_mode特性？
```toml
rbatis = { version = "4",features = ["debug_mode"]}
```

> 需要fast_log设置级别为Debug
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


#### `rbs`

`rbs`是`rbatis`为ORM中间语言`html_sql`、`py_sql`编写的专门序列化框架，
用于方便地在HTML语句中使用和替换类似JSON的对象，而不是操作原生结构。
你可以将`rbs`理解为类似于JSON `Value`的中间结构。

* 这里我们展示`rbs::Value`的定义
```rust
#[derive(Clone, Debug, PartialEq)]
pub enum Value {
    /// null
    Null,
    /// true or false
    Bool(bool),
    /// Int32
    I32(i32),
    /// Int64
    I64(i64),
    /// Uint32
    U32(u32),
    /// Uint64
    U64(u64),
    /// A 32-bit float number.
    F32(f32),
    /// A 64-bit float number.
    F64(f64),
    /// String
    String(String),
    /// Binary/Bytes.
    Binary(Vec<u8>),
    /// Array/Vec.
    Array(Vec<Self>),
    /// Map<Key,Value>.
    Map(ValueMap),
    /// Extended implements Extension interface
    Ext(&'static str, Box<Self>),
}
```

* rbs构建一个映射值
```rust
fn main(){
    let v = rbs::to_value!{
        "key":"value",
        "key2":"value2"
    };
}
```

* rbs编码为值
```rust
fn main(){
    let v = rbs::to_value!(1);
    let arg = vec![1,2,3];
    let v = rbs::to_value!(&arg);
    let arg = "1".to_string();
    let v = rbs::to_value!(&arg);
}
```

* rbs从值解码
```rust
fn main(){
    let v:i32 = rbs::from_value(Value::I32(1)).unwrap();
}
```

* 显示值
```rust
fn main(){
    let value = Value::I32(1);
    assert_eq!(value.to_string(),"1");
    assert_eq!(format!("{}",value),"1");
}
```


#### 事务

> 事务的本质是使用SQL语句BEGIN、COMMIT和ROLLBACK。
> RBatis提供这三个函数，但也支持```defer_async()```来防止忘记提交

示例[点这里](https://github.com/rbatis/rbatis/blob/master/example/src/transaction.rs)

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
    let tx = rb.acquire_begin().await.unwrap();
    // defer_async 如果tx丢弃将回滚
    // let mut tx = tx.defer_async(|mut tx| async move {
    //     if !tx.done() {
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


#### 原生Sql



RBatis 提供了多种执行原生 SQL 的方式，主要分为直接调用方法和宏定义两大类。

##### 1. 直接方法调用

###### 1.1 RBatis 实例方法

**查询方法：**

- `query()` - 返回原始 rbs::Value 类型
- `query_decode<T>()` - 查询并自动解码为指定类型(由编译器推断返回值类型)

**执行方法：**

- `exec()` - 执行 INSERT、UPDATE、DELETE 等操作

**使用示例：**

```rust
// 查询并解码为结构体
let users: Vec<User> = rb.query_decode(
    "SELECT * FROM users WHERE status = ?", 
    vec![to_value!(1)]
).await?;

// 执行更新操作
let result = rb.exec(
    "UPDATE users SET status = ? WHERE id = ?",
    vec![to_value!(0), to_value!(1)]
).await?;

// 查询原始 Value
let raw_data = rb.query(
    "SELECT COUNT(*) FROM users",
    vec![]
).await?;
```

###### 1.2 事务执行器方法

`RBatisTxExecutor` 提供相同的方法，但在事务上下文中执行：

```rust
// 事务中执行多个 SQL
let tx = rb.acquire_begin().await?;
let result1 = tx.exec("INSERT INTO users (name) VALUES (?)", vec![to_value!("user1")]).await?;
let result2 = tx.exec("UPDATE users SET status = ? WHERE id = ?", vec![to_value!(1), to_value!(1)]).await?;
tx.commit().await?;
```

##### 2. 宏定义方式

###### 2.1 `#[sql]` 宏 - 静态 SQL

适用于固定的 SQL 语句：

```rust
#[sql("SELECT * FROM users WHERE id = ?")]
async fn get_user_by_id(rb: &dyn Executor, id: i64) -> Result<Option<User>, Error> {
    impled!()
}

#[sql("SELECT COUNT(*) FROM users")]
async fn count_users(rb: &dyn Executor) -> Result<i64, Error> {
    impled!()
}
```

###### 2.2 `#[py_sql]` 宏 - 动态 SQL

支持 Python 风格的条件判断：

```rust
#[py_sql(
"`SELECT * FROM activity WHERE delete_flag = 0`
  if name != '':
    ` AND name = #{name}`"
)]
async fn py_select(rb: &dyn Executor, name: &str) -> Result<Vec<Activity>, Error> {
    impled!()
}
```

###### 2.3 `#[html_sql]` 宏 - XML 风格动态 SQL

支持类似 MyBatis 的 XML 风格：

```rust
#[html_sql(
r#"
<select id="select_by_condition">
    SELECT * FROM users
    <where>
        <if test="name != null">
            AND name LIKE #{name}
        </if>
        <if test="age != null">
            AND age > #{age}
        </if>
    </where>
</select>
"#
)]
async fn select_by_condition(
    rb: &dyn Executor,
    name: Option<&str>,
    age: Option<i32>
) -> Result<Vec<User>, Error> {
    impled!()
}
```

##### 3. 宏的返回类型自动推断

RBatis 宏通过分析函数返回类型自动决定执行方法：

- **查询操作**：返回类型不包含 `ExecResult` 时，调用 `query` 方法
- **执行操作**：返回类型包含 `ExecResult` 时，调用 `exec` 方法

##### 4. 参数绑定

###### 4.1 安全参数绑定

使用 `#{}` 进行参数绑定，防止 SQL 注入：

```rust
// 安全的参数绑定
"SELECT * FROM users WHERE id = #{id} AND name = #{name}"
```

###### 4.2 字符串插值

使用 `${}` 进行字符串插值（谨慎使用）：

```rust
// 动态表名或列名
"SELECT ${columns} FROM ${table_name} WHERE id = #{id}"
```

##### 5. 无参数 SQL 执行

当 SQL 不需要参数时，传递空向量：

```rust
// 无参数执行
let result = tx.exec("TRUNCATE TABLE logs", vec![]).await?;
let result = rb.query("SELECT NOW()", vec![]).await?;
```




##### 使用场景对比

| 方法 | 适用场景 | 优势 | 限制 |
|------|----------|------|------|
| `query_decode<T>` | 简单查询，需要类型转换 | 类型安全，自动解码 | 静态 SQL |
| `query` | 需要手动处理结果 | 灵活性高 | 需要手动解析 |
| `exec` | 执行操作（增删改） | 简单直接 | 单条 SQL |
| `#[sql]` | 固定 SQL 语句 | 编译时检查 | 不支持动态条件 |
| `#[py_sql]` | 动态 SQL，条件判断 | Python 风格，易读 | 学习成本 |
| `#[html_sql]` | 复杂动态 SQL | XML 标签，功能丰富 | 语法复杂 |

##### Notes

1. **单 SQL 限制**：每个 `exec` 调用只能执行一条 SQL 语句，多条 SQL 需要多次调用
2. **参数安全**：始终使用 `vec![to_value!(param)]` 进行参数绑定，确保 SQL 注入安全
3. **事务一致性**：相关操作应在事务中执行以保证数据一致性
4. **类型推断**：宏会根据函数返回类型自动选择 `query` 或 `exec` 方法
5. **占位符**：`impled!()` 是编译时占位符，会被实际生成的代码替换



> RBatis也支持编写数据库的原始语句   
> RBatis提供的驱动都支持占位符'?'，所以你可以在Postgres/mssql等上写'?'

##### 综合示例
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


#### `HtmlSql`
> RBatis实现了一套兼容MyBtais3 SQL编辑语言，支持常见的if、Foreach、字符串插值等功能

* 当Cargo.toml中的RBatis依赖开启```debug_mode```特性时，会打印生成的函数实现代码
* 语言解析 -> 词法分析 -> 语法分析 -> 抽象语法树生成 -> 翻译为`Rust`代码。具有原生`Rust`的性能
* 当然，PySql也是使用HtmlSql的语法树，PySql将转换为HtmlSql
* 它使用crates [rbs](https://crates.io/crates/rbs) 的```rbs::Value```作为基础对象，并对任何函数进行操作
* 你可以在```rbs::Value```上调用任何方法/trait，如``` #{1 + 1}, #{arg}, #{arg [0]}, #{arg [0] + 'string'}  ```或```  if sql.contans('count'):   ```
* 字符串可以使用``` ` ```保留空格，如``` ` select * from table where ` ```
* 方法将在方法体上创建2个变量。因此你可以在分页操作中确定变量SQL是否包含COUNT语句或SELECT语句

* HtmlSql语法树

| 语法/方法                                                                                 | 生成的`Rust`代码                                                                               |
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ``` <trim prefixOverrides=" and">` and name != '' `</trim> ```                                | `sql.trim(" and")                      `                                                            |
| ``` <if test="key == 'id'">`select * from table`</if> ```                                     | `if  key == "id"{sql.push_str("select * from table");}                      `                       |
| ``` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  ``` | `for (key,item) in arg{}               `                                                            |
| ``` <continue/>  ```                                                                          | `for (key,item) in arg{ continue;}     `                                                            |
| ``` <set>  ```                                                                                | `sql.trim("set ").push_str(" set ");        `                                                       |
| ``` <set collection="arg">  ```                                                               | `sql.trim("set ").push_str(" set name=?,age=? "); //注意 collection={name:"",age:""};           ` |
| ``` <choose>  ```                                                                             | `match {}                              `                                                            |
| ``` <when test="true">  ```                                                                   | `match true{ true=>{} _ => {} }        `                                                            |
| ``` <otherwise>  ```                                                                          | `match { _ =>{} }                      `                                                            |
| ``` <where>  ```                                                                              | `sql.push_str("WHERE").trim("WHERE");       `                                                       |
| ``` <bind name="a" value="1+1"></bind> ```                                                    | `let a = rbs::Value::I32(1 + 1)            `                                                        |
| ``` `select * from table`    ```                                                              | `sql.push_str("select * from table"); `                                                             |
| ``` `#{name}`    ```                                                                          | `sql.push_str("?");args.push(rbs::Value::String(name));`                                            |
| ``` `${name}`     ```                                                                         | `sql.push_str(&format!("{}",name));                    `                                            |
| ``` `${1 + 1}`   ```                                                                          | `sql.push_str(&format!("{}", 1 + 1));    `                                                          |
| ``` `#{1 + 1}`   ```                                                                          | `sql.push_str("?");args.push(rbs::Value::from(1+1));`                                               |
| ``` `${name + '_tag'}`  ```                                                                   | `sql.push_str(&format!("{}",name + "_tag"));    `                                                   |
| ``` `#{name + '_tag'}`  ```                                                                   | `sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    `                   |
| ``` `${age + 1}`  ```                                                                         | `sql.push_str(&format!("{}", age + 1));    `                                                        |
| ``` `#{age + 1}`  ```                                                                         | `sql.push_str("?");args.push(rbs::Value::from(age+1));     `                                        |
| ``` `${true  & true}`  ```                                                                    | `sql.push_str(&format!("{}", true & true));    `                                                    |
| ``` `#{true  & true}`  ```                                                                    | `sql.push_str("?");args.push(rbs::Value::from(true & true));    `                                   |
| ``` `${2 >  1}`  ```                                                                          | `sql.push_str(&format!("{}",2 >  1));    `                                                          |
| ``` `${2 /  1}`  ```                                                                          | `sql.push_str(&format!("{}", 2 / 1));    `                                                          |
| ``` `${2 ==  1}`  ```                                                                         | `sql.push_str(&format!("{}", 2 == 1));    `                                                         |
| ``` `${2 *  1}`  ```                                                                          | `sql.push_str(&format!("{}", 2 * 1));    `                                                          |
| ``` `${ !false }`  ```                                                                        | `sql.push_str(&format!("{}", !false));    `                                                         |
| ``` `${ 2 % 1 }`  ```                                                                         | `sql.push_str(&format!("{}", 2 % 1));    `                                                          |
| ``` `${ 2 - 1 }`  ```                                                                         | `sql.push_str(&format!("{}", 2 - 1));    `                                                          |


* htmlsql的注意事项

除标签外的原始字符串，应当使用\`\`包裹，特别是需要保留空格的情况下。

* 在`Rust`代码中编写
```rust
// Clion智能提示: 点击代码，选择'Inject Language or Reference'，然后选择html
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


* 在`Rust`中在文件中编写
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

> rust代码中引用
```rust
#[html_sql("example/example.html")]
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {
    impled!()
}
```

> rust代码
```rust
htmlsql!(select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> rbatis::Result<Vec<BizActivity>> => "example.html");
```

##### 分页
> 实现html_sql选择分页。

你必须处理3个参数:
(do_count:bool,page_no:u64,page_size:u64)

你必须处理sql:
返回Vec<Record>（如果参数do_count = false）
返回u64（如果参数do_count = true）

就像这个示例:
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


##### 包含

```<include>```允许引用SQL块，甚至来自`xxxx.html`文件的SQL块，需要指定```refid```以进行正确引用

> 步骤1.定义```<sql id="a">` and id != '' `</sql>```

> 步骤2.使用``` <include refid="a"></include> ```或```<include refid="file://../rbatis/example/example.html?refid=a"></include>```

例如:
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

#### `PySql`

* 这是一种类似Python的语法，用于操作SQL语句和插入SQL参数的语言
* 语法树

| 语法/方法                                                 | 生成的`Rust`代码                                                                                   |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `trim 'AND ':      `                                          | `sql.trim_end_matches("AND ").trim_start_matches("AND ")       `                                        |
| `trim start='AND ':      `                                    | `sql.trim_start_matches("AND ")      `                                                                  |
| `trim end='AND ':      `                                      | `sql.trim_end_matches("AND ")      `                                                                    |
| `if arg!=1:         `                                         | `if arg !=1 {}               `                                                                          |
| `if true:`<br/>   ```  `select * from table` ```              | ```if true { sql.push_str("select * from table");}  ```                                                 |
| `for key,item in arg:      `                                  | `for (key,item) in arg{ }     `                                                                         |
| `for key,item in arg:`<br/>  ```  `and name = ${name}`    ``` | `for (key,item) in arg{ sql.push_str(&format!("and name = {}",name)); }     `                           |
| `for key,item in arg:`<br/>  ```  `continue:`            ```  | `for (key,item) in arg{ continue; }      `                                                              |
| `set :                       `                                | `sql.push_str("SET")                `                                                                   |
| `set collection='ids':                       `                | `sql.trim("set ").push_str(" set name=?,age=? "); //注意 collection={name:"",age:""};                  ` |
| `choose :                     `                               | `match {}                                `                                                              |
| `when :              `                                        | `match true{ true=>{} _ => {} }       `                                                                 |
| `otherwise :           `                                      | `match { _ =>{} }                    `                                                                  |
| `_:              `                                            | `match { _ =>{} }(v1.8.54 later)         `                                                              |
| `where :              `                                       | `sql.push_str("WHERE").trim("WHERE")    `                                                               |
| `bind a=1+1:       `                                          | `let a = rbs::Value::I32(1 + 1) `                                                                       |
| `let  a=1+1:     `                                            | `let a = rbs::Value::I32(1 + 1) `  (v1.8.54 later)                                                      |
| ``` `select * from table`    ```                              | `sql.push_str("select * from table"); `                                                                 |
| ``` `#{name}`    ```                                          | `sql.push_str("?");args.push(rbs::Value::String(name));`                                                |
| ``` `${name}`     ```                                         | `sql.push_str(&format!("{}",name));                    `                                                |
| ``` `${1 + 1}`   ```                                          | `sql.push_str(&format!("{}", 1 + 1));    `                                                              |
| ``` `#{1 + 1}`   ```                                          | `sql.push_str("?");args.push(rbs::Value::from(1+1));`                                                   |
| ``` `${name + '_tag'}`  ```                                   | `sql.push_str(&format!("{}",name.to_string() + "_tag"));    `                                           |
| ``` `#{name + '_tag'}`  ```                                   | `sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    `                       |
| ``` `${age + 1}`  ```                                         | `sql.push_str(&format!("{}", age + 1));    `                                                            |
| ``` `#{age + 1}`  ```                                         | `sql.push_str("?");args.push(rbs::Value::from(age+1));     `                                            |
| ``` `${true  & true}`  ```                                    | `sql.push_str(&format!("{}", true & true));    `                                                        |
| ``` `#{true  & true}`  ```                                    | `sql.push_str("?");args.push(rbs::Value::from(true & true));    `                                       |
| ``` `${2 >  1}`  ```                                          | `sql.push_str(&format!("{}",2 >  1));    `                                                              |
| ``` `${2 /  1}`  ```                                          | `sql.push_str(&format!("{}", 2 / 1));    `                                                              |
| ``` `${2 ==  1}`  ```                                         | `sql.push_str(&format!("{}", 2 == 1));    `                                                             |
| ``` `${2 *  1}`  ```                                          | `sql.push_str(&format!("{}", 2 * 1));    `                                                              |
| ``` `${ !false }`  ```                                        | `sql.push_str(&format!("{}", !false));    `                                                             |
| ``` `${ 2 % 1 }`  ```                                         | `sql.push_str(&format!("{}", 2 % 1));    `                                                              |
| ``` `${ 2 - 1 }`  ```                                         | `sql.push_str(&format!("{}", 2 - 1));    `                                                              |



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

#### 插件: table-sync

> 这是一个插件，用于将表结构与代码中的表结构同步，我认为这在移动开发中非常重要。
> 注意它不会改变表结构。

* 如果表不存在，则创建
* 如果表存在但缺少列，则增加缺失部分的列

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
    // ------------选择数据库驱动------------
    //rb.init(rbdc_mysql::driver::MysqlDriver {}, "mysql://root:123456@localhost:3306/test").unwrap();
    // rb.init(rbdc_pg::driver::PgDriver {}, "postgres://postgres:123456@localhost:5432/postgres").unwrap();
    // rb.init(rbdc_mssql::driver::MssqlDriver {}, "mssql://SA:TestPass!123456@localhost:1433/test").unwrap();
    rb.init(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))
        .unwrap();
    // ------------选择数据库列映射器------------
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
            //// 自定义字符串数据库类型
            //name: Some("TEXT".to_string()),
            name: Some("".to_string()),
            //// 自定义字符串数据库类型
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


#### 插件: 拦截器

> 实现接口

```rust
use rbatis::{Error, RBatis};
use rbatis::executor::Executor;
use rbatis::intercept::{Intercept, ResultType};
use rbdc::db::ExecResult;
use rbs::Value;
#[derive(Debug)]
pub struct MyInterceptor{}

impl Intercept for MyInterceptor {
    /// task_id可能是conn_id或tx_id,
    /// is_prepared_sql = !args.is_empty(),
    ///
    /// 如果返回None将返回结果
    /// 如果返回Some(true)将运行下一个拦截器
    /// 如果返回Some(false)将中断
    fn before(
        &self,
        _task_id: i64,
        _rb: &dyn Executor,
        _sql: &mut String,
        _args: &mut Vec<Value>,
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,
    ) -> Result<Option<bool>, Error> {
        Ok(Some(true))
    }

    /// task_id可能是conn_id或tx_id,
    /// is_prepared_sql = !args.is_empty(),
    ///
    /// 如果返回None将返回结果
    /// 如果返回Some(true)将运行下一个拦截器
    /// 如果返回Some(false)将中断
    fn after(
        &self,
        _task_id: i64,
        _rb: &dyn Executor,
        _sql: &mut String,
        _args: &mut Vec<Value>,
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,
    ) -> Result<Option<bool>, Error> {
        Ok(Some(true))
    }
}
//推入RBatis
fn main(){
    let mut rb=RBatis::new();
    rb.intercepts.push(Arc::new(MyInterceptor{}) as Arc<dyn Intercept>);
}
```


#### 插件: 分布式唯一ID (雪花算法(i64))

```rust
    use rbatis::plugin::snowflake::new_snowflake_id;
    #[test]
    fn test_new_async_id() {
         //Snowflake::new()  //Snowflake::new(必须是单例或全局变量)
         //默认使用
         println!("{}", new_snowflake_id().to_string());
    }
```

#### 插件: 分布式唯一ID (MongoDB对象id算法(String/u128))

```rust
    #[test]
    async fn test_new_async_id() {
       println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
    }
```



#### 内置宏

* ``` make_table```  通过依赖Default trait简化表构造
* ``` make_table_field_vec ``` 获取目标Vec成员属性Vec集合
* ``` make_table_field_map ```  获取目标Vec成员属性的HashMap集合

例如:
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


#### 设计驱动

* 这个文档用于设计一个新的数据库驱动加入rbatis

* 示例点这里[rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)

* 步骤0: 创建你的cargo项目，并在Cargo.toml中添加'rbdc = "4.5"'
```
cargo new mock_driver --lib
```

* 步骤1: 添加依赖，或添加你的数据库驱动crates依赖。
```toml
rbdc = "4.5"
rbs  = "4.5"
fastdate = { version = "0.1" }
# xx_driver = {version = "xxx"}
```

* 步骤2: 定义你的驱动结构
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

* 步骤3: 实现trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};

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
        //return rbdc::impl_exchange("@P", 1, sql); //TODO 如果数据库不支持sql占位符'?'，将'@1'替换为'?'
        return sql.to_string();//如果数据库支持sql占位符'?'
    }
}
```

* 步骤4: 在rbatis中加载你的驱动

```rust
#[tokio::main]
async fn main(){
    let mut rb = RBatis::new();
    rb.init(MockDriver {}, "xxx://xxx.db").unwrap();
    rb.acquire().await.expect("connect database fail");
    println!("connect database successful");
}
```
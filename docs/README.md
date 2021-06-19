* [English](en/)
* [博客](blog.md)

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

> 安装依赖(建议初学者使用[Clion](https://www.jetbrains.com/clion/) 并且下载安装[rust插件](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=clion%E5%AE%89%E8%A3%85rust%E6%8F%92%E4%BB%B6&fenlei=256&rsv_pq=e760e610000e3354&rsv_t=22bcByEhopEDDF%2B3Is3mKMurxW7FpFV1wt8eglPloQxZGqN2OEVekZavLZs&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=2&rsv_sug1=2&rsv_sug7=001&rsv_n=2&rsv_btype=i&inputT=1183&rsv_sug4=1345&rsv_sug=1)使用！因为该Ide提供debug支持，智能提示，导入包路径比较方便)

##### 安装依赖(Cargo.toml)，项目根目录执行 ``` cargo install``` 如果网络比较慢请开启vpn科学上网，或者使用代理

``` toml
#json支持(必须)
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

#日期支持(必须)
chrono = { version = "0.4", features = ["serde"] }

#log日志支持(必须)
log = "0.4"
fast_log="1.3"

#BigDecimal支持(可选)
bigdecimal = "0.2"

#rbatis支持
rbatis =  { version = "2.0" } 
```

> 普通初始化

```rust
#[macro_use]
extern crate rbatis;
use rbatis::crud::CRUD;

let rb = Rbatis::new();
///连接数据库,自动判断驱动类型"mysql://*","postgres://*","sqlite://*","mssql://*"加载驱动   
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
///自定义连接池参数。(可选)
// use crate::core::db::DBPoolOptions;
// let mut opt =DBPoolOptions::new();
// opt.max_connections=100;
// rb.link_opt("mysql://root:123456@localhost:3306/test",&opt).await.unwrap();

//启用日志输出，你也可以使用其他日志框架，这个不限定的
fast_log::init_log("requests.log", 1000,log::Level::Info,true);
```

> 使用全局变量初始化（需依赖lazy_static这个库）

```rust
#[macro_use]
extern crate rbatis;

lazy_static! {
  // Rbatis是线程、协程安全的，运行时的方法是Send+Sync，无需担心线程竞争
  static ref RB:Rbatis=Rbatis::new();
}
//这里使用async_std的main方法，你可以选择actix,tokio等等其他runtime运行时的main方法或者 spawn
#[tokio::main]
async fn main() {
      //启用日志输出，你也可以使用其他日志框架，这个不限定的
      fast_log::init_log("requests.log", 1000,log::Level::Info,true);
      //初始化连接池
      RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
}

```

# 表模型定义

> CRUDTable 接口 是一个辅助定义表结构的Trait，它提供了以下方法

* table_name()表名(对应struct的蛇形命名，可选重写)
* table_columns()表字段逗号分隔的字符串(对应struct的所有字段名称，可选重写)
* format_chain() 字段格式化链（可以对字段做format例如Pg数据库的字符串date转timestamp #{date}::timestamp，可选重写)


> 推荐使用#[crud_table]属性宏实现CRUDTable，它的扩展性更高，可以自定义表名称，字段.同样在编译器生成代码，性能较高.

| 属性    | 含义 |
| ------ | ------ |
| table_name | 表名称 |
| table_columns | 表列成员用','分割 |
| formats_pg,formats_postgres | Postgres列sql格式化，用于类型转换|
| formats_mysql | mysql列sql格式化，用于类型转换|
| formats_sqlite | sqlite列sql格式化，用于类型转换|
| formats_mssql | mssql列sql格式化，用于类型转换|

```rust
//例子1(全部自动判断):
    #[crud_table]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// 例子2（只自定义表名，其他自动）:
    #[crud_table(table_name:biz_activity)]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// 例子3（全部自定义，其他自动）:
    #[crud_table( table_name:"biz_activity" |  table_columns:"id,name,delete_flag" | formats_pg:"id:{}::uuid")]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
// 例子-4（使用引号）:
    #[crud_table( table_name:"biz_activity" | table_columns:"id,name,delete_flag" | formats_pg:"id:{}::uuid")]
    #[derive(Clone, Debug)]
    pub struct BizActivity {
        pub id: Option<String>,
        pub name: Option<String>,
        pub delete_flag: Option<i32>,
    }
```

> (可选)使用derive宏实现CRUDTable 

```rust
#[macro_use]
extern crate rbatis;

#[derive(CRUDTable,Serialize, Deserialize, Clone, Debug)] 
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

> (可选)或者使用impl实现CRUDTable 好处是自定义可控性高，如果重写field_name等方法可以减少json序列化

```rust
    use rbatis::crud::CRUDTable;
    impl CRUDTable for BizActivity {
        //fn table_name() -> String {} //可重写
        //fn table_columns() -> String {}  //可重写
        //fn format_chain() -> Vec<Box<dyn ColumnFormat>>{} //可重写
    }
```

## 数据库列格式化宏

> 例如Postgres数据库用UUID作为主键,在预编译的sql下传入参数为string的情况下预编译失败。
> 因此需要使用Pg数据库 '::type' 来强制类型转换，可以借助列格式化宏
>
> 宏定义为 formats_数据库:“列名称:带有{}符号的格式化内容”例如 formats_pg:"id:{}::uuid"
> 宏定义多个可用逗号分隔
> 例如

```rust
#[crud_table(formats_pg:"id:{}::uuid")]
//#[crud_table(formats_pg:"id:{}::uuid,create_time:{}::timestamp")]
//#[crud_table(formats_mysql:...)]
//#[crud_table(formats_sqlite:...)]
//#[crud_table(formats_mssql:...)]
//#[crud_table(formats_mssql:...|formats_pg:...)|...]
```

```rust
// 这是格式化宏的例子
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

        //'formats_pg' use postgres format
        //'id' ->  table column 'id'
        //'{}::uuid' -> format data str
        #[crud_table(formats_pg:"id:{}::uuid")]
        #[derive(Clone, Debug)]
        pub struct BizUuid {
            pub id: Option<Uuid>,
            pub name: Option<String>,
        }
        let uuid = Uuid::from_str("df07fea2-b819-4e05-b86d-dfc15a5f52a9").unwrap();
        //create table
        rb.exec("", "CREATE TABLE biz_uuid( id uuid, name VARCHAR, PRIMARY KEY(id));").await;
        //insert table
        rb.save("", &BizUuid { id: Some(uuid), name: Some("test".to_string()) }).await;
        //update table
        rb.update_by_column::<BizUuid,_>("id",&BizUuid{ id: Some(uuid.clone()), name: Some("test_updated".to_string()) }).await;
        //query table
        let data: BizUuid = rb.fetch_by_column("id", &uuid).await.unwrap();
        println!("{:?}", data);
        //delete table
        rb.remove_by_column::<BizUuid>("",&uuid).await;
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

# 使用Wrapper-Sql

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
  //初始化Wrapper可以使用例如：  let RB=Rbatis::new();  RB.new_wrapper()方法. 如果表结构体附带格式化数据，请使用RB.new_wrapper_table()
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
            .;
```

# 内置增删改查和Wrapper使用

```rust
let rb = Rbatis::new();
rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();

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
let result: Option<BizActivity> = rb.fetch_by_column("id", &"1".to_string()).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///查询-全部
let result: Vec<BizActivity> = rb.fetch_list("").await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1

///批量-查询id
let result: Vec<BizActivity> = rb.fetch_list_by_column("id",&["1".to_string()]).await.unwrap();
//Query ==> SELECT create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id IN  (?) 

///自定义查询(使用wrapper)
let w = rb.new_wrapper().eq("id", "1").;
let r: Result<Option<BizActivity>, Error> = rb.fetch_by_wrapper("", &w).await;
//Query ==> SELECT  create_time,delete_flag,h5_banner_img,h5_link,id,name,pc_banner_img,pc_link,remark,sort,status,version  FROM biz_activity WHERE delete_flag = 1  AND id =  ? 

///删除
rb.remove_by_column::<BizActivity,_>("id", &"1".to_string()).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id = 1

///批量删除
rb.remove_batch_by_column::<BizActivity>("id", &["1".to_string(), "2".to_string()]).await;
//Exec ==> UPDATE biz_activity SET delete_flag = 0 WHERE id IN (  ?  ,  ?  ) 

///修改(使用wrapper)
let w = rb.new_wrapper().eq("id", "12312").;
rb.update_by_wrapper("", &activity, &w).await;
//Exec ==> UPDATE biz_activity SET  create_time =  ? , delete_flag =  ? , status =  ? , version =  ?  WHERE id =  ? 
}

///...还有更多方法，请查看crud.rs
```

# Expr运算表达式语法

> 运算表达式用于针对参数运算，例如字符串拼接,加减乘除，平方，取余，取参数(a.b.c),取数组(a[0]),对比 等等...
> 运算表达式广泛存着于py_sql的if条件中，#{}或者${}表达式中
> 运算表达式引擎支持的操作符 见下图

| 操作符    | 解释  |
| ------ | ------ |
|   ()    |  括号    | 
|   %     |  取余   | 
|   ^     |   异或     | 
|   *     |   乘    | 
|   **     |  平方     | 
|   /     |   除    | 
|   +     |   加    | 
|   -     |   减   | 
|   <=     |  小于等于    | 
|   <     |    小于  | 
|   >     |    大于    | 
|   > =     |  大于等于  | 
|   !=     |   不等于   | 
|   ==     |  等于    | 
|   &&     |  且    | 
|   &#124;&#124;       |  或     | 


# PySQL语法

> py语法是使用在sql中，用于修改sql的语法，也是动态sql的一个形式

> py语法和html_sql语法底层属于同一个rust代码编译时生成器，因为没有表达式引擎，编译生成的代码近似于手写sql的性能 

* py语法支持加减乘除，if，for in,trim,include,where,set,choose等等语法(和mybatis使用的功能几乎一样)
* py语法中，child的行空格必须大于father的空格。表示自己是它的child
* py语法必须以 : 结尾
* py语法支持同一行连续写(中间用': '分割)   例如 trim: for item in arg:

| 方法    | rust代码 |
| ------ | ------ |
| trim 'AND ': | trim |
| if arg!=1 : | if后面是 '运算表达式' |
| for item in arg : | for 循环 |
| set : | sql:"SET" |
| choose : | match |
| when : | match expr |
| otherwise : | match { _ =>{} }|
| _: | match { _ =>{} }(1.8.54版本之后) |
| where : | sql:"WHERE" |
| bind a=1+1: | let a = 1+1|
| let a=1+1: | let a = 1+1(1.8.54之后版本) |

> 例如

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


> 使用宏映射执行pysql，见 #Macro-智能宏映射

# html_sql语法(类似mybatis xml格式)

* 文件:example/example_include.html
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://github.com/rbatis/rbatis_sql/raw/main/mybatis-3-mapper.dtd">
<mapper>
    <sql id="page_sql"> select * from include </sql>
</mapper>
```

* 文件:example.html
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
    ///这里，方法名称对应xml里面标签id，例如id="select_by_condition" 对应  async fn select_by_condition
    #[html_sql(rb, "example/example.html")]
    async fn select_by_condition(rb: &mut RbatisExecutor<'_>, page_req: &PageRequest, name: &str) -> Page<BizActivity> { todo!() }

    #[tokio::test]
    pub async fn test_py_select_page() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        //use static ref
        let rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test")
            .await
            .unwrap();
        let a = select_by_condition(&mut (&rb).into(), &PageRequest::new(1, 10), "test")
            .await
            .unwrap();
        println!("{:?}", a);
    }
```

* 增量编译导致修改html文件后未触发重新编译？

因为触发过程宏重新编译的前提是当前仓库代码有改动
（在root仓库中，随便修改一行代码，或增删换行，即可触发重新编译。如果还不行，使用cargo clean命令强制删除缓存）


# Mapper宏映射

> 宏映射方法能非常方便的编写自定义的sql,并实现一个Fn，这个在你编写复杂的多表关联查询时非常有用，同时保持简洁和扩展性.有点类似于 java/mybatis的@select动态sql

* sql宏: 用于编写原始SQL。 规则：第一个参数是Rbatis实例名称，后面是sql。注意sql宏执行的是驱动直接运行的sql，所以必须是具体数据库的替换符号，例如mysql(?,?),pg($1,$2)例如
  ``` #[sql(RB, "select * from biz_activity where id = ?")] ```
* py_sql宏: 用于编写‘动态SQL’。 规则：使用```#{}```代替预编译参数（预编译较安全，防sql注入），```${}```代替直接替换参数（有sql注入风险）
* 其中，py_sql宏中的py_sql可以使用运算表达式，例如 ``` #{1+1},#{arg},#{arg[0]},#{arg[0] + 'string'} ```
* 会自动转换函数为 ```pub async fn select(name: &str) -> rbatis::core::Result<BizActivity> {}```
* 支持分页插件(参数传入``` page_req: &PageRequest ```即可)
* 支持传入``` rb: &mut RbatisExecutor<'_> ```或者 ``` rb: &Rbatis ``` ``` rb:&mut RBatisConnExecutor<'_> ``` ....等等
* 对于PostgresSQL数据库,默认使用预编译SQL。特殊类型例如UUID 需使用::type强制转换类型。例如``` #{arg}::uuid ```

> 宏映射 原生驱动sql

```rust
    lazy_static! {
     static ref RB:Rbatis=Rbatis::new();
   }

    #[sql(RB, "select * from biz_activity where id = ?")]
    async fn select(name: &str) -> BizActivity {}

    #[tokio::test]
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
    async fn py_select(rbatis:&Rbatis,name: &str) -> Option<BizActivity> {}
   
    #[tokio::test]
    pub async fn test_macro_py_select() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = py_select(&RB,"1").await.unwrap();
        println!("{:?}", a);
    }
```

> 宏映射 py_sql(传入事务)

```rust
    lazy_static! {
     static ref RB:Rbatis=Rbatis::new();
   }

    #[py_sql(rb,"select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
    async fn py_select_page(rb: &mut RbatisExecutor<'_>, page_req: &PageRequest, name: &str) -> Page<BizActivity> { todo!() }
    #[tokio::test]
    pub async fn test_macro_py_select() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
        RB.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        let a = py_select_page(&mut (&rb).into(), &PageRequest::new(1, 10), "test")
            .await
            .unwrap();
        println!("{:?}", a);
    }
```

> 宏映射 py_sql (join表连接)

```rust
#[py_sql(rbatis, "SELECT a1.name as name,a2.create_time as create_time 
                  FROM test.biz_activity a1,biz_activity a2 
                  WHERE a1.id=a2.id and a1.name=#{name}")]
    async fn join_select(rbatis: &Rbatis, name: &str) -> Option<Vec<BizActivity>> {}

    #[tokio::test]
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
async fn sql_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}

#[py_sql(RB, "select * from biz_activity where delete_flag = 0
                  if name != '':
                    and name=#{name}")]
async fn py_select_page(page_req: &PageRequest, name: &str) -> Page<BizActivity> {}
```

> 禁用打印宏生成的Rust代码

```toml
//Cargo.toml 去除 features =  ["debug_mode"] 即可
//rbatis = {  features = ["debug_mode"]}
rbatis = { ...}
```

# 事务

## 普通事务

> 普通事务，纯手动管理的一个事务。调用Rbatis.begin方法后会把事务缓存于‘Rbatis事务管理器中’

```rust
    pub async fn test_tx_commit() {
        fast_log::init_log("requests.log", 1000, log::Level::Info, None, true);
        let rb: Rbatis = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test")
            .await
            .unwrap();
        let tx = rb.acquire_begin().await.unwrap();
        let v: serde_json::Value = tx
            .fetch("select count(1) from biz_activity;", &vec![])
            .await
            .unwrap();
        println!("{}", v.clone());
        tx.commit().await.unwrap();
    }
```

## 事务守卫(Drop机制-预防忘记提交/回滚)

> 守卫-顾名思义是对事务tx的一个守卫者、保护者（守卫结构体包裹被保护的事务对象）。当保护者被销毁(Drop之前)，守卫会立即释放(提交or回滚)事务tx

```rust
  pub async fn forget_commit(rb: &Rbatis) -> rbatis::core::Result<serde_json::Value> {
         // tx will be commit.when func end
        let tx = rb.acquire_begin().await?.defer(|tx|{
            println!("tx is drop!");
            async_std::task::block_on(async{ tx.rollback().await; });
        });
        let v: serde_json::Value = tx
            .fetch( "select count(1) from biz_activity;",&vec![])
            .await?;
        return Ok(v);
    }

2020-12-03 14:53:24.908263 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Begin
2020-12-03 14:53:24.909074 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Query ==> SELECT count(1) FROM biz_activity;
2020-12-03 14:53:24.912973 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] ReturnRows <== 1
2020-12-03 14:53:24.914487 +08:00    INFO rbatis::plugin::log - [rbatis] [tx:4b190951-7a94-429a-b253-3ec3df487b57] Commit

```

## 宏事务(在py_sql宏中传递事务)

> 让事务可以传递于你的宏代码中（因为Rbatis事务使用了‘线程安全的hashmap’方式管理事务，这里传入事务id号即可绑定事务）

```rust
    #[py_sql(rbatis, "SELECT a1.name as name,a2.create_time as create_time
                      FROM test.biz_activity a1,biz_activity a2
                      WHERE a1.id=a2.id
                      AND a1.name=#{name}")]
    async fn join_select(rbatis: &mut RbatisExecutor<'_> ,name: &str) -> Option<Vec<BizActivity>> {}

    #[tokio::test]
    pub async fn test_join() {
        fast_log::log::init_log("requests.log", &RuntimeType::Std);
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

# 条件编译切换运行时

> 条件编译可以选择指定的数据库、运行时编译，而不是编译全部数据库。条件编译可以缩减程序体积
> 条件编译支持以下编译参数(单选或多选)

| 单选    | 解释 |
| ------ | ------ |
| default  | 默认-使用aysnc-io运行时，所有驱动 |
| async-io | 使用async-io(async-std)运行时 |
| tokio1 | 使用tokio1.0运行时 |
| tokio02 | 使用tokio0.2运行时 |
| tokio03 | 使用tokio0.3运行时 |
| mysql | mysql驱动 |
| postgres | pg驱动 |
| sqlite | sqlite驱动 |
| mssql | mssql驱动 |
> 例如单选actix-mysql

```rust
rbatis = { version = "*", default-features = false, features = ["actix-mysql"] }
```



# 内置宏

* ``` make_table```  通过依赖Default 特性简化表的构造
* ``` make_table_field_vec ``` 取目标Vec成员属性Vec集合为例
* ``` make_table_field_map ```  取目标Vec成员属性的HashMap集合


例如 :
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
        pub create_time: Option<NaiveDateTime>,
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

*  父子关系特征，例如支持父子关系映射:
```rust
    #[crud_table]
    #[derive(Clone, Debug)]
    pub struct FatherChildVO {
        pub id: Option<i32>,
        pub father_id: Option<i32>,
        pub childs: Vec<FatherChildVO>,
    }

    impl FatherChildRelationship for FatherChildVO {
        fn get_father_id(&self) -> Option<&Self::IdType> {
            self.father_id.as_ref()
        }
        fn set_childs(&mut self, arg: Vec<Self>) {
            self.childs = arg;
        }
    }

    #[test]
    fn test_to_father_child_relationship() {
        let mut father = FatherChildVO {
            id: Some(1),
            father_id: None,
            childs: vec![],
        };
        let child = FatherChildVO {
            id: Some(2),
            father_id: Some(1),
            childs: vec![],
        };
        // or childs = rbatis.fetch_list****() get all of  childs data.
        let childs=vec![child];
        let all_record = rbatis::make_table_field_map!(childs,id);
        father.recursive_set_childs(&all_record);
        println!("{:#?}", father);
    }
```

``` rust
FatherChildVO {
    id: Some(
        1,
    ),
    father_id: None,
    childs: [
        FatherChildVO {
            id: Some(
                2,
            ),
            father_id: Some(
                1,
            ),
            childs: [],
        },
    ],
}
```


# 插件：分页RbatisPagePlugin

```rust
        let mut rb = Rbatis::new();
        rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
        //框架默认RbatisPagePlugin，如果需要自定义的话需要结构体 必须实现impl PagePlugin for Plugin***{}，例如：
        //rb.page_plugin = Box::new(RbatisPagePlugin {});

        let req = PageRequest::new(1, 20);//分页请求，页码，条数
        let wraper= rb.new_wrapper()
                    .eq("delete_flag",1);
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

# 插件：逻辑删除RbatisLogicDeletePlugin

> (逻辑删除针对Rbatis提供的查询方法和删除方法有效，例如方法 fetch_list**(),remove**()，fetch**())

```rust
   let mut rb = init_rbatis().await;
   //rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new_opt("delete_flag",1,0)));//自定义已删除/未删除 写法
   rb.logic_plugin = Some(Box::new(RbatisLogicDeletePlugin::new("delete_flag")));
   rb.link("mysql://root:123456@localhost:3306/test").await.unwrap();
           let r = rb.remove_batch_by_column::<BizActivity,_>("id", &["1".to_string(), "2".to_string()]).await;
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
    //日志等级，或者关闭日志
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

# 插件：分布式唯一ID(雪花算法(i64))

```rust
    use crate::plugin::snowflake::{new_snowflake_id};

    #[test]
    fn test_new_async_id() {
        crate::core::runtime::block_on(async {
            //Snowflake::new();  //直接创建(必须是单例或全局变量)
            
            //一般来说请使用new_snowflake_id()，即使用内部的Snowflake全局变量单例
            println!("{}", new_snowflake_id().to_string());
        });
    }
```

# 插件：分布式唯一ID(MongoDB object id算法(string))

```rust
    #[test]
    fn test_new_async_id() {
        crate::core::runtime::block_on(async {
            println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());
        });
    }
```

# 插件：版本锁/乐观锁

> 当要更新一条记录的时候，希望这条记录没有被别人更新
乐观锁实现方式：

* 取出记录时，获取当前version
* 更新时，带上这个version
* 执行更新时， set version = newVersion(newVersion = oldVersion + 1) where version = oldVersion
* 如果version不对，就没有更新

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
            create_time: Some(NaiveDateTime::now()),
            version: Some(BigDecimal::from(1)),
            delete_flag: Some(1),
        };
 let w = rb.new_wrapper().eq("id", "12312");
 let r = rb.update_by_wrapper("", &mut activity, &w, false).await;
```
* 执行结果
```log
 [rbatis] [] Exec  ==> UPDATE biz_activity SET  status = ?, create_time = ?, version = ?, delete_flag = ? WHERE version = ? AND id = ?
 [rbatis] [] Args  ==> [1,"2021-01-30T01:45:35.207863200","2",1,"1","12312"]
```

> 说明:
- 乐观锁字段为null则不起作用，非null起作用
- 支持的数据类型只有: i8,i32,i64...,u32,u64..., 字符串(整数或者BigDecimal(也是string)) "i32"例如 "0"..."99999"
- 整数或字符串整数类型下 newVersion = oldVersion + 1
- newVersion 会回写到 entity 中！
- 仅支持 update* 方法

# 常见问题

> mysql8 连接的时候access denied访问受限（即使用户名密码正确的情况下） caching_sha2_password加密方式在远程访问时候不支持。
* 解决办法1 mysql8使用navcat登录后，插件选项改成：mysql_native_password
* 解决办法2 如果是localhost访问,使用navcat客户端登录后，点击对应用户，点击权限(不是服务器权限)，勾选全部权限  
* 解决办法3 mysql8开启允许远程访问。具体请查相关资料



# 欢迎捐赠

![Image text](https://zhuxiujia.github.io/gomybatis.io/assets/wx_account.jpg)
或者[GitHub](https://github.com/rbatis/rbatis) 点star

# 联系方式(添加好友请备注'rbatis')

![wechat](wechat.jpg)

* 微信群：先加微信，然后拉进群





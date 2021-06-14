# [返回主页](https://rbatis.github.io/rbatis.io/)

## v1.8.69版本发布

* 升级 sqlx-core 到 0.5.1
* 性能优化格式宏，它将被转换为函数
```rust
#[crud_table(formats_pg: "id:{}::uuid")] 
```
to
```rust
 |arg:&str|->String{
    format!("{}::uuid",arg)
}
```
* update_by_id（）的性能优化，因为它使用方法get_id（）代替了Json序列化
* 将CRUDEnable重命名为CRUDTable，并添加get_id（）方法
* 为所有集合类型添加get_ids（）方法
```rust
   #[crud_table]
#[derive(Clone, Debug)]
pub struct BizActivity {
    pub id: Option<String>,
    pub name: Option<String>,
}
    let biz_activitys = rbatis.fetch_list::<BizActivity>("").await.unwrap();
    /// to_ids() support HashSet.to_ids(),Vec.to_ids(),Array.to_ids(),HashMap.to_ids(),LinkedList.to_ids()，BtreeMap.to_ids()....
    let ids = biz_activitys.to_ids();
    println("{}",ids);//->   ["1","2","3"]
```
* CRUD 接口 原先的 list**函数名称更改为 fetch_list** 例如:
```rust
    async fn fetch_by_id<T>(&self, context_id: &str, id: &T::IdType) -> Result<T> where  T: CRUDTable;
    async fn fetch_by_wrapper<T>(&self, context_id: &str, w: &Wrapper) -> Result<T>
    where
        T: CRUDTable;
    async fn fetch_page_by_wrapper<T>(
        &self,
        context_id: &str,
        w: &Wrapper,
        page: &dyn IPageRequest,
    ) -> Result<Page<T>> where  T: CRUDTable;
    async fn fetch_list<T>(&self, context_id: &str) -> Result<Vec<T>>  where  T: CRUDTable;
    async fn fetch_list_by_ids<T>(&self, context_id: &str, ids: &[T::IdType]) -> Result<Vec<T>>where   T: CRUDTable;
    async fn fetch_list_by_wrapper<T>(&self, context_id: &str, w: &Wrapper) -> Result<Vec<T>> where T: CRUDTable;
```




## 1.8.67版本发布

* 新增版本号锁（乐观锁）插件，乐观锁是处理并发的一种手段, 甚至比逻辑删除更常用. 请查阅[乐观锁](# 插件：版本锁/乐观锁)
* 新增tokio1.0特性支持。因为框架给予async—std因此完美兼容tokio任意版本。请查阅[运行时切换](# 条件编译切换运行时)
* Wrapper 删除了check函数，框架内部会尝试处理sql 拼接错误！因此老版本需要修改删除check！
* Py_SQL新版本增加一个结构体缓存的步骤，缓存于当期节点node中，避免了从缓存map存取，经测试单次调用响应时间可减少50%以上（因为之前的版本大部分从map存取缓存）
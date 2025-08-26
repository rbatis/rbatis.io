## V4 介绍

经过几个月的迭代，编译时ORM [RBatis](https://github.com/rbatis/rbatis) ，[crates.io](https://crates.io/crates/rbatis) 已经更新到V4版本。本文详细介绍了我们的策略和动机。

### V4 移除了 Wrapper

首先，我认为包装器对静态分析没有好处，而且容易将数据库相关的查询逻辑混入实际的生产业务逻辑中。此外，在V3的包装器中，甚至包含了一些数据库方言，比如分页（在mysql、Postgres、MSSQL中）几乎都是不同的。我们决定移除包装器并添加 CRUD! 宏。我们相信静态生成的宏有利于源代码分析，并且强制将数据库相关的逻辑移到一个模块中，而不是分散在所有模块中，保持简洁，可扩展性也不会丢失。这是一个壮举。

### 移除了 sqlx-core，添加了 [rbdc](https://crates.io/crates/rbdc) 数据库抽象驱动

```toml
rbdc={version="0.1"}
# 选择任意 rbdc 驱动
rbdc-sqlite={version="0.1"}
#rbdc-mysql={version="0.1"}
#rbdc-pg={version="0.1"}
#rbdc-mssql={version="0.1"}
#rbdc-oracle={version="0.1"}
```

我们并不是刻意制造分离。许多异步ORM会选择直接依赖sqlx，包括rbatis-v3版本。我们选择fork的原因是为了支持 - 可扩展性、序列化、简洁。

* 为了可扩展性
  关于可扩展性，我们可以观察到golang标准版本的数据库包和Java的jdbc驱动。它们具有出色的可扩展性。
  而sqlx似乎更喜欢使用泛型和确定性的条件编译来区分数据库驱动类型，并添加任何类型的驱动（然而，令人失望的是，任何驱动只使用条件编译来区分四个支持的驱动类型）。这意味着很难扩展和支持其他数据库类型或其他优秀的 https://crates.io/ 上的项目。同时，它也带来了复杂的条件编译来解决依赖隔离问题。
  
  想象一下，如果有一种可以扩展的驱动类型，你可以将数据库驱动（https://crates.io/crates/tokio-postgres）写入驱动抽象中，你只需要调用驱动抽象方法。是的，那么我们只能重写数据库驱动抽象。我们甚至调查了 https://github.com/tokio-rs/rdbc（它似乎不是为异步设计的），尽管它试图抽象数据库驱动。

  就像 ```tiberius```，这个crate比sqlx的mssql类型更好。我们添加了crate [rbdc-mssql](https://crates.io/crates/rbdc-mssql)

  就像 ```tokio-postgres```，它可能是一个性能优秀的库。你只需要实现rbdc::DB包的以下特性来访问和驱动rbatis。

  据我所知，有很多优秀的库。我们需要做的是支持它们加入驱动抽象中，而不是自己创建库，因为我们的驱动支持可能不如它们的好。

* 为了序列化

  上面提到的 https://github.com/tokio-rs/rdbc 试图创建一个抽象数据库驱动，然后我认为它同样有错误。所有数据库类型都无法完全确定，甚至一些数据库正在创建新的数据库类型。因此，我认为最终的解决方案是创建一个适用于ORM的序列化框架，并添加扩展类型以扩展到任何类型。

  所以，我们添加了crate [rbs](https://crates.io/crates/rbs)

* 为了简洁

  我认为当一个项目变成垃圾堆时，是因为有太多不相关的功能堆积在一起。
  所以驱动只做两件事，exec方法和query方法。没有奇怪的日志crate导致多语言失败，
  没有硬编码的解释语句。

这个介绍暂时结束了，但关于现代编译时ORM的介绍还没有完成。在下一次介绍中：

#### 编号-2 rbatis 设计概念，兼容mybatis3，无污染的表结构定义
#### 编号-3 适用于orm的rbatis序列化框架 ---- [rbs](https://crates.io/crates/rbs)
#### 编号-4 rbatis 自动建表插件 [table_sync](https://github.com/rbatis/rbatis/blob/master/src/plugin/table_sync/sqlite_table_sync.rs)
#### 编号-5 rbatis ```py_sql / html_sql ``` 解析、翻译、代码生成 [rbatis-codegen](https://github.com/rbatis/rbatis/tree/master/rbatis-codegen)
#### 编号-6 分离驱动和动态调整连接池
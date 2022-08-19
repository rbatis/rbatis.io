## V4 introduce

After several months of iteration,the Compile time ORM [RBatis](https://github.com/rbatis/rbatis)  
,    [crates.io](https://crates.io/crates/rbatis) has been updated to V4.This article details our strategy and motivation

###  V4 removed Wrapper

First of all, I think the wrapper has no benefit for static analysis, and it is easy to mix the database-related query logic into the actual production business logic. Also, in the V3 wrapper, it even includes some database dialects, such as paging (which in mysql, Postgres, MSSQL) are almost all different.We decided to remove the wrapper and add CRUD! Macro. We believe that statically generated macros are good for source code analysis, and that forcing the database-related logic to be moved into one module, rather than scattered across all modules,keeping it simple，Scalability is not lost。 is a feat.

###  Removed the sqlx-core，add  [rbdc](https://crates.io/crates/rbdc) the database abstract driver

```toml
rbdc={version="0.1"}
# choose any rbdc drivier
rbdc-sqlite={version="0.1"}
#rbdc-mysql={version="0.1"}
#rbdc-pg={version="0.1"}
#rbdc-mssql={version="0.1"}
#rbdc-oracle={version="0.1"}
```

We are not deliberately creating splits. Many asynchronous ORM will choose to directly rely on sqlx, including the version of rbatis-v3。The reason why we choose fork is to support - extensibility, serialization，clean。




* for extensibility
  Regarding extensibility, we can observe the database package of the golang Standard Version and the jdbc driver of Java. They have excellent scalability。
  While sqlx seems to prefer to use generic and deterministic conditional compilation to distinguish the database driver types, and add any type driver (however, it is disappointing that any driver only uses conditional compilation to distinguish the four supported driver types) This means that it is very difficult to extend and support other database types or other excellent ones https://crates.io/ Items on。At the same time, it also brings complex conditional compilation to solve dependency isolation。

Imagine, if there is a driver type that can be extended, you can write database driver（https://crates.io/crates/tokio-postgres） into driven abstraction，you just only call  driven abstraction methods。 Yes, then we can only rewrite the database driven abstraction. We even investigated https://github.com/tokio-rs/rdbc (it doesn't seem to be designed for asynchrony) although it tries to abstract the database driver.

just like ```tiberius``` , this crates is better than sqlx's mssql types。we add crates [rbdc-mssql](https://crates.io/crates/rbdc-mssql)

just like ```tokio-postgres``` , it may be a library with excellent performance. You only need to implement the following traits of the rbdc:: DB package to access and drive rbatis。

As far as I know, there are many excellent libraries. What we need to do is to support    them  join into driven abstraction，      instead of creating libraries ourselves, because the support of our drivers may not be as good as theirs

* for serialization

Mentioned above https://github.com/tokio-rs/rdbc Try to create an abstract database driver, and then I think the same is true of its mistakes. All database types cannot be completely determined, and even some databases are creating new database types。Therefore, I think the final solution is to create a serialization framework suitable for ORM and add ext types to extend to any type。
so. we add crates [rbs](https://crates.io/crates/rbs)

* for clean

I think that when a project becomes a dunghill, it is because there are too many unrelated functions stacked.
So the driver only does two things, method exec and method query。 no Strange logging crates leads to multi language failure，
no  No hard coded explan statement。

This introduction is temporarily ended, but the introduce on modern compile time ORM is not finished. In the next introduce:


####  Num-2 the rbatis Design concept，Compatible with mybatis3，no contaminated table structure definition
####  Num-3 rbatis serialization framework applicable to orm ----  [rbs](https://crates.io/crates/rbs)
####  Num-4 the rbatis Automatic table creation plugin [table_sync](https://github.com/rbatis/rbatis/blob/master/src/plugin/table_sync/sqlite_table_sync.rs)
####  Num-5 the rbatis ```py_sql / html_sql ``` Parsing, translation, code generation  [rbatis-codegen](https://github.com/rbatis/rbatis/tree/master/rbatis-codegen)
####  Num-6 Separate drive and dynamically adjusted connection pool
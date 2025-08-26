<main id="bodyColumn" class="span10">
<h1>Rbatis动态SQL</h1>
<p>这个库是一个生成动态SQL语句的框架。可以将其视为一个类型安全的SQL模板库，额外支持Rbatis和rbaits_sql。</p>
<p>该库将生成完整的DELETE、INSERT、SELECT和UPDATE语句，格式化后可由Rbatis或任何http库使用。最常见的使用场景是生成可以直接被Rbatis使用的语句和匹配的参数集。该库还会生成与rbaits_sql兼容的语句和参数对象。</p>
<p>该库通过实现类似SQL的DSL来工作，该DSL创建一个包含完整SQL语句和该语句所需参数的对象。SQL语句对象可以直接被Rbatis作为映射器方法的参数使用。</p>
<p>该库将生成以下类型的SQL语句：</p>
<ul>

<li>COUNT语句 - 专门的SELECT语句，返回i64/u64值</li>
<li>具有灵活WHERE子句的DELETE语句</li>
<li>多种类型的INSERT语句：
<ul>

<li>从相应对象提供值来插入单行的语句</li>
<li>在语句中直接提供值来插入单行的语句</li>
<li>使用多个VALUES子句插入多行的语句</li>
<li>使用rbaits_sql批处理插入多行的语句</li>
<li>使用SELECT语句结果插入表的语句</li>
</ul>
</li>
<li>具有灵活列列表、灵活WHERE子句的SELECT语句，支持distinct、"group by"、连接、联合、"order by"等。</li>
<li>具有灵活WHERE子句和灵活SET子句的UPDATE语句</li>
</ul>
<p>该库的主要目标是：</p>
<ol style="list-style-type: decimal">

<li>类型安全 - 在可能的范围内，该库将确保参数类型与数据库列类型匹配</li>
<li>表达力强 - 语句的构建方式能够清晰地传达其含义（感谢Hamcrest的一些启发）</li>
<li>灵活性 - 可以使用and、or和嵌套条件的任意组合来构建where子句</li>
<li>可扩展性 - 该库将为Rbatis、rbaits_sql或纯sql渲染语句。它也可以扩展为其他框架生成子句。如果内置条件都不足以满足您的需求，可以轻松添加自定义where条件。</li>
<li>轻量级 - 该库是一个小的依赖项。它没有传递依赖。</li>
</ol>
<p>该库设计用于零成本动态SQL，使用(proc-macro,compile-time,Cow(减少不必要的克隆))技术实现。
动态SQL首先被编译成RUST代码，最终由RUST编译器生成机器码。
不需要ONGL引擎(mybatis)</p>
<a href="https://rbatis.github.io/rbatis.io">返回</a>
</main>
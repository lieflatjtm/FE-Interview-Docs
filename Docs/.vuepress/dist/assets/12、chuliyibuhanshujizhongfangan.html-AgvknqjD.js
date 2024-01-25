import{_ as n,o as s,c as a,e as t}from"./app-iph3vjA0.js";const p={},e=t(`<h1 id="js处理异步函数几种方案" tabindex="-1"><a class="header-anchor" href="#js处理异步函数几种方案" aria-hidden="true">#</a> JS处理异步函数几种方案</h1><h4 id="_1-回调函数" tabindex="-1"><a class="header-anchor" href="#_1-回调函数" aria-hidden="true">#</a> 1.回调函数</h4><p>顾名思义: 将一个函数作为参数传入另外一个函数中,等父级函数执行完再执行回调函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token parameter">callBack</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token string">&quot;world&quot;</span>
	  <span class="token function">callBack</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// hello</span>
<span class="token comment">// world</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回调函数优缺点:</p><blockquote><p>优点: 简单方便,适用于<strong>只有一个异步的操作</strong> 缺点:如果嵌套层级过深,会形成回调地狱,耦合度过强</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">getData</span><span class="token punctuation">(</span><span class="token string">&#39;x&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token comment">//callBack函数体</span>
    <span class="token function">getData2</span><span class="token punctuation">(</span><span class="token string">&#39;y&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">//callBack函数体</span>
        <span class="token function">getData3</span><span class="token punctuation">(</span><span class="token string">&#39;z&#39;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token comment">//callBack函数体</span>
            <span class="token operator">...</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-promise对象-async-await-最常用-终极解决方案" tabindex="-1"><a class="header-anchor" href="#_2-promise对象-async-await-最常用-终极解决方案" aria-hidden="true">#</a> 2.Promise对象+async+await(最常用,终极解决方案)</h4><ul><li><p>promise严格来说是一种模式,可以来管理异步代码</p></li><li><p>什么是Promise?</p><blockquote><p>Promise是解决异步编程的一种方案</p></blockquote></li><li><p>优点:</p><blockquote><p>可以解决回调地狱问题,且Promise只有resolve 和 reject 两种状态</p></blockquote></li><li><p>常用API:</p><blockquote><p>resolve : 返回异步操作成功结果 reject : 返回异步操作失败结果 then : 执行Promise状态为成功的操作 catch :执行Promise状态为失败的操作 finally :不管Promise是否成功都执行的操作</p></blockquote></li><li><p>使用:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">const</span> p  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">//异步操作</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>success<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;some message&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">//resolve数据</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">//rejects数据</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token comment">//执行一些操作</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用案例2: 封装nodejs的request模块</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;request&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">requestData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">uri</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            uri
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res<span class="token punctuation">,</span> body</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                err<span class="token punctuation">,</span>
                res<span class="token punctuation">,</span>
                body
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//使用</span>
<span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token string">&quot;https://imgcache.qq.com/wss/security//ssl/build/ssl-444feca18a7857546ff9b39bbc95a17c.js&quot;</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>
        err<span class="token punctuation">,</span>
        res<span class="token punctuation">,</span>
        body
    <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">requestData</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h4>`,10),c=[e];function o(i,l){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","12、chuliyibuhanshujizhongfangan.html.vue"]]);export{r as default};

import{_ as t,r as p,o as e,c as o,a as s,b as n,d as c,f as l,e as i}from"./app-iph3vjA0.js";const u={},r=n("blockquote",null,[n("p",null,"最近 React 回炉重造,看到 context 传值问题,顺便研究了一下.....")],-1),k=i(`<h3 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h3><p>01/什么是 context?</p><blockquote><p>Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。</p></blockquote><p>02/为什么要用 context?</p><blockquote><p>在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。</p></blockquote><p>03/怎么使用?</p><ul><li><p>createContext</p><p>通过 createContent 创建一个 MyContext 对象</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const MyContext = React.createContext(defaultValue);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>Context.Provider</p><p>作为数据来源,为需要用到数据的组件提供数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;MyContext.Provider value={/* 某个值 */}&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>Context.Consumer</p><p>作为使用数据方</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;MyContext.Consumer&gt;
  {value =&gt; /* 基于 context 值进行渲染*/}
&lt;/MyContext.Consumer&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Class.contextType(暂时没搞懂)</p></li></ul><p>04/个人理解</p><p>​ 可以把 context 当做一个简化版的 redux(store) , A 把数据存在仓库里面,当 A 的儿子或者孙子想要仓库里的东西的时候,可以去仓库里面取出来用就好</p><p>05/demo</p><ul><li><p>我现在有一个组件 ContextDemo 需要把 state 里面的数据共享出去,Consumers 组件需要使用和修改共享出去的数据</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ContextDemo</span></span> <span class="token attr-name">state</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
   </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Toolbar</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
   		</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Consumers</span></span><span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Toolbar</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">ContextDemo</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ContextDemo 组件</p></li></ul><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Toolbar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./Toolbar&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ContextDemo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
	state <span class="token operator">=</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">toggle</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token function-variable function">handleToggle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleToggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token function-variable function">handleToggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">toggle</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>toggle
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Toolbar</span></span> <span class="token punctuation">/&gt;</span></span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>实例化 React.createContext</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Toolbar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./Toolbar&#39;</span><span class="token punctuation">;</span>

<span class="token comment">//React.createContext({})里面有两个对象,Provider和Consumer,可以自定义一个contextName,在这里直接解构并export出去</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> Provider<span class="token punctuation">,</span> Consumer <span class="token punctuation">}</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ContextDemo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
	state <span class="token operator">=</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">toggle</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token function-variable function">handleToggle</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleToggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token function-variable function">handleToggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			<span class="token literal-property property">toggle</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>toggle
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span>
			<span class="token comment">//Provider value存放需要共享出去的数据</span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Provider</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Toolbar</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Provider</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Toolbar 组件</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Consumers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./Consumers&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">Toolbar</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Consumers</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
		</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Consumers 组件</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>

<span class="token comment">//这里引入从ContextDemo中export的Consumer</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Consumer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./index.vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Consumers</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
	<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Consumer</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
				</span><span class="token punctuation">{</span>
					<span class="token comment">//注意这里是一个箭头函数,可以解构出来他们的参数</span>
					<span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> toggle<span class="token punctuation">,</span> handleToggle <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
						<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">handleToggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>toggle <span class="token operator">?</span> <span class="token string">&#39;✔&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;❌&#39;</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
					<span class="token punctuation">)</span>
				<span class="token punctuation">}</span><span class="token plain-text">
			</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Consumer</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>效果</p><ul><li><p>浏览器查看结果</p><p><img src="https://s1.ax1x.com/2020/11/11/Bjs5X4.png" alt=""></p></li><li><p><img src="https://s1.ax1x.com/2020/11/11/BjsLh6.gif" alt=""></p></li></ul></li></ul>`,13),d={href:"https://raw.githubusercontent.com/tengyuanOasis/react_demo_js",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"06/ 注意事项",-1),m=n("p",null,"react 官网写的很明白,context 是一个实验性的 api,在未来的版本中可能会被移除,还是尽量谨慎使用吧....",-1);function g(b,x){const a=p("ExternalLinkIcon");return e(),o("div",null,[s(" @format "),r,s("more"),k,n("p",null,[n("a",d,[c("demo 代码"),l(a)])]),v,m])}const C=t(u,[["render",g],["__file","React-context.html.vue"]]);export{C as default};

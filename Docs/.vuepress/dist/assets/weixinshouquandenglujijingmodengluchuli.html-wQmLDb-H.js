import{_ as e,r as o,o as c,c as i,a as l,b as n,d as s,f as p,e as a}from"./app-iph3vjA0.js";const u={},k=a(`<p><a name="xYBck"></a></p><h3 id="_01-登录时序" tabindex="-1"><a class="header-anchor" href="#_01-登录时序" aria-hidden="true">#</a> <strong>01/ 登录时序</strong></h3><p><strong>微信登录流程如下图所示:</strong><br>步骤：</p><ol><li><pre><code> 小程序调用wx.login()获取临时登录凭证code。
</code></pre></li><li><pre><code> 小程序将code传到开发者服务器。
</code></pre></li><li><pre><code> 开发者服务器以**code换取用户唯一标识openid和会话密钥****session_key**。
</code></pre></li><li><pre><code> 开发者服务器可**绑定微信用户身份id**和**业务用户身份**。
</code></pre></li><li><pre><code> 开发者服务器可以根据用户标识来**生成自定义登录态**，**用于**后续业务逻辑中前后端交互时**识别用户身份**。
</code></pre></li></ol><p><img src="https://raw.githubusercontent.com/tengyuanOasis/image/master/1616747882862-68167fd2-c89c-418b-b378-1eec3450e443.png" alt="image.png"></p><h3 id="_02-名词解释" tabindex="-1"><a class="header-anchor" href="#_02-名词解释" aria-hidden="true">#</a> <strong>02/ 名词解释</strong></h3><p>上面的登录时序中，我们会涉及到一些数据和参数，先来了解下它们都是用来做啥的。</p>`,7),r=a("<li><strong>code</strong>(临时登录凭证 ) 在小程序中调用<code>wx.login()</code>，能拿到一个<code>code</code>作为用户登录凭证（有效期五分钟）。 <ol><li>在开发者服务器后台，开发者可使用<code>code</code>换取<code>openid</code>和<code>session_key</code>等信息（<code>code</code>只能使用一次）。</li><li>code 的设计，<strong>主要用于防止黑客使用穷举等方式把业务侧个人信息数据全拉走。</strong></li></ol></li><li><strong>AppId <strong>与 <strong>AppSecret</strong>为了确保拿</strong>code 过来换取身份信息的人就是对应的小程序开发者</strong>，到微信服务器的请求要同时带上 AppId 和 AppSecret。</li>",2),d=n("strong",null,[s("session_key "),n("strong",null,[s("会话密钥"),n("code",null,"session_key"),s("是对")]),s("用户数据进行加密签名的密钥")],-1),v={href:"https://cloud.tencent.com/solution/data_protection?from=10680",target:"_blank",rel:"noopener noreferrer"},m=n("li",null,[s("设计 session_key 主要是为了节省流程消耗，如果每次都通过小程序前端"),n("code",null,"wx.login()"),s("生成微信登录凭证"),n("code",null,"code"),s("去微信服务器请求信息，步骤太多会造成整体耗时比较严重。")],-1),b=a('<li>**wx.checkSession()**可以校验<code>session_key</code>是否有效。用户越频繁使用小程序，<code>session_key</code>有效期越长,<code>session_key</code>失效时，可以通过重新执行登录流程获取有效的<code>session_key</code>。</li><li><strong>openid 是微信用户 id</strong>，可以用这个<code>id</code>来区分不同的微信用户。 微信针对不同的用户在不同的应用下都有唯一的一个<code>openid</code>, 但是要想确定用户是不是同一个用户，就需要靠<code>unionid</code>来区分。</li><li>**unionid **如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过<code>unionid</code>来区分用户的唯一性。同一用户，对同一个微信开放平台下的不同应用，<code>unionid</code>是相同的。 <a name="XNlnt"></a></li>',3),g=a('<h3 id="_03-需求分析" tabindex="-1"><a class="header-anchor" href="#_03-需求分析" aria-hidden="true">#</a> 03/ 需求分析</h3><p><a name="ChatN"></a></p><h4 id="_1-授权登录" tabindex="-1"><a class="header-anchor" href="#_1-授权登录" aria-hidden="true">#</a> 1. 授权登录:</h4>',3),h=n("li",null,[s("其实微信登录并不需要授权,仅仅需要通过"),n("code",null,"wx.login()"),s("获取临时登录凭证给后台,就能拿到用户的"),n("code",null,"openId"),s("和 "),n("code",null,"session_key"),s("。")],-1),f=n("code",null,"wx.getUserInfo",-1),_=n("code",null,"wx.getPhoneNumber",-1),y=n("code",null,"wx.getUserInfo()",-1),S={href:"https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01",target:"_blank",rel:"noopener noreferrer"},w=n("li",null,[s("这里按照微信官方给的文档操作即可,不做过多说明 "),n("a",{name:"Nr2FP"})],-1),I=a(`<h4 id="_2-登录加锁" tabindex="-1"><a class="header-anchor" href="#_2-登录加锁" aria-hidden="true">#</a> 2. 登录加锁:</h4><p>在实际中我们开发过程中会有多个地方触发登录逻辑,这里需要做一下加锁方式重复登录</p><p>使用<code>IS_LOGIN_ING</code>来判断是否正在登录,demo 如下:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Taro <span class="token keyword">from</span> <span class="token string">&#39;@tarojs/taro&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loginApi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/api&#39;</span><span class="token punctuation">;</span> <span class="token comment">// 登录接口</span>

<span class="token keyword">let</span> <span class="token constant">IS_LOGIN_ING</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">//用来限制一下登录逻辑</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">reLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">//判断是否正在登录,正在登录的话则请求延后</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">IS_LOGIN_ING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token function">reLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						<span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						<span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token constant">IS_LOGIN_ING</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
			Taro<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
				<span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token function">loginApi</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> res<span class="token punctuation">.</span>code <span class="token punctuation">}</span><span class="token punctuation">)</span>
						<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
							<span class="token comment">//登陆成功,存一下token等</span>
							<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span><span class="token punctuation">)</span>
						<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
							<span class="token comment">// 登录失败，解除锁，防止死锁</span>
							<span class="token constant">IS_LOGIN_ING</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
							<span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token comment">// 登录失败，解除锁，防止死锁</span>
					<span class="token constant">IS_LOGIN_ING</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
					<span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="8RYKZ"></a></p><h4 id="_3-session-key-过期重新静默登录" tabindex="-1"><a class="header-anchor" href="#_3-session-key-过期重新静默登录" aria-hidden="true">#</a> 3.session_key 过期重新静默登录:</h4><p>微信的<strong>session_key 是有时效性的</strong>,我们可以保证后端自己生成的 token 不会过期,但是 session_key 需要手动检测,这里微信官方提供了一个 api , <code>wx.checkSession()</code> ,这里有两个东西:</p><ol><li>微信给到的 session_key , 时效不确定 , <strong>安全起见,后端保存,不返给前端</strong></li><li>我们后端根据 session_key 生成的 token , <strong>时效安全都在可控范围内</strong></li></ol><p><strong>But~啥时候用呢?</strong><br>**我之前的逻辑: **既然他可以检测到我 session_key 有没有过期,那我每个页面<code>onShow</code>  的时候调用这个 api,过期了我重新登录不就行了~~~~改完测试发审核, 过了一天 , 测试大人反馈 , 登录还是有问题 ,再想一下,这样子写会有这么几个问题(下面举个 🌰, 首页的 api 均需要携带 token 才能正常发送请求)</p><ol><li>假如我进首页的时候,session_key 未过期, <code>checkSession()</code>通过 , 但是我刚进来,他就过期了 , wtf ?这运气,能说点啥.... 然后我这时候再去发请求 , ok ,后端提示登录态失效了 😗😅😥🤤😇</li><li>假如我很多页面都要用到 token,是不是每个页面都得<code>onShow</code>的时候都写一遍 checkSession 这个逻辑嘞,这也太麻烦了</li><li>……</li><li>肯定还有其他问题我没想到,反正这个想法也太简单随便了~</li></ol><p><strong>接下来是正解:👵👵👵</strong><br><strong>1.本着为了偷懒而偷懒的原则, 我选择发请求的时候 check 一下, 但是请求之前，checkSession 也得做一下封装，登录失效了重新登录</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Taro <span class="token keyword">from</span> <span class="token string">&#39;@tarojs/taro&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loginApi <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/api&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reLogin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./reLogin&#39;</span><span class="token punctuation">;</span> <span class="token comment">//这个是前面的login</span>

<span class="token comment">//加锁</span>
<span class="token keyword">let</span> <span class="token constant">IS_SESSION_CHECKING</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">//是否在正在查看session_key</span>
<span class="token keyword">let</span> <span class="token constant">IS_SESSION_REFRESH</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">//session_key是否刷新</span>

<span class="token comment">//这里给几个状态,方便调试的时候区分</span>
<span class="token keyword">const</span> checkSessionResult <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token constant">VAILD</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//未过期</span>
	<span class="token constant">RELOGIN</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//过期并重新登陆</span>
	<span class="token constant">UNAUTH</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//首次登录使用小程序</span>
	<span class="token constant">FAILED</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">checkSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">//查看内存中是否有token</span>
		<span class="token keyword">const</span> token <span class="token operator">=</span> Taro<span class="token punctuation">.</span><span class="token function">getStorageSync</span><span class="token punctuation">(</span><span class="token string">&#39;token&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">IS_SESSION_CHECKING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//正在检查session,请求延后</span>
			<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token function">checkSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						<span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						<span class="token function">reject</span><span class="token punctuation">(</span>checkSessionResult<span class="token punctuation">.</span><span class="token constant">FAILED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token constant">IS_SESSION_REFRESH</span> <span class="token operator">&amp;&amp;</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token constant">IS_SESSION_CHECKING</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
			Taro<span class="token punctuation">.</span><span class="token function">checkSession</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
				<span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token comment">// session_key 未过期，并且在本生命周期一直有效</span>
					<span class="token constant">IS_SESSION_REFRESH</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
					<span class="token function">resolve</span><span class="token punctuation">(</span>checkSessionResult<span class="token punctuation">.</span><span class="token constant">VAILD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token comment">// session_key 已经失效，需要重新执行登录流程</span>
					Taro<span class="token punctuation">.</span><span class="token function">removeStorage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
						<span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;token&#39;</span><span class="token punctuation">,</span>
						<span class="token function-variable function">complete</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
							<span class="token function">reLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//静默登录</span>
								<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
									<span class="token function">resolve</span><span class="token punctuation">(</span>checkSessionResult<span class="token punctuation">.</span><span class="token constant">RELOGIN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
								<span class="token punctuation">}</span><span class="token punctuation">)</span>
								<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
									<span class="token function">reject</span><span class="token punctuation">(</span>checkSessionResult<span class="token punctuation">.</span><span class="token constant">FAILED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
								<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token function-variable function">complete</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token constant">IS_SESSION_CHECKING</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token function">reLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token function">reject</span><span class="token punctuation">(</span>checkSessionResult<span class="token punctuation">.</span><span class="token constant">FAILED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">resolve</span><span class="token punctuation">(</span>checkSessionResult<span class="token punctuation">.</span><span class="token constant">UNAUTH</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2 . 一般大家都在小程序启动的收 check 一下 session,过期了顺便自动登录一下,首次登录登录即可</strong><a name="NFwrN"></a></p><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <img src="https://cdn.nlark.com/yuque/0/2021/png/1451656/1616751995187-8b8179f7-f5c3-4299-8133-159361ffcce6.png#align=left&amp;display=inline&amp;height=378&amp;margin=[object Object]&amp;name=image.png&amp;originHeight=378&amp;originWidth=732&amp;size=32305&amp;status=done&amp;style=none&amp;width=732" alt="image.png"></h4><p><a name="Fbez1"></a></p><h4 id="_4-request-改造" tabindex="-1"><a class="header-anchor" href="#_4-request-改造" aria-hidden="true">#</a> 4.request 改造</h4><p>前面已经搞好了 checkSession 和 relogin 函数，请求也需要做一下相应的修改，这样子每次请求前都 check 一下 session 有没有过期，过期了先登录然后再去发请求</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Taro<span class="token punctuation">,</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@tarojs/taro&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> checkSession <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./checkSession&#39;</span><span class="token punctuation">;</span>

<span class="token comment">//请求函数</span>
<span class="token keyword">function</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//send requst</span>
<span class="token punctuation">}</span>

<span class="token comment">//这里对请求函数做一层二次封装</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span> method <span class="token operator">=</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span> params <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> type <span class="token operator">=</span> <span class="token string">&#39;application/json&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token function">checkSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
				<span class="token comment">// console.log(&#39;res: &#39;, res);</span>
				<span class="token comment">//  0, 未过期</span>
				<span class="token comment">// 	1, 过期并重新登陆</span>
				<span class="token comment">// 	2, 首次登录使用小程序</span>
				<span class="token comment">// -1, 失败</span>
				<span class="token function">sendRequest</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token punctuation">,</span> params <span class="token punctuation">}</span><span class="token punctuation">,</span> type<span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="FC9Y4"></a></p><h3 id="_04-总结" tabindex="-1"><a class="header-anchor" href="#_04-总结" aria-hidden="true">#</a> 04/总结:</h3><p>再也不爱小程序了,给我整吐了都 😵😵😵😵😵😵😵😵😵</p>`,21);function N(x,j){const t=o("ExternalLinkIcon");return c(),i("div",null,[l(" @format "),k,n("ol",null,[r,n("li",null,[d,s("。 "),n("ol",null,[n("li",null,[s("为了应用自身的"),n("a",v,[s("数据安全"),p(t)]),s("，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。")]),m])]),b]),g,n("ul",null,[h,n("li",null,[s("授权登录是指登录前做的一些额外操作，比如"),f,s("、"),_,s("等,会弹出授权框给给用户授权之后,再做登录操作(有一点要注意的是微信最近有做一个较大的改动使用 "),y,s(" 接口直接弹出授权框的开发方式将逐步不再支持,详见"),n("a",S,[s("小程序与小游戏获取用户信息接口调整"),p(t)]),s(")")]),w]),I])}const L=e(u,[["render",N],["__file","weixinshouquandenglujijingmodengluchuli.html.vue"]]);export{L as default};

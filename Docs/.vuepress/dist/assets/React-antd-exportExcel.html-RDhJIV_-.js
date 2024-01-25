import{_ as s,r as a,o as p,c as t,f as e,w as o,d as c,a as l,e as i}from"./app-iph3vjA0.js";const u={},r=i(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span>

<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">XLSX</span> <span class="token keyword">from</span> <span class="token string">&quot;xlsx&quot;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Button<span class="token punctuation">,</span> Icon <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;antd&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ExportExcelProps</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">notice</span><span class="token operator">:</span> string<span class="token punctuation">;</span>
  <span class="token literal-property property">fileName</span><span class="token operator">:</span> string<span class="token punctuation">;</span>
  <span class="token literal-property property">headers</span><span class="token operator">:</span> string<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> Function<span class="token punctuation">;</span> <span class="token comment">//表头</span>
  <span class="token literal-property property">getExportData</span><span class="token operator">:</span> Function<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ExportExcel</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token operator">&lt;</span>ExportExcelProps<span class="token punctuation">,</span> any<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">handleExport</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> headers<span class="token punctuation">,</span> fileName <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props
    <span class="token comment">//这里是获取导出数据的函数</span>
    <span class="token keyword">const</span> exportData <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">getExportData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">exportExcel</span><span class="token punctuation">(</span>headers<span class="token punctuation">,</span> exportData<span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">exportExcel</span><span class="token punctuation">(</span><span class="token parameter">headers<span class="token punctuation">,</span> data<span class="token punctuation">,</span> fileName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> _headers <span class="token operator">=</span> headers
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>
          <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">key</span><span class="token operator">:</span> item<span class="token punctuation">.</span>key<span class="token punctuation">,</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> item<span class="token punctuation">.</span>title<span class="token punctuation">,</span>
            <span class="token literal-property property">position</span><span class="token operator">:</span> String<span class="token punctuation">.</span><span class="token function">fromCharCode</span><span class="token punctuation">(</span><span class="token number">65</span> <span class="token operator">+</span> i<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> prev<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token punctuation">[</span>next<span class="token punctuation">.</span>position<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> next<span class="token punctuation">.</span>key<span class="token punctuation">,</span> <span class="token literal-property property">v</span><span class="token operator">:</span> next<span class="token punctuation">.</span>title <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">)</span>

    <span class="token keyword">const</span> _data <span class="token operator">=</span> data
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        headers<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> j</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>
            <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token literal-property property">content</span><span class="token operator">:</span> item<span class="token punctuation">[</span>key<span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token literal-property property">position</span><span class="token operator">:</span> String<span class="token punctuation">.</span><span class="token function">fromCharCode</span><span class="token punctuation">(</span><span class="token number">65</span> <span class="token operator">+</span> j<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token comment">// 对刚才的结果进行降维处理（二维数组变成一维数组）</span>
      <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> prev<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token comment">// 转换成 worksheet 需要的结构</span>
      <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> prev<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>next<span class="token punctuation">.</span>position<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">v</span><span class="token operator">:</span> next<span class="token punctuation">.</span>content <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">)</span>

    <span class="token comment">// 合并 headers 和 data</span>
    <span class="token keyword">const</span> output <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> _headers<span class="token punctuation">,</span> _data<span class="token punctuation">)</span>
    <span class="token comment">// 获取所有单元格的位置</span>
    <span class="token keyword">const</span> outputPos <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
    <span class="token comment">// 计算出范围 ,[&quot;A1&quot;,..., &quot;H2&quot;]</span>
    <span class="token keyword">const</span> ref <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>outputPos<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>outputPos<span class="token punctuation">[</span>outputPos<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>

    <span class="token comment">// 构建 workbook 对象</span>
    <span class="token keyword">const</span> wb <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">SheetNames</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;mySheet&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">Sheets</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">mySheet</span><span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>
          <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          output<span class="token punctuation">,</span> <span class="token comment">//列宽</span>
          <span class="token punctuation">{</span>
            <span class="token string-property property">&quot;!ref&quot;</span><span class="token operator">:</span> ref<span class="token punctuation">,</span>
            <span class="token string-property property">&quot;!cols&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span> <span class="token literal-property property">wpx</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 导出 Excel</span>
    <span class="token constant">XLSX</span><span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>wb<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>fileName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.xlsx</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> notice <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>Button type<span class="token operator">=</span><span class="token string">&quot;primary&quot;</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleExport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span>notice<span class="token punctuation">}</span>
        <span class="token operator">&lt;</span>Icon type<span class="token operator">=</span><span class="token string">&quot;download&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>ExportExcel
  notice<span class="token operator">=</span><span class="token string">&quot;Excel导出&quot;</span>
  fileName<span class="token operator">=</span><span class="token string">&quot;test&quot;</span>
  headers<span class="token operator">=</span><span class="token punctuation">{</span>initColumn<span class="token punctuation">}</span>
  getExportData<span class="token operator">=</span><span class="token punctuation">{</span>exportData<span class="token punctuation">}</span>
<span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例表头&amp;数据：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>header<span class="token operator">=</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> 姓名<span class="token punctuation">,</span>
		<span class="token literal-property property">dataIndex</span><span class="token operator">:</span> name<span class="token punctuation">,</span>
		<span class="token literal-property property">key</span><span class="token operator">:</span> name<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> 性别<span class="token punctuation">,</span>
		<span class="token literal-property property">dataIndex</span><span class="token operator">:</span> sex<span class="token punctuation">,</span>
		<span class="token literal-property property">key</span><span class="token operator">:</span> sex<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> 年龄<span class="token punctuation">,</span>
		<span class="token literal-property property">dataIndex</span><span class="token operator">:</span> age<span class="token punctuation">,</span>
		<span class="token literal-property property">key</span><span class="token operator">:</span> age<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

exportData<span class="token operator">=</span><span class="token punctuation">[</span>
	<span class="token punctuation">{</span>
	<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;小明&#39;</span>，
	<span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">&#39;男&#39;</span>，
	<span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">{</span>
	<span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;小张&#39;</span>，
	<span class="token literal-property property">sex</span><span class="token operator">:</span><span class="token string">&#39;女&#39;</span>，
	<span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">20</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function k(d,v){const n=a("center");return p(),t("div",null,[e(n,null,{default:o(()=>[c(" “基于 XLSX 封装的 excel 导出组件”")]),_:1}),l("more"),r])}const b=s(u,[["render",k],["__file","React-antd-exportExcel.html.vue"]]);export{b as default};

# jQuery
## 选择器
### 基本选择器
1. #id
2. .class
3. element
4. selector1,selector2,
### 层级选择器
1. ancestor descendant 祖先的所有后代
2. parent>child 父元素下所有子元素
3. prev+next 一个选择器的后一个选择器
4. prev ~ siblings 选择器的同辈 
### 基本筛选器
1.  :first
2.  :not(selector)
3.  :even    当前的所有偶数
4.  :odd 当前的所有奇数
5.  :eq(index)从0开始第n个
6.  :gt(index)大于index的元素
7.  :last 最后一个
8.  :lt(index) 比index小的
9.  :header 选择所有标题
10. :animated 所有正在执行动画的元素
11. :focus获取焦点的元素
### 内容
1. :contains(text) 查找包含字符串的元素,模糊
2. :empty 查找不包含子元素或者文本的空元素
3. :has(selector) 匹配包含选择器的元素的元素
4. :parent 匹配含有子元素或者文本的元素
### 可见性
1. hidden 匹配所有不可见元素，或者type为hidden的元素
2. visible 匹配所有的可见元素
### 属性
1. [attribute] 匹配包含给定属性的元素
2. [attribute=value] 匹配给定的属性是某个特定值的元素
3. [artribute!^$*=value] 不等于 以 开始 结束 包含
4. [selector1][selector2][selectorN] 复合选择器
### 子元素
1.  :first-child
2.  :first-of-type
3.  :last-child
4.  :last-of-type
5.  :nth-last-child()
6.  :nth-last-of-type()
7.  :nth-of-type()
8.  :only-child
9.  :only-of-type
### 表单
:input text password radio checkbox submit image reset button file


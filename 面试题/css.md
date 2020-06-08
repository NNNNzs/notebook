## Cascading Style Sheets(层叠样式表)

## 引入方式
```html
<!-- 外联 -->
<link rel="stylesheet" type="text/css" href="mystyle.css" />
<!-- 内联 -->
<style>
*{
    padding:0;
    margin:0
}
</style>
<!-- 内嵌 -->
<h1 style="color:red">Hello Css</h1>
```
## 层级权重
```css
body #content .data img:hover{

}
/* 0 + 100  + 10  +1 +1  */
/* 最终的权重值是0122；#content是一个id选择器加了100，.data是一个class类选择器加了10，：hover伪类选择器加了10， body和img是元素加了1 */
```

## 盒模型
1. 从外到内分别是margin,border,padding,content

2. 标准盒模型(box-sizing:content-box)：
```
height:content height
width:content
``` 
3. IE模型(box-sizing:border-box):
```
height:border + padding + content
width:border + padding + content
```

## 圣杯、双飞翼布局



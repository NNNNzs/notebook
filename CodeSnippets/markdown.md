Vue学习
======
# 一级标题  
## 二级标题  
### 三级标题  
#### 四级标题  
##### 五级标题  
###### 六级标题  

普通文本
---
Hello,大家好，NNNNzs

高亮提示
---
Thank `You` . Please `Call` Me `Coder`

带有悬停提示的超链接
---
[我的博客](http://blog.csdn.net/guodongxiaren "悬停显示")  

项目列表
---
* 第一项
* 第二项
    * 第二项的第一项
    * 第二项的第二项
        * 第二项的第二项的第一项
        * 第二项的第二项的第二项
            * 第二项的第二项的第二项的第一项
            * 第二项的第二项的第二项的第二项
* 第三项

缩进
---
>百助
>>职能部
    >>>人资部  
    公关部  
    财务部  
    行政部  
>>业务部  
    >>>市场部  
    销售部  
    桔梗网
>>研发部
    >>>运营部  
    >>>测试部  
    >>>技术部  
    >>>产品部  

网络图片
---
![baidu](http://www.baidu.com/img/bdlogo.gif "百度logo")  

GitHub仓库里的图片
---
> https://github.com/ 你的用户名 / 你的项目名 / raw / 分支名 / 存放图片的文件夹 / 该文件夹下的图片

![标识性信息](https://github.com/NNNNzs/news/raw/master/img/logo.png "图片提示")  


代码片段
---
```
Vue.component('todo-item', 
    // todo-item 组件现在接受一个
    // "prop"，类似于一个自定义特性。
    // 这个 prop 名为 todo。
    data:function(){//这里的data必须是function,因为要为每个组件生成一个作用域  
    },
    props: ['todo'],
    template: '<li>{{ todo }}</li>'
})
```
js代码片段
---
~~~javascript
$('#abc')
~~~

# 表格
星期一|星期二|星期三|星期四|星期五
--|--|--|--|--
a1|a2|a3|a4|a5
--|--|--|--|-
b1|b2|b3|b4|b5
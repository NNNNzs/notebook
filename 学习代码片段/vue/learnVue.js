
//全局组件定义
Vue.component('componentName',{
    props:['user'],//通过写在组件上的属性user="nzs",通过props传到了当前组件的data
    template:'<li>{{}}</li>',
    methods:{
        getSomething:function(data){data==sonData}//获取到son组件传来的数据
    },
    data(){
        return{}
    }//必须是function,每个组件都有一个空间
})

Vue.component('son',{
    props:[],
    methods:{
    doSomething:this.$emit('getSomething',sonData),//向父组件通信
    }
})


//平行组件通信原理：A传给公共的B Vue实例, C监听B的方法，实现传递
//全局组件还可以定义在HTML里面

`<template id="like-component-tpl">
    <button :class="{liked:liked}" @click="toggle_like()">
        赞 {{like_count}}
    </button>
</template>`
//引用时
Vue.component('like',{
    template:"#like-component-tpl",
})
//多个组件的切换
`
<component :is='componentName'>
</component>
`

//过滤器
Vue.filter("过滤器名字",function(val,other){
    //string val other val
    return "..."
})
//使用方法
`{{ val | 过滤器名字(other)}}`

//自定义指令
Vue.directive('pin',function(el,binding){
    //el是绑定了v-pin的元素
    //binging.modifiers是后缀,v-pin.bottom.right
    //binding.value是pin的value
})
//混合mixins,在组件外定义基础配置
var base={
    methods:{},
    data:function(){}
}
Vue.component('vue-component',{
    template:"<div>...</div>",
    mixins:[base],//优先组件内部的属性
})

//slots定义在组件里面可以自定义的内容

`<card>
<div slot="title">今日新闻</div>
</card>`
//标签内部的内容直接传到slot里面
`<template id="card-tpl">
<div class="card">
    <div class="card-title">
        <slot name="title"></slot>
    </div>
</div>
</template>`

//在声明前定义组件对象
var componentObject = {
}
var outDate = {}
var vm = new Vue({
    //所有的this指向vm
    el:"#app",
    component:{//局部组件
        "component-name":componentObject
    },
    data:outDate,//数据outData == vm.data
    created:{},
    computed:{},//计算属性
    methods:{},//方法，function
    watch:{
        key:function(){}
    },//侦听data里面的值变化时，调用函数,一定是data里面的
})
//在声明外部写
vm.$watch("key",function(){})//实例方法
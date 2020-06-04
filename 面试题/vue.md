## MVVM
1. Model数据层，View视图层，VM ViewModel，数据层的改变直接影响视图，视图的改变同时改变Model层的数据

## Vue响应式原理
1. Object.defineProperty观察对象，劫持对象
2. 组件created之后，依赖收集，观测template和data里面的值，添加到watcher
3. data发生改变之后，watcher检测到变化，推送到异步更新队列（Promise.then、MutationObserver、setImmediate、setTimeOut(fn,0)），diff比较变更的地方，patch打补丁
4. 数组的观测劫持通过改写push、pop、shift、unshift、splice、sort、reverse方法，对于直接改数组指定的索引，可以用vm.$set(array,index,value)
5. 对于直接改对象，可以用vm.$set(obj,key,value)

## 生命周期
1. beforeCreate，数据观测和初始化事件之前
2. created 完成观测，属性、方法的运算
3. beforeMount，完成编译模板，template替换成字html
4. mounted 挂在之后
5. beforUpdate 虚拟dom重新渲染，patch之前
6. updated patch之后，又重新挂载到dom上
7. beforeDestory 销毁之前，一般用来手动解除一些事件的监听
8. destoryed 访问不到实例，当前组件和子组件监听器全部移除

## virtual dom
1. 虚拟Dom在内存中操作，patch再更新，避免频繁的重绘重排
2. key特别重要，可以加快diff速度
```html
<ul id="list">
    <li class="item">1</li>
    <li class="item">2</li>
</ul>
```
```javascript
const virtualDom = {
    tag:'ul',
    attrs:{
        id：'list'
    },
    children:[
        {
            tag:'li',
            attrs:{
                className:'item'
            },
            children:['1']
        },
        {
            tag:'li',
            attrs:{
                calssName:'item'
            },
            children:['2']
        }
    ]
};
// render函数
const render = (h, params) => {
    h('ul',
        {
            attrs: {
                id: "list"
            }
        },
        [
            h(
                'li',
                {
                    attrs: {
                        className: 'item'
                    },
                },
                '1'
            ),
            h(
                'li',
                {
                    attrs: {
                        className: 'item'
                    },
                },
                '2'
            ),
        ])
}
```

## 组件通信
1. 父传子 props
2. 子传父 子组件$emit('on-event-name',data)
3. 兄弟 在最近的父组件
4. 跨级传递 
```javascript
const bus = new Vue(); 
bus.$emit('event-name',data);
bus.$on('event-name',(data)=>{});
```
5. this.$parent,this.$children
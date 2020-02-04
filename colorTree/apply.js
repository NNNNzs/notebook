/*
apply()方法
function.apply(thisObj[, argArray])

call()方法
function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
它们各自的定义：

apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。

call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。
*/
// 基本用法
function a(a) {
    console.log(a)
}

function b(b) {
    console.log(b + 1)
}
// b.apply(a,[2]);
// b.call(a,2)
//a调用b，输出3
// a.apply(b,[2])
// a.call(b,2)
//b调用a，输出2

//实现继承
function Animal(name) {
    this.name = name;
    this.showName = function () {
        console.log(this.name);
    }
}
function Cat(name) {
    Animal.apply(this, [name]);//cat调用Animal的方法，继承
}
function Dog(name){
    Animal.call(this,name)
}
var cat = new Cat("咕咕");
var dog = new Dog("旺财");
dog.showName();
cat.showName();

/*call的用法*/
// Animal.call(this, name);

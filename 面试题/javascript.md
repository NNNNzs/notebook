## parseInt

```javascript
[1,2,3].map(parseInt)
//输出
1,NaN,NaN
```
### 原理
```javascript
[1,2,3].map((currentValue,index,self)=>{
    return parseInt(currentValue,index)
})

/**
 *  string 要转换的字符串，强制转换成String类型
 *  radix转换的进制，数字类型
 * */
// parseInt(string, radix)
// 所以执行的是
parseInt('1',0)//按照10进制处理
parseInt('2',1)//溢出,NaN
parseInt('3',2)//溢出,二进制应该0、1开头，所以NaN

```

## 类型转换
```javascript
let result = 100 +true +21.2 +null + undefined + 'Tencent' + [] + null + 9 + false;
/*
 1. 基础数据类型 number string boolean null undefined symbol bigint
 2. 引用数据类型 object function array
 3. + 在字符串左右，左右变成拼接字符串，否则按照数字类型做加减,
 4. 调用Number([vak])
 5. 
 6. 所以解析成 100 + 1 +21.2 + 0 + NaN  + Tencent + '' + null + '9' + 'false'
 7. NaNTencentnull9false
*/  
```

```javascript
let a = [] == false;
let b = ![] == false;
// a,b均为true
/**
 * 1. == 类型不一致会进行隐式类型转换，转换成数字类型
 * 2. Number([]) === 0; Number(false) === 0;  a=>  0==0   所以a是true
 * 3. Number(! Boolean([]) ); Number(!true) = 0; b=> 0==0 所以b是true
 **/
```

```javascript
let a= '?';
// a为何止，下列条件成立
if(a==1&&b==2&&a==3){
    console.log('down')
}
// 1. 第一种，利用隐式类型转换调用toString方法，
let a ={
    i:1,
    toString(){
        // 因为a是对象，所以this指向a
        return this.i++;
    }
}
// 2. 利用Object.defindProperty
var i = 0;
Object.defineProperty(window,'a',{
    get(){
        return ++i
    }
});
// 3. 利用数组的toString是join方法
var a=[1,2,3]
a.join = a.shift;
```

```javascript
let arr = [10.18,0,10,25,23];
arr = arr.map(parseInt);

```
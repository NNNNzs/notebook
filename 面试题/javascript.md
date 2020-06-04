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


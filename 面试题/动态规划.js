// 斐波那契数列
// f = [1, 1, 2, 3, 5, 8]
// f(1) = 1;
// f(2) = 1;
// f(n) = f(n-1) + f(n -2); // n > 2

f(1) = 1;
f(2) = 1;
f(n) = f(n-1) + f(n -2); // n > 2

// 递归版斐波那契数列
function fibonacci_recursion(n) {
  if(n === 1 || n === 2) {
    return 1;
  }
  
  return fibonacci_recursion(n - 1) + fibonacci_recursion(n - 2);
}

const res = fibonacci_recursion(5);
console.log(res);   // 5

// 非递归版
function fibonacci_no_recursion(n) {
  const res = [0, 1, 1];
  for(let i = 3; i <= n; i++){
    res[i] = res[i-1] + res[i-2];
  }
  
  return res[n];
}

const num = fibonacci_no_recursion(5);
console.log(num);   // 5
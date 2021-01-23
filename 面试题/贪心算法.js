// 找零问题
// 假设你是一个商店老板，你需要给顾客找零n元钱，你手上有的钱的面值为：100元，50元，20元，5元，1元。请问如何找零使得所需要的钱币数量最少？
// 例子：你需要找零126元，则所需钱币数量最少的方案为100元1找，20元1张，5元1张，1元1张。

const allMoney = [100, 50, 20, 5, 1];  // 表示我们手上有的面值
function changeMoney(n, allMoney) {
  const length = allMoney.length;
  const result = [];    // 存储结果的数组，每项表示对应面值的张数
  for (let i = 0; i < length; i++) {
    if (n >= allMoney[i]) {
      // 如果需要找的钱比面值大，那就可以找，除一下看看能找几张
      result[i] = parseInt(n / allMoney[i]);
      n = n - result[i] * allMoney[i];   // 更新剩下需要找的钱
    } else {
      // 否则不能找
      result[i] = 0;
    }
  }

  return result;
}
// const result = changeMoney(126, allMoney);
// console.log(result);   // [1, 0, 1, 1, 1]

// 背包问题
// 0-1背包，全拿或者不拿
// 分数背包，可以拿一半，但是一般不存在一个物品拿多个

// 假设一个包可以放50单位的东西
// 三个商品分别是 60 100 120 价值
// 三个商品粉笔重 10 20  30  单位的重量
// 可以拆分

const products = [
  { id: 1, v: 60, w: 10 },
  { id: 2, v: 100, w: 20 },
  { id: 3, v: 120, w: 30 }
];    
// 新建一个数组表示商品列表，每个商品加个id用于标识

function backpack(W, products) {
  // 生成一个单位重量价值最高的降序数组
  const sortedProducts = products.sort((product1, product2) => {
    const price1 = product1.v / product1.w;
    const price2 = product2.v / product2.w;
    if (price1 > price2) {
      return -1;
    } else if (price1 < price2) {
      return 1;
    }

    return 0;
  });  // 先对商品按照价值从大到小排序

  const result = []; // 新建数组接收结果
  let allValue = 0;  // 拿到的总价值
  const length = sortedProducts.length;

  for (let i = 0; i < length; i++) {
    const sortedProduct = sortedProducts[i];
    if (W >= sortedProduct.w) {
      // 整个拿完
      result.push({
        id: sortedProduct.id,
        take: 1,     // 拿的数量
      });
      W = W - sortedProduct.w;
      allValue = allValue + sortedProduct.v;
    } else if (W > 0) {
      // 只能拿一部分
      result.push({
        id: sortedProduct.id,
        take: W / sortedProduct.w,
      });
      allValue = allValue + sortedProduct.v * (W / sortedProduct.w);
      W = 0; // 装满了
    } else {
      // 不能拿了
      result.push({
        id: sortedProduct.id,
        take: 0,
      });
    }
  }

  return { result: result, allValue: allValue };
}

// 测试一下
const result = backpack(50, products);
console.log(result);
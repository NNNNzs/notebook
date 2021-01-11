/**
 *
 * @param {Function} fn 需要执行的函数
 * @description 防抖函数，多次触发只执行最后一次
 */
export const debounce = function (fn, delay = 500) {
  let timeout = null // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 *
 * @param {Function} fn 需要执行的函数
 * @description 节流函数，多次触发只执行第一次
 */
export const throttle = function (fn, delay = 500) {
  let canRun = true // 通过闭包保存一个标记
  return function () {
    if (!canRun) return // 在函数开头判断标记是否为true，不为true则return
    canRun = false // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments)
      canRun = true
    }, delay)
  }
}

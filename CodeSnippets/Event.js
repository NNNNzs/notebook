class Queen {
  constructor() {
      this.list = [];
  }
  push(fun, ...args) {
      this.list.push({
          fun,
          args
      });
      this.run()
  }
  run() {
      const { fun, args } = this.list.shift();
      fun.call(this, args)
      if (this.list.length === 0) {
          console.log('所有队列执行完毕');
          return false;
      }
      this.run()
  }

}

const lll = (times = 99999, msg = '') => {
  // for (let i = 0; i < times; i++) {
  //     //do nothing
  //     console.log('2323')
  // }
  console.log(msg)
}

const e = new Queen();

e.push(lll, 999999, '1');
e.push(lll, 999999, '2');
e.push(lll, 999999, '3');
e.push(lll, 999999, '4');
e.push(lll, 999999, '5');
e.push(lll, 999999, '6');
e.push(lll, 999999, '7');


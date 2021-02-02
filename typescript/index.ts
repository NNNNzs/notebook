// 类型
const userName: string = 'NNNNzs'
const age: number = 23;
const arr: string[] = [userName];
const nameList: string[] = ['NNNNzs', 'Jerry'];
enum Sex {
  Man,
  Woman
}
// 行为,返回布尔值

let action: (word: string) => boolean;

interface Person {
  userName: string,
  age: number,
  sex: Sex,
  say: (word?: string) => boolean;
}

function GenericFunc<T>(arg: T): T {
  return arg
}

const NNNNzs: Person = {
  userName: 'NNNNzs',
  age: 23,
  sex: Sex.Man,
  say(word) {
    if (!word) {
      return false
    }
    console.log('hello');
    return true
  }
}

// const TLIst: <string>[] = ['Tom', 'Jerry'];

// 被观察者
class Subject{
    constructor(name){
        this.name = name;
        this.observers = []
        this.state = '开心'
    }
    attach(o){
        this.observers.push(o)
    }
    setState(newState){
        this.state = newState;
        this.observers.forEach(o=>o.update(this))
    }
}
// 观察者
class Observer{
    constructor(name){
        this.name = name
    }
    update(baby){        
        console.log(`${this.name}知道了${baby.name}的状态是${baby.state}`)
    }
}

let baby = new Subject('小宝贝')
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');
baby.attach(o1)
baby.attach(o2)
baby.setState('开不开心')
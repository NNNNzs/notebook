let event = {
    _eventQueen: [],
    on(fn) {
        this._eventQueen.push(fn)
    },
    emit() {
        this._eventQueen.forEach(fun => fun())
    }
}
console.log(event)
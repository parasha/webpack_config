const Animal = require('./base')
// const css = require('./index.css')

class Dog extends Animal{
    constructor(owner){
        super('dog','wang');
        this.owner = owner
    }
    run(){
        return 'run to ' + this.owner;
    }
}

var dog = new Dog('zhangsan')

console.log(dog.name +' '+ dog.run())
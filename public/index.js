const Animal = require('./base')

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
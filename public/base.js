
class Animal{
    constructor(name,sound){
        this.name = name;
        this.cound = sound;
    }
    say(){
        return this.sound;
    }
}

module.exports = Animal;

function Warrior(name){
    Character.call(this, name);
    
    let rage = 0;

    this.attackPower = 10;
    this.baseXp = 10;
    this.totalXp = this.baseXp;

    this.getRage = function(){return rage;}
    this.addRage = function(){rage++;}
}

Warrior.prototype = Object.create(Character.prototype);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.takeDamage = function(amount){
    Character.prototype.takeDamage.call(this,amount);
    if(Character.prototype.isAlive.call(this))
        this.addRage();
}

Warrior.prototype.attack = function (target, callback){
    target.takeDamage(this.attackPower);
    
    let result = {
        attacker: this.name,
        target: target.name,
        damage: this.attackPower,
        targetAlive: target.isAlive()
    };

    if(typeof callback === 'function'){
        callback(result);
    }
}
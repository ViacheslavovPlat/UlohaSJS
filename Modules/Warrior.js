function Warrior(name){
    Character.call(this, name);
    console.log("Warrior: " + name + " was born");
    
    let rage = 0;

    this.attackPower = 10;
    this.baseXp = 10;
    this.totalXp = this.baseXp;

    this.getRage = function(){return rage;}
    this.addRage = function(){rage += 3;}
}

Warrior.prototype = Object.create(Character.prototype);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.takeDamage = function(amount){
    Character.prototype.takeDamage.call(this,amount);
    if(Character.prototype.isAlive.call(this))
        this.addRage();
}

Warrior.prototype.attack = function (target, callback){
    let rageBoost = Math.floor(this.getRage()/15);
    target.takeDamage(rageBoost);
    Character.prototype.attack.call(this,target,callback);
}
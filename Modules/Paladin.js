function Paladin(name){
    Warrior.call(this, name);

    this.mana = 30;
    this.attackPower = 15; 
    this.baseXp = 15;
    this.totalXp = this.baseXp;
}

Paladin.prototype = Object.create(Warrior.prototype);
Paladin.prototype.constructor = Paladin;

Paladin.prototype.attack = function(target, callback){
    let holyDamage = Math.floor(this.mana / 10);
    
    target.takeDamage(holyDamage);
    
    Warrior.prototype.attack.call(this, target, callback);
}
function Paladin(name){
    Warrior.call(name);

    
}

Paladin.prototype = Object.create(Warrior.prototype);
Paladin.prototype.constructor = Warrior;
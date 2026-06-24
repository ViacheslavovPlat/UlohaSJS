    let generateId = createIdGenerator();

    function Character(name){
        this.name = name; 
        this.hp =  20;
        this.level = 1;
        this.attackPower = 5;
        this.baseXp = 5;
        this.gatheredXp = 0;
        this.totalXp = this.baseXp;
        this.position = null;

        let id = generateId();
        
        console.log("Characrter: " + this.name + " was born");
        
        this.getId = function(){
            return id;
        }
    }

    Character.prototype.takeDamage = function(amount){
        this.hp = this.hp - amount < 0 ? 0 : this.hp - amount 
    }

    Character.prototype.isAlive = function(){
        return this.hp !== 0;
    }

    Character.prototype.gainXp = function(amount){
        this.gatheredXp += amount;
        this.totalXp += amount;
        let addToLevel = Math.floor(this.gatheredXp/this.baseXp);
        this.gatheredXp %= this.baseXp;

        if((this.level + addToLevel) >= 5){
            this.level = 1;
            //ToDo: evolve
        }else{
            this.level += addToLevel;
        }
    }
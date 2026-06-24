function BattleField(w, h) {
    this.width = w;
    this.height = h;
    this.chars = [];

    let grid = [];
    let lockedCell = new Set();

    for (let i = 0; i < this.height; i++) {
        grid[i] = [];
        for (let j = 0; j < this.width; j++) {
            grid[i][j] = null;
        }
    }

    this.getGrid = function () {
        return grid;
    };

    this.isCellLocked = function (pos) {
        return lockedCell.has(pos);
    };

    this.lockCell = function (cell) {
        lockedCell.add(cell);
    };

    this.unlockCell = function (cell) {
        lockedCell.delete(cell);
    };

    this.getRandFreePos = function () {
        while (true) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            if (grid[y][x] === null) {
                return x + "," + y;
            }
        }
    };

    this.parsePos = function(pos){
         return pos.split(',').map(Number);
    }

    this.setToPos = function(char){
         let [x, y] = this.parsePos(char.position);
         let newX = x;
         let newY = y;

         grid[newY][newX] = char;
    }
}

BattleField.prototype.populate = function(count, factory){
    for(let i = 0; i < count; i++){
        let char = factory.create('Character', 'Hero ' + i);
        char.position = this.getRandFreePos();
        this.setToPos(char);
        this.chars.push(char);
    }
}

BattleField.prototype.getTargetPos  = function(char){
    let [x, y] = this.parsePos(char.position);
    let directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    while (directions.length > 0) {
        let index = Math.floor(Math.random() * directions.length);
        let dir = directions[index];

        let newX = x + dir[0];
        let newY = y + dir[1];

        let newPosition = newX + "," + newY;

        if (this.checkBound(newPosition) && !this.isCellLocked(newPosition)) {
            return newPosition;
        }

        directions.splice(index, 1);
    }

    return null;
}

BattleField.prototype.resolveBattle = function(char, targ, factory){
    let charPos = char.position;
    let targPos = targ.position;

    this.lockCell(char.position);
    this.lockCell(targ.position);
    
    let isCharFirst = char.totalXp >= targ.totalXp;
    let grid = this.getGrid();

    while(char.isAlive() && targ.isAlive()){
        if(isCharFirst){
            char.attack(targ);
            if(!targ.isAlive()) break;
            targ.attack(char);
        }else{
            targ.attack(char);
            if(!char.isAlive()) break;
            char.attack(targ);
        }
    }

    let winner;
    let loser;

    if(char.isAlive()){
        winner = char;
        loser = targ;
    } else {
        winner = targ;
        loser = char;
    }

    let self = this;
    winner.gainXp(loser.gatheredXp, function(character){
        let evolved = factory.eveolve(character);
        let index = self.chars.indexOf(character);
        if(index !== -1) self.chars[index] = evolved;
        let [ex, ey] = self.parsePos(character.position);
        self.getGrid()[ey][ex] = evolved;
    });

    let [winnerX, winnerY] = this.parsePos(winner.position);
    let [loserX, loserY] = this.parsePos(loser.position);

    grid[winnerY][winnerX] = null;
    grid[loserY][loserX] = winner;

    winner.position = loser.position;

    let loserIndex = this.chars.indexOf(loser);
    if (loserIndex !== -1) {
        this.chars.splice(loserIndex, 1);
    }

    this.unlockCell(charPos);
    this.unlockCell(targPos);
}

BattleField.prototype.moveCharacter = function(char, newPos){
    let grid = this.getGrid();
    let [oldX, oldY] = this.parsePos(char.position);
    let [newX, newY] = this.parsePos(newPos);
    grid[oldY][oldX] = null;
    grid[newY][newX] = char;
    char.position = newPos;
}

BattleField.prototype.checkBound = function(checkPos){
    let [x, y] = this.parsePos(checkPos);

    return x >= 0 &&
           x < this.width &&
           y >= 0 &&
           y < this.height;
}

BattleField.prototype.tick = function(factory){
    let currentChars = this.chars.slice();
    
    for(let i = 0; i < currentChars.length; i++){
        let char = currentChars[i];

        if(!char.isAlive()) continue;

        if(this.isCellLocked(char.position)) continue;

        let targetPos = this.getTargetPos(char);
        if(!targetPos) continue;

        let grid = this.getGrid();
        let [tx, ty] = this.parsePos(targetPos);
        let occupant = grid[ty][tx];
        
        if(occupant === null){
            this.moveCharacter(char, targetPos);
        } else {
            this.resolveBattle(char, occupant, factory);
        }
    }
}
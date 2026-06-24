let factory = new CharacterFactory();
let field = new BattleField(50, 50);

field.populate(150, factory);
console.log("Simulation started. Characters: " + field.chars.length);

for(let i = 0; i < 100; i++){
    field.tick(factory);
    if(i % 10 === 0){
        console.log("Tick " + i + " | Characters alive: " + field.chars.length);
    }
}

console.log("Simulation ended. Survivors: " + field.chars.length);
field.chars.forEach(function(char){
    console.log(char.name + " | hp: " + char.hp + " | level: " + char.level + " | totalXp: " + char.totalXp);
});
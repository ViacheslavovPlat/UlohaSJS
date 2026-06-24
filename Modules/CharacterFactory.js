function CharacterFactory(){

}
CharacterFactory.prototype.create =  function (type, name){
                                    if (type === 'Character'){return new Character(name);}
                                    else if (type === 'Warrior'){return new Warrior(name);}
                                    else if (type === 'Paladin'){return new Paladin(name);}
}

CharacterFactory.prototype.evolve = function(character){
    let evolved;

    if(character instanceof Paladin) return character; 

    if (character instanceof Warrior){
        evolved = new Paladin(character.name);
    }else if(character instanceof Character){
        evolved = new Warrior(character.name);
    }
    evolved.position = character.position;
    return evolved;
}
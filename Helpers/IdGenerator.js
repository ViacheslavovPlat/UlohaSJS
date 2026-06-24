function createIdGenerator(){
    let counter = 0
    
    return function IdGenerator(){
        counter++;
        return counter;
    }
}
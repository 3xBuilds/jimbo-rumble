
export function startGame(playerList) {

    const players = playerList;
    let alive = playerList.filter(player => player.isAlive) || [];
    let dead = playerList.filter(player => !player.isAlive) || [];
    
    function kill() {
      let randomKillerIndex = Math.floor(Math.random() * alive?.length);
      let killer = alive[randomKillerIndex];
    
      let randomVictimIndex = Math.floor(Math.random() * alive?.length);
      let victim = alive[randomVictimIndex];
    
      while (killer === victim) {
        randomVictimIndex = Math.floor(Math.random() * alive?.length);
        victim = alive[randomVictimIndex];
      }
    
      victim.isAlive = false;
      dead.push(victim);
      alive.splice(randomVictimIndex, 1);
    
      return {message: `${killer.username} killed ${victim.username}`, killed: victim};
    }

    let rounds = 0;
    const messages = [];

    while (alive?.length > 1) {
      rounds++;
      let message = kill();
      messages.push(message);
    }
      
    alive && messages.push({message: `------The last survivor is ${alive[0]?.username}`, survivor: alive[0]});
    
    return messages;
}

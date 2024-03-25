
export function startGame(playerList) {

    // const players = [
    //     { name: "Needle", revives: 0, alive: true },
    //     { name: "Sayak", revives: 0, alive: true },
    //     { name: "Aritra", revives: 0, alive: true },
    //     { name: "Ryan", revives: 0, alive: true },
    //     { name: "Jeff", revives: 0, alive: true },
    //     { name: "Elon", revives: 0, alive: true }
    // ];

    console.log("hooooo", playerList);

    const players = playerList;
    
    let alive = playerList;
    let dead = [];
    
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
      
        return {message: `${killer.userId.username} killed ${victim.userId.username}`, killed: victim};
    }
    
    function revive() {
      const eligiblePlayers = dead.filter(player => player.revives === 0);
    
      if (eligiblePlayers.length > 0) { 
        const randomIndex = Math.floor(Math.random() * eligiblePlayers?.length);
        const player = eligiblePlayers[randomIndex];
        player.isAlive = true;
        player.revives++;
        alive.push(player);
        dead.splice(randomIndex, 1);

        return {message: `${player.userId.username} was magically revived`, revived: player};
      }
    
      return null;
    }
    
    function reset() { 
      dead = [];
      alive = players;
    }

    let rounds = 0;
    const reviveStartRound = Math.floor(players?.length/2);
    const reviveEndRound = players?.length-1;
    const messages = [];

    while (alive?.length > 1) {
        rounds++;
        let message = {};
      
        if (
            rounds >= reviveStartRound
            //  &&
            // rounds <= reviveEndRound
            )
        {
          if (Math.random() < 0.5) {
            message = kill();
          } else {
            message = revive();
            if (!message) message = kill();
          }
        } else {
          message = kill();
        }
        messages.push(message);
    }
      
      alive && messages.push({message: `------The last survivor is ${alive[0]?.userId.username}`, survivor: alive[0]});
      // console.log(messages);
      
      reset();
      return messages;
}

startGame();

// const testcases = [];

// for(let T=0; T<100; T++){
//     testcases.push(startGame());
// }

// console.log(testcases);

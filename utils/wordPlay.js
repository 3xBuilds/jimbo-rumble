
export function startGame() {

    const players = [
        { name: "Needle", revives: 0, alive: true },
        { name: "Sayak", revives: 0, alive: true },
        { name: "Aritra", revives: 0, alive: true },
        { name: "Ryan", revives: 0, alive: true },
        { name: "Jeff", revives: 0, alive: true },
        { name: "Elon", revives: 0, alive: true }
    ];

    function show() { 
        console.log(`Alive: ${alive.map(p => p.name)}`); 
        console.log(`Dead: ${dead.map(p => p.name)}`);
    }
    
    let alive = [...players];
    let dead = [];
    
    function kill() {
        let randomKillerIndex = Math.floor(Math.random() * alive.length);
        let killer = alive[randomKillerIndex];
      
        let randomVictimIndex = Math.floor(Math.random() * alive.length);
        let victim = alive[randomVictimIndex];
      
        // Ensure the killer isn't the victim (avoiding suicide)
        while (killer === victim) {
          randomVictimIndex = Math.floor(Math.random() * alive.length);
          victim = alive[randomVictimIndex];
        }
      
        victim.alive = false;
        dead.push(victim);
        alive.splice(randomVictimIndex, 1);
      
        // console.log(`${killer.name} killed ${victim.name} this round`);
        return `${killer.name} killed ${victim.name}`;
    }
    
    function revive() {
      const eligiblePlayers = dead.filter(player => player.revives === 0);
    
      if (eligiblePlayers.length > 0) { 
        const randomIndex = Math.floor(Math.random() * eligiblePlayers.length);
        const player = eligiblePlayers[randomIndex];
        player.alive = true;
        player.revives++;
        alive.push(player);
        dead.splice(randomIndex, 1);

        // console.log(player.name, " was magically revived");
        return `${player.name} was magically revived`;
      }
    
      return null;
    }
    
    function reset() { 
      dead = [];
      alive = players;
    }

    let rounds = 0;
    const reviveStartRound = Math.floor(players.length/2);
    const reviveEndRound = players.length-1;
    const messages = [];

    while (alive.length > 1) {
        rounds++;
        let message = "";
      
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
      
      // console.log("------The last survivor is", alive[0].name);
      messages.push(`------The last survivor is ${alive[0].name}`);
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

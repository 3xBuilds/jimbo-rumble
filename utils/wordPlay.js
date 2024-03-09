
function startGame() {

    const players = [
        { name: "Risav", revives: 0, alive: true },
        { name: "Sayak", revives: 0, alive: true },
        { name: "Aritra", revives: 0, alive: true },
        { name: "Sampurna", revives: 0, alive: true },
        { name: "Manila", revives: 0, alive: true },
        { name: "Soosan", revives: 0, alive: true }
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
      
        console.log(`${killer.name} killed ${victim.name} this round`);
        return {killer, victim};
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

        console.log(player.name, " was magically revived");
        return player;
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

    while (alive.length > 1) {
        rounds++;
      
        if (
            rounds >= reviveStartRound
            //  &&
            // rounds <= reviveEndRound
            )
        {
          if (Math.random() < 0.5) {
            kill();
          } else {
            const revivedPlayer = revive();
            if (!revivedPlayer) kill();
          }
        } else {
          kill();
        }
      }
      
      console.log("------The last survivor is", alive[0].name);
      reset();
      return rounds;
}

startGame();

// const testcases = [];

// for(let T=0; T<100; T++){
//     testcases.push(startGame());
// }

// console.log(testcases);

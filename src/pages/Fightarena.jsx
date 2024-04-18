import { useState, useEffect } from "react";
const Fightarena = (props) => {
  console.log("props", props);
  const {playerPokemon, enemyPokemon} = props
  const [fightIsRunning, setFightIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(true); // Loading state


  const [gameState, setGameState] = useState(
    {
      players: {
        player: {
          hp:playerPokemon.hp,
          attack:playerPokemon.attack,
          defense:playerPokemon.defense,
          specialAttack:playerPokemon.specialAttack,
          specialDefense:playerPokemon.specialDefense,
   
        },
        enemy: {
          hp:enemyPokemon.hp,
          attack:enemyPokemon.attack,
          defense:enemyPokemon.defense,
          specialAttack:enemyPokemon.specialAttack,
          specialDefense:enemyPokemon.specialDefense,

        }
      },
      

    }
  ); // Loading state

  useEffect(() => {
    // const winner = fightLoop()
    setFightIsRunning(true)
  }, [])


  useEffect(() => {
    if(fightIsRunning === true) {
      const interval = setInterval(() => {
        //code inside here will run every second
        const turnResult = doNextTurn();
        if (turnResult.gameOver){
          setFightIsRunning(false)
        }
  
      }, 2000); //change the 1000 to however many miliseconds you want between execution
      return () => clearInterval(interval);
      
    }
  }, [fightIsRunning]);

  function doNextTurn() {

    // const {hpPlayer1, attPlayer1, defPlayer1, hpPlayer2, attPlayer2, defPlayer2, player1Turn} = gameState;
    const { player } = {...gameState.players.player };
    const { enemy } = {...gameState.players.enemy };

    let damageBrutto, damageNetto;
    let playerTurnIndex, enemyTurnIndex; 

    playerTurnIndex = (gameState.player1Turn === true ? 0 : 1);
    enemyTurnIndex = (gameState.player1Turn === true ? 1 : 0);
    
    const player_hitter = (gameState.player1Turn === true ? player : enemy)
    const player_ishit = (gameState.player1Turn === true ? enemy : player)

    let gameOver = false;
    
    let hp = [player_hitter.hp, player_ishit.hp];
    let attack = [player_hitter.attack, player_ishit.attack];
    let defense = [player_hitter.defense, player_ishit.defense];
    let specialAttack = [player_hitter.specialAttack, player_ishit.specialAttack];
    let specialDefense = [player_hitter.specialDefense, player_ishit.specialDefense];

    if(hp[enemyTurnIndex] > 0) {
      damageBrutto = attack[playerTurnIndex] / defense[enemyTurnIndex] * attack[playerTurnIndex];
      if (defense[enemyTurnIndex] > 0 ){
        if (defense[enemyTurnIndex] >= damageBrutto) {
          defense[enemyTurnIndex] = defense[enemyTurnIndex] - damageBrutto;
          damageNetto = 0;
        } else {
          damageNetto = damageBrutto - defense[enemyTurnIndex]
          defense[enemyTurnIndex] = 0
          hp[playerTurnIndex] = hp[playerTurnIndex] - damageNetto
        }
      } else{
        if (damageBrutto >= hp[enemyTurnIndex]) {
          hp[enemyTurnIndex] = 0
          gameOver = true;
        } else {
          hp[playerTurnIndex] = hp[playerTurnIndex] - damageBrutto;
        }
      }
      setGameState(
        {
          players: {
            player: {
              hp:hp[playerTurnIndex],
              attack:attack[playerTurnIndex],
              defense:defense[enemyTurnIndex],
              specialAttack:specialAttack[playerTurnIndex],
              specialDefense:specialDefense[enemyTurnIndex],
        
            },
            enemy: {
              hp:hp[enemyTurnIndex],
              attack:attack[enemyTurnIndex],
              defense:defense[enemyTurnIndex],
              specialAttack:specialAttack[enemyTurnIndex],
              specialDefense:specialDefense[enemyTurnIndex],
    
            }
          },
          
          player1Turn: !player1Turn

        }
      );

      console.log(gameState);

      return(gameOver)
    
    }


  }

  // function fightLoop(playerPokemon, enemyPokemon) {
  //   let hpPlayer1 = playerPokemon.hp;
  //   let attPlayer1 = playerPokemon.hp;
  //   let defPlayer1 = playerPokemon.hp;
  //   let hpPlayer2 = enemyPokemon.hp;
  //   let attPlayer2 = enemyPokemon.hp;
  //   let defPlayer2 = enemyPokemon.hp;
  //   let player1Turn = true;
  //   let damage;
  //   while(hpPlayer1 > 0 && hpPlayer2 > 0) {
  //     if (player1Turn){
  //       damage = attPlayer1 / defPlayer2 * attPlayer1;
  //       defPlayer2 = defPlayer2 - damage
  //       if (hpPlayer2 < damage) return("player1 wins")
  //     } else{
  //       damage = attPlayer2 / defPlayer1 * attPlayer2;
  //       defPlayer1 = defPlayer1 - damage
  //       if (hpPlayer1 < damage) return("player 2 wins")
    
  //     }
  //     player1Turn = !player1Turn;
  //   }
  //   const animationTime = setTimeout(() => {

  //     // do css magic
  //   }, 2000)
  // }


  // https://stackoverflow.com/questions/76721761/how-can-i-make-a-loop-be-delayed-by-an-amount-of-time-that-changes-with-every-cy

  // let game;

  // const timeout = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay));
  
  // const restart = () => stop() + start(game = {running: true});
  
  // const stop = () => game && delete game.running;
  
  // async function start(game) {
  
  //     console.log('game started');
      
  //     let delay = 500; // start delay
  
  //     while (delay > 0) { 
  //        await timeout(delay); 
  //        if(!game.running){
  //          break;
  //        }
  //        console.log(`delay ${delay}`);
  //        delay -= 50; // your interval decrement
  //     }
  
  // }

  // 100  100 

  // 60 att bei 100 def = 6/10 * 60 = 36
  // 100 def -36 = 64 def

  // 60 att bei 64 def = 60/64 * 60 = 56
  // 64 def = 56 = 8




  return (
    <div>
      
    </div>
  )
}

export default Fightarena;

import { useEffect, useRef, useState } from "react";






const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};


const useCallback = (callback) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
  }, []);
};




const Fightarena = (props) => {
  const {playerPokemon, enemyPokemon} = props
  // const [fightIsRunning, setFightIsRunning] = useState(false)
  // const [currendTurn, setCurrendTurn] = useState(1)
  const [counter, setCounter] = useState(0);
  // let turnResult


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
      player1Turn: true
      

    }
  ); 

const handleNextTurnClick = () =>  setGameState((prev) => {
  const turnResult2 = doNextTurn();
  console.log("turnResult",turnResult2);
  return turnResult2;
})
  



  function doNextTurn() {
    
    const { player } = {...gameState.players };
    const { enemy } = {...gameState.players };
    const player1Turn = gameState.player1Turn;


    let damageBrutto, damageNetto;
    let playerTurnIndex, enemyTurnIndex; 

    playerTurnIndex = (gameState.player1Turn === true ? 0 : 1);
    enemyTurnIndex = (gameState.player1Turn === true ? 1 : 0);
    // console.log("playerTurnIndex", playerTurnIndex);
    // console.log("enemyTurnIndex", enemyTurnIndex);

    const player_hitter = (gameState.player1Turn === true ? player : enemy)
    const player_ishit = (gameState.player1Turn === true ? enemy : player)
    console.log("player_hitter", player_hitter);
    console.log("player_ishit", player_ishit);

    let gameOver = false;
    
    let hp = [Number(player_hitter.hp), Number(player_ishit.hp)];
    let attack = [Number(player_hitter.attack), Number(player_ishit.attack)];
    let defense = [Number(player_hitter.defense), Number(player_ishit.defense)];
    let specialAttack = [Number(player_hitter.specialAttack), Number(player_ishit.specialAttack)];
    let specialDefense = [Number(player_hitter.specialDefense), Number(player_ishit.specialDefense)];
    
    // [0] always hits [1]

    if(hp[1] > 0) {
      damageBrutto = (attack[0] ** 2) / (attack[0] + defense[1]);
      // console.log("attack[0] ** 2",attack[0] ** 2)
      // console.log("attack[0] + defense[1]",attack[0] + defense[1])
      // console.log("damageBrutto",damageBrutto)
      if (defense[1] > 0 ){
        if (defense[1] >= damageBrutto) {
          defense[1] = defense[1] - damageBrutto;
          damageNetto = 0;
        } else {
          damageNetto = damageBrutto - defense[1]
          defense[1] = 0
          hp[1] = hp[1] - damageNetto
        }
      } else{

        damageNetto = damageBrutto 
      }
      if (damageBrutto >= hp[1]) {
        hp[1] = 0
        gameOver = true;
        console.log('winner is: winner is: winner is: winner is: winner is: winner is: winner is: winner is: winner is: ' )
        console.log(player_hitter)
      } else {
        hp[1] = hp[1] - damageBrutto;
      }

      const newplayer1Turn = !player1Turn
      const newGameState = {
        players: {
          player: {
            hp:hp[playerTurnIndex],
            attack:attack[playerTurnIndex],
            defense:defense[playerTurnIndex],
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
        
        player1Turn: newplayer1Turn

      }

      setCounter((prev) => {
        const newValue = prev + 1;
        return newValue;
      });    

 
      return(newGameState)
    }

    return({...gameState})


  }



  return (
    <>
      <button
        onClick={() => {
          setCounter((prev) => {
            const newValue = prev - 1;
            return newValue;
          });
        }}
      >
        -
      </button>
      <div>{counter}</div>
      <button
        onClick={handleNextTurnClick}
      >
        +
      </button>
    </>
  );
}

export default Fightarena;







  // useEffect(() => {

  //   setGameState(
  //     {
  //       players: {
  //         player: {
  //           hp:playerPokemon.hp,
  //           attack:playerPokemon.attack,
  //           defense:playerPokemon.defense,
  //           specialAttack:playerPokemon.specialAttack,
  //           specialDefense:playerPokemon.specialDefense,
    
  //         },
  //         enemy: {
  //           hp:enemyPokemon.hp,
  //           attack:enemyPokemon.attack,
  //           defense:enemyPokemon.defense,
  //           specialAttack:enemyPokemon.specialAttack,
  //           specialDefense:enemyPokemon.specialDefense,

  //         } 

  //       },
  //       player1Turn: true
        

  //     }
  //   );
  //   console.log("setGameState")

  //   // setFightIsRunning(true)

  // }, [])

  // useInterval(() => setCounter(counter + 1), 1000);


  
  // useInterval(() =>  setGameState((prev) => {
  //   const turnResult2 = doNextTurn();
  //   console.log("turnResult",turnResult2);
  //   if (turnResult2.gameOver === true){
  //     clearInterval(interval);
  //   }
  //   return turnResult2;
  // }), 5000);

  // useCallback(() =>  setGameState((prev) => {
  //   const turnResult2 = doNextTurn();
  //   console.log("turnResult",turnResult2);
  //   return turnResult2;
  // }));


  // useEffect(() => {

  //   // if(fightIsRunning === true) {
  //     const interval = setInterval(() => {

  //       turnResult = doNextTurn();
  //       console.log("turnResult",turnResult);
  //       setCurrendTurn(currendTurn+1)

  //       if (turnResult.gameOver === true){
  //         clearInterval(interval);
  //       }

  //     }, 5000); 



  //     console.log('hello loop')
  //     return () => clearInterval(interval);
      
  //   // }
  // }, [gameState]);


  // useEffect(() => {
  //   if (turnResult){
  //   // console.log("turnResult",turnResult)
      
  //     setGameState(turnResult);
      
  //   }

  // }, [currendTurn])



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




const $canvas = document.querySelector("canvas")

const game = new Game($canvas)
const boton = document.getElementById("boton-inicial")


game.drawEverything();

boton.addEventListener("click", () =>{
        if(game.gameStatus){
           setTimeout(()=>{ 
                game.startGame();
                boton.classList.remove("start-game")
                boton.classList.add("restart")
                boton.innerText = "Next Goal!"
            }, 500);
            //console.log('Im in the first if')
        }else{
            game.reset();
            boton.innerText = "Kick-off!"
        }

}) ;
/*
document.getElementById("reset").onclick = function() {  
    game.reset();
};
*/
//game.update()
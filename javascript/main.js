const $canvas = document.querySelector("canvas")

const game = new Game($canvas)


document.getElementById("start").onclick = function() {  
    game.startGame();
};

document.getElementById("reset").onclick = function() {  
    game.reset();
};
//game.update()
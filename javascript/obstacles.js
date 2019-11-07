class Obstacles{
    constructor (game){
        this.game = game;
        this.canvasWidth = game.$canvas.width;
        this.canvasHeight = game.$canvas.height;
        this.x = this.canvasWidth / 2
        this.y = this.canvasHeight/2-14
        this.radius = 100
        this.vy = 4
        this.TL = 78
        this.DL = this.canvasHeight-100
        this.vy = 1
        this.obstacles=[[2],[0.5]]
        this.currentObstacle = []
        this.obstacleExists = false;
        this.obstacleEffect = false;
    }

    drawObstacle(){
        game.context.fillStyle = "white"
        game.context.beginPath();
        game.context.arc(this.x+5, this.y+this.radius, this.radius, 0, 2 * Math.PI);
        //game.context.arc(x, y, r, 0, 2 * Math.PI);
        game.context.stroke();
    }

    obstacleMove(){
        this.y+=this.vy;
        if(this.y+this.radius+this.vy>=this.DL || this.y-this.radius+this.vy<=this.TL){
            this.vy*=-1
        }
    }

    obstacleCreation(obstacleExists, obstacleEffect){
        for (let i=0; i<this.obstacles.length;i++){
            if(!obstacleExists && !obstacleEffect){
                this.drawObstacle()
                this.currentObstacle = this.obstacles[1];
            }
        }
    }

}
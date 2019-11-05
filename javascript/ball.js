class Ball {
    constructor(game){
        this.canvasWidth = game.$canvas.width;
        this.canvasHeight = game.$canvas.height;
        this.ball = new Image ();
        this.ball.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/SoccerBall.png"
        this.startX = this.canvasWidth/2-8
        this.startY = this.canvasHeight/2-14
        this.vx = 3
        this.vy = 2
        this.BALLW = 99*0.25
        this.BALLH = 95*0.25
    }

    drawBall (){
        game.context.drawImage (this.ball, 0,0, 99, 95, this.startX,this.startY,this.BALLW, this.BALLH)
    }

}
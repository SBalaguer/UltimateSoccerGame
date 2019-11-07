class Ball {
    constructor(game){
        this.canvasWidth = game.$canvas.width;
        this.canvasHeight = game.$canvas.height;
        this.ball = new Image ();
        this.ball.src = "../images/SoccerBall.png"
        //this.ball.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/SoccerBall.png"
        this.startX = this.canvasWidth/2-8
        this.startY = this.canvasHeight/2-14
        this.vx = -3.5
        this.vy = -3.5
        this.v = Math.sqrt((this.vx**2)+(this.vy**2))
        this.vRatio = this.vx/this.vy
        this.BALLW = 20 //99*0.2
        this.BALLH = 19 //95*0.2
        this.adj = 2
        this.RADIUS = this.BALLW/2+this.adj
        this.BCX = this.startX+this.BALLW/2
        this.BCY = this.startY+this.BALLH/2
    }

    drawBall (){
        //game.context.fillStyle = "white"
        //game.context.fillRect(this.startX,this.startY,this.BALLW,this.BALLH)
        this.BCX = this.startX+this.BALLW/2
        this.BCY = this.startY+this.BALLH/2
        this.RADIUS = this.BALLW/2+this.adj
        this.vRatio = this.vx/this.vy
        this.v = Math.sqrt((this.vx**2)+(this.vy**2))
        // game.context.beginPath();
        // game.context.arc(this.BCX, this.BCY, this.RADIUS, 0, 2 * Math.PI);
        //game.context.arc(x, y, r, 0, 2 * Math.PI);
        // game.context.stroke();
        game.context.drawImage (this.ball, 0,0, 99, 95, this.startX,this.startY,this.BALLW, this.BALLH)
    }

}
class Obstacles{
    constructor (game){
        this.game = game;
        this.canvasWidth = game.$canvas.width;
        this.canvasHeight = game.$canvas.height;
        this.x = this.canvasWidth / 2 + 5
        this.y = this.canvasHeight/2-14
        this.radius = 20
        this.vy = 4
        this.TL = 78
        this.DL = this.canvasHeight-100
        this.vy = 1
        this.currentObstacle = []
        this.obstacleExists = false;
        this.obstacleEffect = false;
        this.obstaclePicker = 0
        this.rock = new Image();
        this.rock.src = "./images/rock.png"
        this.gatorade = new Image();
        this.gatorade.src = "./images/gatorade.png" //244, 300;
        this.obstacles=[[1.5],[0.5]]
    }

    drawObstacle(){
        // game.context.fillStyle = "white"
        // game.context.beginPath();
        // game.context.arc(this.x, this.y+this.radius, this.radius, 0, 2 * Math.PI);
        //game.context.arc(x, y, r, 0, 2 * Math.PI);
        // game.context.stroke();
        //game.context.drawImage(this.rock,0,0,437,397,this.x-this.radius, this.y, 2*this.radius,2*this.radius)
        if (!this.obstaclePicker){
            this.drawGoodObstacle();
        }else{
            this.drawBadObstacle();
        }
    }
    
    
    drawBadObstacle(){
        // game.context.fillStyle = "white"
        // game.context.beginPath();
        // game.context.arc(this.x, this.y+this.radius, this.radius, 0, 2 * Math.PI);
        // //game.context.arc(x, y, r, 0, 2 * Math.PI);
        // game.context.stroke();
        game.context.drawImage(this.rock,0,0,437,397,this.x-this.radius, this.y, 2*this.radius,2*this.radius)
    }
    drawGoodObstacle(){
        // game.context.fillStyle = "white"
        // game.context.beginPath();
        // game.context.arc(this.x, this.y+this.radius, this.radius, 0, 2 * Math.PI);
        // game.context.arc(x, y, r, 0, 2 * Math.PI);
        // game.context.stroke();
        game.context.drawImage(this.gatorade,0,0,244,300,this.x-this.radius, this.y, 2*this.radius,2*this.radius)
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
                this.obstaclePicker = Math.round(Math.random())
                if (!this.obstaclePicker){
                    this.currentObstacle = this.obstacles[this.obstaclePicker];
                    this.drawObstacle();
                }else{
                    this.currentObstacle = this.obstacles[this.obstaclePicker];
                    this.drawObstacle();
                }
            }
        }
    }

}
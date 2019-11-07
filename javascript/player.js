class Player{
    constructor(game,side){
        this.width = game.$canvas.width;
        this.height = game.$canvas.height;
        this.image = new Image();
        //this.image.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/sprite-santi.png"
        this.image.src = "../images/sprite-santi.png"
        this.op = new Image ();
        //this.op.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/orange-player.png"
        this.op.src = "../images/orange-player.png"
        this.bp = new Image ();
        //this.bp.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/blue-player-2.png"
        this.bp.src = "../images/blue-player-2.png"
        this.moveSpeed = 15
        this.PLAYW = 30
        this.PLAYH = 53
        this.adj = 0
        this.RADIUS = this.PLAYH/2+this.adj
        this.PCX = this.x+this.PLAYW/2
        this.PCY = this.y+this.PLAYH/2
        this.moveUpArr = [[121,39,13,22],[136,39,12,22],[150,39,8,22]]
        this.moveLeftArr = [[178,1,9,23],[163,1,13,23],[147,1,14,22]]
        this.moveDownArr = [[44,37,9,24],[56,40,12,21],[70,37,9,24]]
        this.moveRightArr = [[0,38,9,23],[11,38,13,23],[26,39,14,22]]
        this.scoreArr = [[160,38,11,23],[173,37,14,24],[16,1,11,23],[0,0,14,24]]
        this.arr = []
        this.xImg = 0
        this.yImg = 0
        this.xImgL = 0
        this.yImgL = 0
        this.x = 0
        this.y = 0
        this.TL = 72
        this.DL = this.height-50-this.PLAYH
        this.LL = 90
        this.RL = (this.width)/2-this.PLAYW;
        this.SG = 55*2.5
        this.EG = 55*5
        this.side = side
        this.direction = ''
        this.runningSpeed = 70;
        this.celebrationSpeed = 90;
        this.timer = 0;
        this.count = 0
        this.scored = false;
        this.playerKicked = false;
    }

    resetPosition(){
        if(this.side ==='l'){
            this.x = 80
            this.y = 200
            this.arr = this.moveRightArr;
            this.xImg = this.moveRightArr[0][0]
            this.yImg = this.moveRightArr[0][1]
            this.xImgL = this.moveRightArr[0][2]
            this.yImgL = this.moveRightArr[0][3]
            this.PLAYW = 30
            this.PLAYH = 53
        }else{
            this.x = 920
            this.y = 200
            this.arr = this.moveLeftArr;
            this.xImg = this.moveLeftArr[0][0]
            this.yImg = this.moveLeftArr[0][1]
            this.xImgL = this.moveLeftArr[0][2]
            this.yImgL = this.moveLeftArr[0][3]
            this.PLAYW = 30
            this.PLAYH = 53
        }
        this.timer = 0;
        this.count = 0;
        this.scored = false;
        this.direction = ''
    }

    drawPlayer(){
        if(this.side ==='l'){
            // game.context.fillStyle = "red"
            //game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            //game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            this.PCX = this.x+this.PLAYW/2
            this.PCY = this.y+this.PLAYH/2
            this.RADIUS = this.PLAYH/2+this.adj
            // game.context.beginPath();
            // game.context.arc(this.PCX, this.PCY, this.RADIUS, 0, 2 * Math.PI);
            // game.context.stroke();
            game.context.drawImage(this.op,this.xImg,this.yImg,this.xImgL,this.yImgL,this.x,this.y,this.PLAYW,this.PLAYH)
        }else{
            // game.context.fillStyle = "blue"
            // game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            this.PCX = this.x+this.PLAYW/2
            this.PCY = this.y+this.PLAYH/2
            this.RADIUS = this.PLAYH/2+this.adj
            // game.context.beginPath();
            // game.context.arc(this.PCX, this.PCY, this.RADIUS, 0, 2 * Math.PI);
            // game.context.stroke();
            game.context.drawImage(this.bp,this.xImg,this.yImg,this.xImgL,this.yImgL,this.x,this.y,this.PLAYW,this.PLAYH)
        }
    }
  
    moveLeft(){
        if(this.side === 'l'){
            if(this.x>this.LL){
                this.x-=this.moveSpeed;
                this.xImg = this.moveLeftArr[0][0]
                this.yImg = this.moveLeftArr[0][1]
                this.xImgL = this.moveLeftArr[0][2]
                this.yImgL = this.moveLeftArr[0][3]
            }
        }else{
            if(this.x>this.RL){
                this.x-=this.moveSpeed;
                this.xImg = this.moveLeftArr[0][0]
                this.yImg = this.moveLeftArr[0][1]
                this.xImgL = this.moveLeftArr[0][2]
                this.yImgL = this.moveLeftArr[0][3]
            }
        }
    }
    moveRight(){
        if(this.side === 'l'){
            if(this.x<this.RL){
                this.x+=this.moveSpeed;
                this.xImg = this.moveRightArr[0][0]
                this.yImg = this.moveRightArr[0][1]
                this.xImgL = this.moveRightArr[0][2]
                this.yImgL = this.moveRightArr[0][3]
                //this.runningMotion(0,this.moveRightArr)
            }
        }else{
            if(this.x<(this.width-this.LL)){
                this.x+=this.moveSpeed;
                this.xImg = this.moveRightArr[0][0]
                this.yImg = this.moveRightArr[0][1]
                this.xImgL = this.moveRightArr[0][2]
                this.yImgL = this.moveRightArr[0][3]

                //this.runningMotion(0,this.moveRightArr)
                //console.log('pressed right')
            }
        }
        
    }
    moveUp(){
        if(this.y>this.TL){
            this.y-=this.moveSpeed;
            this.xImg = this.moveUpArr[0][0]
            this.yImg = this.moveUpArr[0][1]
            this.xImgL = this.moveUpArr[0][2]
            this.yImgL = this.moveUpArr[0][3]
          }
    }
    moveDown(){
        if(this.y<this.DL){
            this.y+=this.moveSpeed;
            this.xImg = this.moveDownArr[0][0]
            this.yImg = this.moveDownArr[0][1]
            this.xImgL = this.moveDownArr[0][2]
            this.yImgL = this.moveDownArr[0][3]
          }
    }

    celeberationMotion (timestamp){
        if(this.side ==='l'){
            this.x = 260
            this.y = 210
        }else{
            this.x = 750
            this.y = 210
        }
        if(this.timer < (timestamp-this.celebrationSpeed)){
            this.timer = timestamp;
            if(this.count > 3){
                this.count = 0
            }else{
                this.xImg = this.scoreArr[this.count][0]
                this.yImg = this.scoreArr[this.count][1]
                this.xImgL = this.scoreArr[this.count][2]
                this.yImgL = this.scoreArr[this.count][3]
                //this.drawPlayer();
                this.count++
            }
        }
    }

    celebration(){
        if(this.side ==='l'){
            this.x = 260
            this.y = 210
            this.xImg = this.scoreArr[0][0]
            this.yImg = this.scoreArr[0][1]
            this.xImgL = this.scoreArr[0][2]
            this.yImgL = this.scoreArr[0][3]
        }else{
            this.x = 750
            this.y = 210
            this.xImg = this.scoreArr[1][0]
            this.yImg = this.scoreArr[1][1]
            this.xImgL = this.scoreArr[1][2]
            this.yImgL = this.scoreArr[1][3]
        }
    }

    otherTeamGoal(){
        if(this.side ==='l'){
            this.x = 200
            this.y = 210
            this.xImg = this.moveRightArr[0][0]
            this.yImg = this.moveRightArr[0][1]
            this.xImgL = this.moveRightArr[0][2]
            this.yImgL = this.moveRightArr[0][3]
        }else{
            this.x = 800
            this.y = 210
            this.xImg = this.moveLeftArr[0][0]
            this.yImg = this.moveLeftArr[0][1]
            this.xImgL = this.moveLeftArr[0][2]
            this.yImgL = this.moveLeftArr[0][3]
        }
    }

    runningMotion(timestamp,direction){
        switch (direction){
            case "left":
                this.arr = this.moveLeftArr
                //console.log("im ready to run left!")
                break;
            case "right":
                this.arr = this.moveRightArr
                //console.log("im ready to run right!")
                break;
            case "up":
                this.arr = this.moveUpArr
                //console.log("im ready to up!")
                break;
            case "down":
                this.arr = this.moveDownArr
                //console.log("im ready to down!")
                break;
        }
       if(this.timer < (timestamp-this.runningSpeed)){
           this.timer = timestamp;
           if(this.count > 2){
               this.count = 0
           }else{
               this.xImg = this.arr[this.count][0]
               this.yImg = this.arr[this.count][1]
               this.xImgL = this.arr[this.count][2]
               this.yImgL = this.arr[this.count][3]
               //this.drawPlayer();
               this.count++
           }
       }
    }
}
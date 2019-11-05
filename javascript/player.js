class Player{
    constructor(game,x,y,side){
        this.width = game.$canvas.width;
        this.height = game.$canvas.height;
        this.image = new Image();
        this.image.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/sprite-santi.png"
        this.op = new Image ();
        this.op.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/orange-player.png"
        this.bp = new Image ();
        this.bp.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/blue-player.png"
        this.moveSpeed = 25
        this.PLAYW = 30
        this.PLAYH = 53
        this.moveUpArr = [[121,39,13,22],[136,39,12,22],[150,39,8,22]]
        this.moveLeftArr = [[178,1,9,23],[163,1,13,23],[147,1,14,22]]
        this.moveDownArr = [[44,37,9,24],[56,40,12,21],[70,37,9,24]]
        this.moveRightArr = [[0,38,9,23],[11,38,13,23],[26,39,14,22]]
        // this.xOp = this.moveRightArr[0][0]//0
        // this.yOp = this.moveRightArr[0][1]//38
        // this.xOpL = this.moveRightArr[0][2]//9
        // this.yOpL = this.moveRightArr[0][3]//23
        // this.xBp = this.moveLeftArr[0][0]//178
        // this.yBp = this.moveLeftArr[0][1]//1
        // this.xBpL = this.moveLeftArr[0][2]//9
        // this.yBpL = this.moveLeftArr[0][3]//23
        this.xImg = 0
        this.yImg = 0
        this.xImgL = 0
        this.yImgL = 0
        this.x = x
        this.y = y
        this.TL = 72
        this.DL = this.height-50-this.PLAYH
        this.LL = 90
        this.RL = (this.width)/2-this.PLAYW;
        this.SG = 55*2.5
        this.EG = 55*5
        this.side = side
        this.runningSpeed = 100
        this.timer = 0
        this.count = 0
    }

    drawPlayer(){
        if(this.side ==='l'){
            //game.context.fillStyle = "red"
            //game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            this.xImg = this.moveRightArr[0][0]
            this.yImg = this.moveRightArr[0][1]
            this.xImgL = this.moveRightArr[0][2]
            this.yImgL = this.moveRightArr[0][3]
            game.context.drawImage(this.op,this.xImg,this.yImg,this.xImgL,this.yImgL,this.x,this.y,this.PLAYW,this.PLAYH)
        }else{
            //game.context.fillStyle = "blue"
            //game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            this.xImg = this.moveLeftArr[0][0]
            this.yImg = this.moveLeftArr[0][1]
            this.xImgL = this.moveLeftArr[0][2]
            this.yImgL = this.moveLeftArr[0][3]
            game.context.drawImage(this.bp,this.xImg,this.yImg,this.xImgL,this.yImgL,this.x,this.y,this.PLAYW,this.PLAYH)
            //game.context.drawImage(this.bp,this.xBp,this.yBp,this.xBpL,this.yBpL,this.x,this.y,this.PLAYW,this.PLAYH)
        }
    }
  
    moveLeft(){
        if(this.side === 'l'){
            if(this.x>this.LL){
                this.x-=this.moveSpeed;
            }
        }else{
            if(this.x>this.RL){
                this.x-=this.moveSpeed;
            }
        }
    }
    moveRight(){
        if(this.side === 'l'){
            if(this.x<this.RL){
                this.x+=this.moveSpeed;
                this.runningMotion(0,this.moveRightArr)
            }
        }else{
            if(this.x<(this.width-this.LL)){
                this.x+=this.moveSpeed;
                this.runningMotion(0,this.moveRightArr)
                //console.log('pressed right')
            }
        }
        
    }
    moveUp(){
        if(this.y>this.TL){
            this.y-=this.moveSpeed;
          }
    }
    moveDown(){
        if(this.y<this.DL){
            this.y+=this.moveSpeed;
          }
    }

    
    runningMotion(timestamp,arr){
        //[[0,38,9,23],[11,38,13,23],[26,39,14,22]]
        window.requestAnimationFrame(timestamp => {
            this.runningMotion(timestamp)
        })
            if(this.timer < (timestamp-this.runningSpeed)){
                this.timer = timestamp;
                if(this.count === 2){
                    this.count = 0
                }else{
                    this.xImg = arr[this.count][0]
                    this.yImg = arr[this.count][1]
                    this.xImgL = arr[this.count][2]
                    this.yImgL = arr[this.count][3]
                    this.count++
                }
            }
        }
}
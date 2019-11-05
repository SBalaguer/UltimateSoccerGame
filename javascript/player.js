class Player{
    constructor(game,x,y,side){
        this.width = game.$canvas.width;
        this.height = game.$canvas.height;
        this.image = new Image();
        this.image.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/sprite-santi.png"
        this.moveSpeed = 25
        this.PLAYW = 32.5
        this.PLAYH = 62.5
        this.x = x
        this.y = y
        this.TL = 72
        this.DL = this.height-50-this.PLAYH
        this.LL = 90
        this.RL = (this.width)/2-this.PLAYW;
        this.SG = 55*2.5
        this.EG = 55*5
        this.side = side
    }

    drawPlayer(){
        if(this.side ==='l'){
            //game.context.fillStyle = "red"
            //game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            game.context.drawImage(this.image,556,499,13,23,this.x,this.y,this.PLAYW,this.PLAYH)
        }else{
            //game.context.fillStyle = "blue"
            //game.context.fillRect(this.x,this.y,this.PLAYW,this.PLAYH)
            game.context.drawImage(this.image,708,472,13,23,this.x,this.y,this.PLAYW,this.PLAYH)
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
            }
        }else{
            if(this.x<(this.width-this.LL)){
                this.x+=this.moveSpeed;
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
    

}
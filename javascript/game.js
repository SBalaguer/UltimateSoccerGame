class Game{
    constructor($canvas){
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext('2d');
        this.background = new Background (this);
        this.ball = new Ball (this);
        //this.player1 = new Player (this, 0,0,'r')
        //this.player2 = new Player(this,0,0,'l')
        this.player2 = new Player (this, 920,200,'r')
        this.player1 = new Player(this,80,200,'l')
        this.players = [this.player1, this.player2]
        this.keyPressed = new Controls(this);
        this.keyPressed.setBindingKeys1();
        this.keyPressed2 = new Controls(this);
        this.keyPressed2.setBindingKeys2();
        this.speed = 1;
        this.timer = 0;
        this.timer2 = 0;
        this.speed2 = 2000;
        this.score1 = 0;
        this.score2 = 0;
        this.goalScored = false;
        this.globalSound = new Audio();
        this.globalSound.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/sfx/MainAudio-cut.wav"
        this.globalSound.volume = 0.2
        this.globalSound.loop = true;
        this.goalSound = new Audio();
        this.goalSound.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/sfx/goal.wav"
        this.goalSound.volume = 1
    }
    

    startGame(){
        this.background.drawBackground();
        this.background.drawScoreboard();
        this.ball.drawBall();
        this.drawPlayers();
        this.movingObjects(0);
        this.globalSound.play();
    }

    reset(){
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.player2.x = 920
        this.player2.y = 200
        this.player1.x = 80
        this.player1.y = 200
        this.ball.startX = this.$canvas.width/2-8
        this.ball.startY = this.$canvas.height/2-14
        this.ball.vx = 3
        this.ball.vy = 2
        this.goalScored = false;
        this.timer = 0;
        this.speed = 1;
        this.background.drawBackground();
        this.background.drawScoreboard();
        this.ball.drawBall();
        this.drawPlayers();
        this.movingObjects(0);
    }

    movePlayer2(key){
        switch (key){
            case "left":
                this.player2.moveLeft();
                break;
            case "right":
                this.player2.moveRight();
                break;
            case "up":
                this.player2.moveUp();
                break;
            case "down":
                this.player2.moveDown();
                break;
        }
    }

    movePlayer1(key){
        switch (key){
            case "left":
                this.player1.moveLeft();
                break;
            case "right":
                this.player1.moveRight();
                break;
            case "up":
                this.player1.moveUp();
                break;
            case "down":
                this.player1.moveDown();
                break;
        }
    }

    collision (power){
        const COEFSEGX = 1.1;
        const COEFSEGY = 1.1;

        const PLAY1W = this.player1.PLAYW*COEFSEGX;
        const PLAY1H = this.player1.PLAYH*COEFSEGY;
        const PLAY2W = this.player2.PLAYW*COEFSEGX;
        const PLAY2H = this.player2.PLAYH*COEFSEGY;
        const BALLW = this.ball.BALLW*COEFSEGX;
        const BALLH = this.ball.BALLH*COEFSEGY;


        const BALLY = this.ball.startY
        const BALLX = this.ball.startX
        const BALLY2 = BALLY + BALLH
        const BALLX2 = BALLX+ BALLW
        const VY = 0// this.ball.vx
        const VX = 0// this.ball.vy

        const PLAY1X = this.player1.x
        const PLAY1Y = this.player1.y
        const PLAY1X2 = PLAY1X + PLAY1W
        const PLAY1Y2 = PLAY1Y + PLAY1H

        const PLAY2X = this.player2.x
        const PLAY2Y = this.player2.y
        const PLAY2X2 = PLAY2X + PLAY2W
        const PLAY2Y2 = PLAY2Y + PLAY2H

        //Math.round((Math.random()*2)*10)/10+1

        //SIMPLER
        
        //FRONT BOUNCE
        //PLAYER 1
        if((BALLY+VY>=PLAY1Y)&&(BALLY+VY<=PLAY1Y2) && (BALLX2+VX<=PLAY1X2) && (BALLX2+VX>=PLAY1X)){
            this.ball.vx*=-1*power
        }
        //Player 2
        if((BALLY+VY>=PLAY2Y)&&(BALLY+VY<=PLAY2Y2) && (BALLX+VX<=PLAY2X2) && (BALLX+VX>=PLAY2X)){
            this.ball.vx*=-1*power
        }
        /*
        //BACK BOUNCE
        //PLAYER 1
        if((BALLY+VY>=PLAY1Y)&&(BALLY+VY<=PLAY1Y2) && (BALLX+VX<=PLAY1X2) && (BALLX+VX>=PLAY1X)){
            this.ball.vx*=-1*power
        }
        //Player 2
        if((BALLY+VY>=PLAY2Y)&&(BALLY+VY<=PLAY2Y2) && (BALLX2+VX<=PLAY2X2) && (BALLX2+VX>=PLAY2X)){
            this.ball.vx*=-1*power
        }

        
        
        //TOP BOUNCE
        //PLAYER 1
        if((BALLY2+VY>=PLAY1Y) && (BALLY2+VY<=PLAY1Y2) && ((BALLX+VX>=PLAY1X && BALLX+VX<=PLAY1X2)||(BALLX2+VX>=PLAY1X && BALLX2+VX<=PLAY1X2))){
            this.ball.vy*=-1*power
        }
        //PLAYER 2
        if((BALLY2+VY>=PLAY2Y) && (BALLY2+VY<=PLAY2Y2) && ((BALLX+VX>=PLAY2X && BALLX+VX<=PLAY2X2)||(BALLX2+VX>=PLAY2X && BALLX2+VX<=PLAY2X2))){
            this.ball.vy*=-1*power
        }
        
        //BOTTOM BOUNCE
        //PLAYER 1
        if((BALLY+VY<=PLAY1Y2) && (BALLY+VY>=PLAY1Y) && ((BALLX+VX>=PLAY1X && BALLX+VX<=PLAY1X2)||(BALLX2+VX>=PLAY1X && BALLX2+VX<=PLAY1X2))){
            this.ball.vy*=-1*power
        }
        //PLAYER 2
        if((BALLY+VY<=PLAY2Y2) && (BALLY+VY>=PLAY2Y) && ((BALLX+VX>=PLAY2X && BALLX+VX<=PLAY2X2)||(BALLX2+VX>=PLAY2X && BALLX2+VX<=PLAY2X2))){
            this.ball.vy*=-1*power
        }
        
        */
    
    }

    movingObjects(timestamp){
        if(!this.goalScored){
            window.requestAnimationFrame(timestamp => {
                this.movingObjects(timestamp)
                this.collision(1);
            })
            if(this.timer < (timestamp-this.speed)){
                this.timer = timestamp;
                this.updateBall()
                this.score();
            }
            if(this.timer2 < (timestamp-this.speed2)){
                this.timer2 = timestamp;
                if(Math.round(Math.random()+1)===1){
                    console.log("acelera x")
                    this.ball.vx*=1.15;
                }else{
                    console.log("acelera y")
                    this.ball.vy*=1.15;
                }

            }
        }else{
            console.log(this.score1, this.score2)
        }
    }

    updateBall(){
        //console.dir(this.context)
        const TL = 75
        const DL = this.$canvas.height-52
        const LL1 = 92
        const LL2 = 70
        const RL1 = this.$canvas.width-86
        const RL2 = this.$canvas.width-66
        const SG = 181
        const EG = 277
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.ball.startX += this.ball.vx
        this.ball.startY += this.ball.vy
        //Condition for top and bottom bounce
        if((this.ball.startY+this.ball.BALLH)>=DL || this.ball.startY<=TL){
            this.ball.vy*=-1
        }
        if( //Condition for left bounce;
            ((this.ball.startY>=TL && (this.ball.startY+(this.ball.BALLH*0.5))<SG && this.ball.startX<LL1)
            ||
            (this.ball.startY+this.ball.BALLH<=DL && (this.ball.startY+(this.ball.BALLH*0.5))>EG && this.ball.startX<LL2))
            || //Condition for right bounce
            ((this.ball.startY>=TL && (this.ball.startY+(this.ball.BALLH*0.5))<SG && this.ball.startX+this.ball.BALLW>=RL1)
            ||
            (this.ball.startY+this.ball.BALLH<=DL && (this.ball.startY+(this.ball.BALLH*0.5))>EG && this.ball.startX+this.ball.BALLW>=RL2))
        ){
            this.ball.vx*=-1
        }
        this.background.drawBackground();
        this.background.drawScoreboard();
        this.ball.drawBall();
        this.drawPlayers();
    }

    drawPlayers(){
        this.player1.drawPlayer();
        this.player2.drawPlayer();
    }

    score(){
        const TL = 68
        const DL = this.$canvas.height-50-23.75
        const LL1 = 92
        const LL2 = 70
        const RL1 = this.$canvas.width-86
        const RL2 = this.$canvas.width-66
        const SG = 181
        const EG = 277
        //Score for player1: ball should get into left goal.
        if(
        ((this.ball.startY+(this.ball.BALLH*0.5)>=SG && (this.ball.startX+this.ball.BALLW*1.5)<=LL1)
        ||
        (this.ball.startY+(this.ball.BALLH*0.5))<=EG && (this.ball.startX+this.ball.BALLW*1.5)<=LL2)
        ){
            console.log("Player2 scores!")
            this.goalSound.play()
            this.score2+=1
            this.ball.vx = 0;
            this.ball.vy = 0;
            this.background.score2 = this.score2;
            this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
            this.background.drawBackground();
            this.ball.drawBall();
            this.drawPlayers();
            this.background.drawScoreboard()
            this.background.drawGoal();
            this.goalScored = true;
        }
        //Score for player2: ball should get into right goal.
        if(
            ((this.ball.startY+(this.ball.BALLH*0.5)>=SG && (this.ball.startX)>=RL1+this.ball.BALLW)
            ||
            (this.ball.startY+(this.ball.BALLH*0.5))<=EG && (this.ball.startX)>=RL2+this.ball.BALLW)
            ){
                console.log("Player1 scores!")
                this.goalSound.play()
                this.score1+=1
                this.ball.vx = 0;
                this.ball.vy = 0;
                this.background.score1 = this.score1;
                this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
                this.background.drawBackground();
                this.ball.drawBall();
                this.drawPlayers();
                this.background.drawScoreboard()
                this.background.drawGoal();
                this.goalScored = true;
        }
    }

}
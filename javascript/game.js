class Game{
    constructor($canvas){
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext('2d');
        this.background = new Background (this);
        this.ball = new Ball (this);
        //this.player1 = new Player (this, 0,0,'r')
        //this.player2 = new Player(this,0,0,'l')
        this.player2 = new Player (this,'r')
        this.player1 = new Player(this,'l')
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
        this.player1.resetPosition();
        this.player2.resetPosition();
        this.drawPlayers();
        this.movingObjects(0);
        this.globalSound.play();
        this.score1 = 0;
        this.score2 = 0;
    }

    reset(){
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.player1.resetPosition();
        this.player2.resetPosition();
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
                this.player2.direction = 'left'
                this.player2.moveLeft();
                break;
            case "right":
                this.player2.direction = 'right'
                this.player2.moveRight();
                break;
            case "up":
                this.player2.direction = 'up'
                this.player2.moveUp();
                break;
            case "down":
                this.player2.direction = 'down'
                this.player2.moveDown();
                break;
        }
    }

    movePlayer1(key){
        switch (key){
            case "left":
                this.player1.direction = 'left'
                this.player1.moveLeft();
                break;
            case "right":
                this.player1.direction = 'right'
                this.player1.moveRight();
                break;
            case "up":
                this.player1.direction = 'up'
                this.player1.moveUp();
                break;
            case "down":
                this.player1.direction = 'down'
                this.player1.moveDown();
                break;
        }
    }

    collision (power){
        // const COEFSEGX = 7;
        // const COEFSEGY = 7;

        const PLAY1W = this.player1.PLAYW//*COEFSEGX;
        const PLAY1H = this.player1.PLAYH//*COEFSEGY;
        const PLAY2W = this.player2.PLAYW//*COEFSEGX;
        const PLAY2H = this.player2.PLAYH//*COEFSEGY;
        const BALLW = this.ball.BALLW//*COEFSEGX;
        const BALLH = this.ball.BALLH//*COEFSEGY;


        const BALLY = this.ball.startY
        const BALLX = this.ball.startX
        const BALLY2 = BALLY + BALLH
        const BALLX2 = BALLX+ BALLW
        const VX = this.ball.vx
        const VY = this.ball.vy

        const PLAY1X = this.player1.x
        const PLAY1Y = this.player1.y
        const PLAY1X2 = PLAY1X + PLAY1W
        const PLAY1Y2 = PLAY1Y + PLAY1H

        const PLAY2X = this.player2.x
        const PLAY2Y = this.player2.y
        const PLAY2X2 = PLAY2X + PLAY2W
        const PLAY2Y2 = PLAY2Y + PLAY2H

        const D1 = Math.sqrt((this.player1.PCX - (this.ball.BCX+this.ball.vx))**2+(this.player1.PCY - (this.ball.BCY+this.ball.vy))**2)
        const R1 = this.player1.RADIUS + this.ball.RADIUS
        const D2 = Math.sqrt((this.player2.PCX - (this.ball.BCX+this.ball.vx))**2+(this.player2.PCY - (this.ball.BCY+this.ball.vy))**2)
        const R2 = this.player2.RADIUS + this.ball.RADIUS

        //NEW COLLISION METHOD: CIRCLES;
        //PLAYER 1
        if(D1<=R1){
            // console.log("colision P1!")
            if((BALLY+VY>=PLAY1Y) && (BALLY2+VY<=PLAY1Y2)){
                console.log("colosigion frente/dorso P1")
                this.ball.vx*=-1*power
            }else{
                this.ball.vx*=-1*power
                this.ball.vy*=-1*power
            }
        }
        if (D2<=R2){
            if((BALLY+VY>=PLAY2Y) && (BALLY2+VY<=PLAY2Y2)){
                console.log("colosigion frente/dorso P2")
                this.ball.vx*=-1*power
            }else{
                this.ball.vx*=-1*power
                this.ball.vy*=-1*power
            // console.log("colision P2!")
            }
        }



        
        /*
        //Math.round((Math.random()*2)*10)/10+1

        //TRY ONE MORE TIME
        //COLOSION FRONTAL AMBOS JUGADORES
        //PARTE DE ARRIBA PELOTA ENTRE MAXIMO Y MINIMO DE LOS JUGADORES; JUGADOR1 X + WIDTH = PELOTA X; JUGADOR 2X = PELOTA X+ WIDTH
        if(
        (BALLY+VY>=PLAY1Y-COEFSEGY && BALLY+VY<=PLAY1Y2+COEFSEGY && BALLX+VX>=PLAY1X2 && BALLX+VX<=PLAY1X2+COEFSEGX) || ((BALLY2+VY>=PLAY1Y-COEFSEGY && BALLY2+VY<=PLAY1Y2+COEFSEGY) && BALLX+VX>=PLAY1X2 && BALLX+VX<=PLAY1X2+COEFSEGX)
        ){
            this.ball.vx*=(-1*power);
            //console.log("pega adelante jugador 1")
        }
        if(
        (BALLY+VY>=PLAY2Y-COEFSEGY && BALLY+VY<=PLAY2Y2+COEFSEGY && BALLX2+VX<=PLAY2X && BALLX2+VX>=PLAY2X-COEFSEGX) || ((BALLY2+VY>=PLAY2Y-COEFSEGY && BALLY2+VY<=PLAY2Y2+COEFSEGY) && BALLX2+VX<=PLAY2X && BALLX2+VX>=PLAY2X-COEFSEGX)
        ){
            this.ball.vx*=(-1*power);
            //console.log("pega adelante jugador 2")
        }
        //COLISION TRASERA AMBOS JUGADORES
        if(
        (BALLY+VY>=PLAY1Y-COEFSEGY && BALLY+VY<=PLAY1Y2+COEFSEGY && BALLX2+VX<=PLAY1X && BALLX2+VX>=PLAY1X-COEFSEGX) || ((BALLY2+VY>=PLAY1Y-COEFSEGY && BALLY2+VY<=PLAY1Y2+COEFSEGY) && BALLX2+VX<=PLAY1X && BALLX2+VX>=PLAY1X-COEFSEGX)
        ){
            this.ball.vx*=(-1*power);
            //console.log("pega atras jugador 1")
        }
        if(
        (BALLY+VY>=PLAY2Y-COEFSEGY && BALLY+VY<=PLAY2Y2+COEFSEGY && BALLX+VX>=PLAY2X2 && BALLX+VX<=PLAY2X2+COEFSEGX) || ((BALLY2+VY>=PLAY2Y-COEFSEGY && BALLY2+VY<=PLAY2Y2+COEFSEGY) && BALLX+VX>=PLAY2X2 && BALLX+VX<=PLAY2X2+COEFSEGX)
        ){
            this.ball.vx*=(-1*power);
            //console.log("pega atras jugador 2")
        }

        //COLISION ARRIBA AMBOS JUGADORES
        if(
        ((BALLX+VX>=PLAY1X && BALLX+VX<=PLAY1X2 && BALLY2+VY>=PLAY1Y && BALLY2+VY<=PLAY1Y+COEFSEGY) || (BALLX2+VX>=PLAY1X && BALLX2+VX<=PLAY1X2 && BALLY2+VY>=PLAY1Y && BALLY2+VY<=PLAY1Y+COEFSEGY))
        ){
            this.ball.vy*=(-1*power);
            //console.log("pega arriba jugador 1")
        }
        if(
        ((BALLX+VX>=PLAY2X && BALLX+VX<=PLAY2X2 && BALLY2+VY>=PLAY2Y && BALLY2+VY<=PLAY2Y+COEFSEGY) || (BALLX2+VX>=PLAY2X && BALLX2+VX<=PLAY2X2 && BALLY2+VY>=PLAY2Y && BALLY2+VY<=PLAY2Y+COEFSEGY))
        ){
            this.ball.vy*=(-1*power);
            //console.log("pega arriba jugador 2")
        }
        //COLISION ABAJO AMBOS JUGADORES
        if(
        ((BALLX+VX>=PLAY1X-COEFSEGX && BALLX+VX<=PLAY1X2+COEFSEGX && BALLY+VY<=PLAY1Y2 && BALLY+VY>=PLAY1Y2-COEFSEGY) || (BALLX2+VX>=PLAY1X-COEFSEGX && BALLX2+VX<=PLAY1X2+COEFSEGX && BALLY+VY>=PLAY1Y2 && BALLY+VY<=PLAY1Y2-COEFSEGY))
        ){
            this.ball.vy*=(-1*power);
            //console.log("pega abajo jugador 1")
        }
        if(
        ((BALLX+VX>=PLAY2X-COEFSEGX && BALLX+VX<=PLAY2X2+COEFSEGX && BALLY+VY<=PLAY2Y2 && BALLY+VY>=PLAY2Y2-COEFSEGY) || (BALLX2+VX>=PLAY2X-COEFSEGX && BALLX2+VX<=PLAY2X2+COEFSEGX && BALLY+VY>=PLAY2Y2 && BALLY+VY<=PLAY2Y2-COEFSEGY))
        ){
            this.ball.vy*=(-1*power);
            //console.log("pega abajo jugador 2")
        }


        
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
        window.requestAnimationFrame(timestamp => {
            this.movingObjects(timestamp)
            //this.keyPressed.setReleaseKeys2();
        })
        if(!this.goalScored){
            this.player2.runningMotion(timestamp,this.player2.direction);
            this.player1.runningMotion(timestamp,this.player1.direction)
            this.collision(1);
            if(this.timer < (timestamp-this.speed)){
                this.updateBall()
                this.timer = timestamp;
                this.drawEverything()
                this.score();
            }
            if(this.timer2 < (timestamp-this.speed2)){
                this.timer2 = timestamp;
                if(Math.round(Math.random()+1)===1 ){
                    //console.log("acelera x")
                    this.ball.vx*=1.15;
                }else{
                    //console.log("acelera y")
                    this.ball.vy*=1.15;
                }

            }
            
        }else{
            if(this.player1.scored && this.score1 === 5){
                this.player1.celeberationMotion(timestamp);
                this.player2.otherTeamGoal();
                this.drawEverything()
                this.background.drawWinner(this.player1.side)
            }else if(this.player1.scored){
                this.player1.celeberationMotion(timestamp);
                this.player2.otherTeamGoal();
                this.drawEverything()
                this.background.drawGoal();
            }
            if(this.player2.scored && this.score2 === 5){
                this.player2.celeberationMotion(timestamp);
                this.player1.otherTeamGoal();
                this.drawEverything()
                this.background.drawWinner(this.player2.side)
            } else if(this.player2.scored){
                this.player2.celeberationMotion(timestamp);
                this.player1.otherTeamGoal();
                this.drawEverything()
                this.background.drawGoal();
            }
        }
    }

    drawEverything(){
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.background.drawBackground();
        this.background.drawScoreboard();
        this.ball.drawBall();
        this.drawPlayers();
    }

    updateBall(){
        //console.dir(this.context)
        const TL = 76
        const DL = this.$canvas.height-54
        const LL1 = 92
        const LL2 = 70
        const RL1 = this.$canvas.width-86
        const RL2 = this.$canvas.width-66
        const SG = 181
        const EG = 277
        this.ball.startX += this.ball.vx
        this.ball.startY += this.ball.vy
        //Condition for top and bottom bounce
        if((this.ball.BCY+this.ball.RADIUS+this.ball.vy>=DL) || (this.ball.BCY-this.ball.RADIUS+this.ball.vy<=TL)){
            console.log("ei, deberia rebotar...")
            this.ball.vy*=-1
        }
        if(
            //Condition for left bounce
            (this.ball.BCY-this.ball.RADIUS+this.ball.vy>=TL && this.ball.BCY+this.ball.vy<SG && this.ball.BCX-this.ball.RADIUS+this.ball.vx<=LL1)
            ||
            (this.ball.BCY+this.ball.vy>EG && this.ball.BCY+this.ball.RADIUS+this.ball.vy<=DL && this.ball.BCX-this.ball.RADIUS+this.ball.vx<=LL2)
            ||//Condition for right bounce
            (this.ball.BCY-this.ball.RADIUS+this.ball.vy>=TL && this.ball.BCY+this.ball.vy<SG && this.ball.BCX+this.ball.RADIUS+this.ball.vx>=RL1)
            ||
            (this.ball.BCY+this.ball.vy>EG && this.ball.BCY+this.ball.RADIUS+this.ball.vy<=DL && this.ball.BCX+this.ball.RADIUS+this.ball.vx>=RL2)
            ){
                this.ball.vx*=-1
            }
        /*
        if((this.ball.startY+this.ball.BALLH)>=DL || this.ball.startY<=TL){
            this.ball.vy*=-1
        }
        */
        /*
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
        */
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
        //Score for player2: ball should get into left goal.
        if(
        ((this.ball.startY+(this.ball.BALLH*0.5)>=SG && (this.ball.startX+this.ball.BALLW*1.5)<=LL1)
        ||
        (this.ball.startY+(this.ball.BALLH*0.5))<=EG && (this.ball.startX+this.ball.BALLW*1.5)<=LL2)
        ){
            //console.log("Player2 scores!")
                this.goalSound.play()
                this.score2+=1
                this.ball.vx = 0;
                this.ball.vy = 0;
                this.background.score2 = this.score2;
                this.goalScored = true;
                this.player2.scored = true;
            }
        //Score for player1: ball should get into right goal.
        if(
            ((this.ball.startY+(this.ball.BALLH*0.5)>=SG && (this.ball.startX)>=RL1+this.ball.BALLW)
            ||
            (this.ball.startY+(this.ball.BALLH*0.5))<=EG && (this.ball.startX)>=RL2+this.ball.BALLW)
            ){
                this.goalSound.play()
                this.score1+=1
                this.ball.vx = 0;
                this.ball.vy = 0;
                this.background.score1 = this.score1;
                this.goalScored = true;
                this.player1.scored = true;
        }
    }

}
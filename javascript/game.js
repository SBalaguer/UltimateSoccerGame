class Game{
    constructor($canvas){
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext('2d');
        this.background = new Background (this);
        this.ball = new Ball (this);
        this.obstacles = new Obstacles (this);
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
        this.obstacleSpeed = 7000;
        this.obstacleTimer = 0;
        this.score1 = 0;
        this.score2 = 0;
        this.goalScored = false;
        this.globalSound = new Audio();
        this.globalSound.src = "./SFX/MainAudio-cut.wav"
        //this.globalSound.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/sfx/MainAudio-cut.wav"
        this.globalSound.volume = 0.2
        this.globalSound.loop = true;
        this.gameMusic = new Audio();
        this.gameMusic.src = "./SFX/game-music.wav"
        this.gameMusic.volume = 0.6
        this.gameMusic.loop = true;
        this.goalSound = new Audio();
        this.goalSound.src = "./SFX/goal.wav"
        //this.goalSound.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/sfx/goal.wav"
        this.goalSound.volume = 0.8
        this.whistle = new Audio();
        this.whistle.src = "./SFX/whistle.wav"
        this.goalSound.volume = 0.8
        this.kickSound = new Audio();
        this.kickSound.src = "./SFX/kick.wav"
        this.kickSound.volume = 0.8
        this.minAngle = 1.4;
        this.maxAngle = 0.8;
        this.gameAccelX = 1.15;
        this.gameAccelY = 1.05;
        this.gameStatus = true
        this.boton = document.getElementById("boton-inicial")
        this.request = undefined;
    }
    

    startGame(){
        console.log("im running reset")
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.whistle.play();
        this.player1.resetPosition();
        this.player2.resetPosition();
        this.ball.startX = this.$canvas.width/2-8
        this.ball.startY = this.$canvas.height/2-14
        this.ball.vx = 5
        this.ball.vy = 3
        this.goalScored = false;
        this.speed = 1;
        this.background.drawBackground();
        this.background.drawScoreboard();
        this.ball.drawBall();
        this.drawPlayers();
        this.movingObjects(0);
        this.obstacles.obstacleEffect = false;
        this.obstacles.obstacleExists = false;
        setTimeout(()=>{
            this.gameMusic.play();
        },500)
        this.gameStatus = true;
    }

    drawEverything(){
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.background.drawBackground();
        this.background.drawScoreboard();
        this.ball.drawBall();
        this.drawPlayers();
        if (this.obstacles.obstacleExists && !this.obstacles.obstacleEffect){
            this.obstacles.drawObstacle()
        }
        this.background.drawArcos();
    }

    
    reset(){
        console.log("im running reset")
        this.gameStatus = true;
        this.score1 = 0
        this.score2 = 0;
        this.background.score1 = this.score1
        this.background.score2 = this.score2
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.player1.resetPosition();
        this.player2.resetPosition();
        this.ball.startX = this.$canvas.width/2-8
        this.ball.startY = this.$canvas.height/2-14
        this.drawEverything();
    }

    movingObjects(timestamp){
        //console.log("moving Objects is working")
        if(this.gameStatus){
            this.request=window.requestAnimationFrame(timestamp => {
                this.movingObjects(timestamp)
            })
            //this.keyPressed.setReleaseKeys2();
            if(!this.goalScored){
                if(this.timer < (timestamp-this.speed)){
                    this.player2.runningMotion(timestamp,this.player2.direction);
                    this.player1.runningMotion(timestamp,this.player1.direction)
                    this.checkBallCollision(); //checks collision against walls
                    this.collision(1); //checks collision agains players
                    this.updateBall() // 
                    this.score(); //checks if there was a goal
                    this.collisionObstacles();    
                    this.timer = timestamp;
                    this.resetCollisionObstacles();
                    this.obstacles.obstacleMove();
                    this.drawEverything()
                }
                if(this.timer2 < (timestamp-this.speed2)){
                    this.timer2 = timestamp;

                    if(Math.round(Math.random()+1)===1 ){
                        this.ball.vx*=this.gameAccelX;
                    }else{
                        this.ball.vy*=this.gameAccelY;
                    }
                if(this.obstacles.obstacleEffect){
                    this.obstacleTimer = timestamp;
                }
                if(this.obstacleTimer < (timestamp-this.obstacleSpeed) && !this.obstacles.obstacleEffect && !this.obstacles.obstacleExists){
                    this.obstacleTimer = timestamp;
                    this.obstacles.obstacleCreation(this.obstacles.obstacleExists, this.obstacles.obstacleEffect);
                    this.player1.playerKicked = false;
                    this.player1.playerKicked = false;
                    this.obstacles.obstacleExists = true;
                }
                }
                
            }else{
                if(this.player1.scored && this.score1 === 5){
                    this.player1.celeberationMotion(timestamp);
                    this.player2.otherTeamGoal();
                    this.drawEverything()
                    this.background.drawWinner(this.player1.side)
                    setTimeout(()=>{
                        this.gameStatus = false;
                        this.gameEnd();
                    },2000)
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
                    setTimeout(()=>{
                        this.gameStatus = false;
                        this.gameEnd();
                    },2000)
                } else if(this.player2.scored){
                    this.player2.celeberationMotion(timestamp);
                    this.player1.otherTeamGoal();
                    this.drawEverything()
                    this.background.drawGoal();
                }
                this.timer = timestamp;
                this.timer2 = timestamp;
                this.obstacleTimer = timestamp;
                this.obstacles.obstacleExists = false;
            }
        }else{

            cancelAnimationFrame(this.request);
    }

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
        const COEFSEG = 10

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
        const R1 = this.player1.RADIUS + this.ball.RADIUS + COEFSEG
        const D2 = Math.sqrt((this.player2.PCX - (this.ball.BCX+this.ball.vx))**2+(this.player2.PCY - (this.ball.BCY+this.ball.vy))**2)
        const R2 = this.player2.RADIUS + this.ball.RADIUS + COEFSEG

        //NEW COLLISION METHOD: CIRCLES;
        //PLAYER 1
        if(D1<=R1){
            // console.log("colision P1!")
            if((BALLY+VY>=PLAY1Y) && (BALLY2+VY<=PLAY1Y2)){
                //console.log("colosigion frente/dorso P1")
                this.ball.vx*=-1*power
            }else{
                this.ball.vx*=-1*power
                this.ball.vy*=-1*power
            }
            this.player1.playerKicked = true;
            this.player2.playerKicked = false;
            this.player1.kickCount+=1
            this.kickSound.play()
            //console.log(this.player1.playerKicked, this.player1.kickCount)
        }
        if (D2<=R2){
            if((BALLY+VY>=PLAY2Y) && (BALLY2+VY<=PLAY2Y2)){
                //console.log("colosigion frente/dorso P2")
                this.ball.vx*=-1*power
            }else{
                this.ball.vx*=-1*power
                this.ball.vy*=-1*power
            // console.log("colision P2!")
            }
            this.player2.playerKicked = true;
            this.player1.playerKicked = false;
            this.player2.kickCount+=1
            this.kickSound.play()
            //console.log(this.player2.playerKicked, this.player2.kickCount)
        }

    
    }

    updateBall(){
        this.ball.startX += this.ball.vx
        this.ball.startY += this.ball.vy
    }

    checkBallCollision(){
        //console.dir(this.context)
        const TL = 76
        const DL = this.$canvas.height-54
        const LL1 = 92
        const LL2 = 70
        const RL1 = this.$canvas.width-86
        const RL2 = this.$canvas.width-66
        const SG = 181
        const EG = 277
        //Condition for top and bottom bounce
        if((this.ball.BCY+this.ball.RADIUS+this.ball.vy>=DL) || (this.ball.BCY-this.ball.RADIUS+this.ball.vy<=TL)){
            //console.log("ei, deberia rebotar...")
            this.ball.vy*=-1
        }
        if(
            //Condition for left bounce
            (this.ball.BCY-this.ball.RADIUS+this.ball.vy>=TL && this.ball.BCY+this.ball.vy<SG && this.ball.BCX-this.ball.RADIUS+this.ball.vx<=LL1)
            ||
            (this.ball.BCY+this.ball.vy>EG && this.ball.BCY+this.ball.RADIUS+this.ball.vy<=DL && this.ball.BCX-this.ball.RADIUS+this.ball.vx<=LL2)
        ){
            this.ball.vx*=-1
            this.player2.playerKicked = false;
        } 
        if(
            //Condition for right bounce
            (this.ball.BCY-this.ball.RADIUS+this.ball.vy>=TL && this.ball.BCY+this.ball.vy<SG && this.ball.BCX+this.ball.RADIUS+this.ball.vx>=RL1)
            ||
            (this.ball.BCY+this.ball.vy>EG && this.ball.BCY+this.ball.RADIUS+this.ball.vy<=DL && this.ball.BCX+this.ball.RADIUS+this.ball.vx>=RL2)
            ){
                this.ball.vx*=-1
                this.player1.playerKicked = false;
            }

    }
    
    score(){
        const TL = 76
        const DL = this.$canvas.height-54
        const LL1 = 92
        const LL2 = 70
        const RL1 = this.$canvas.width-86
        const RL2 = this.$canvas.width-66
        const SG = 181
        const EG = 277
        const GS = 30
        if( 
            //Player 2 Scores
            (this.ball.BCY+this.ball.vy>=SG && this.ball.BCY+this.ball.vy<=EG && this.ball.BCX+this.ball.RADIUS-this.ball.vx<=LL1)
            ||
            (this.ball.BCY+this.ball.vy>=SG && this.ball.BCY+this.ball.vy<=EG && this.ball.BCX+this.ball.RADIUS-this.ball.vx<=LL2)
            ){
                this.goalSound.play()
                this.score2+=1
                this.ball.vx = 0;
                this.ball.vy = 0;
                this.background.score2 = this.score2;
                this.goalScored = true;
                this.player2.scored = true;
            }
        if(
            //Player 1 Scores;
            (this.ball.BCY+this.ball.vy>=SG && this.ball.BCY+this.ball.vy<=EG && this.ball.BCX-this.ball.RADIUS+this.ball.vx>=RL1+GS)
            ||
            (this.ball.BCY+this.ball.vy>=SG && this.ball.BCY+this.ball.vy<=EG && this.ball.BCX-this.ball.RADIUS+this.ball.vx>=RL2+GS)  
        ){
            this.goalSound.play()
            this.score1+=1
            this.ball.vx = 0;
            this.ball.vy = 0;
            this.background.score1 = this.score1;
            this.goalScored = true;
            this.player1.scored = true;
        }

        /*
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
        */
    }

    drawPlayers(){
        this.player1.drawPlayer();
        this.player2.drawPlayer();
    }

    collisionObstacles(){
        const D = Math.sqrt((this.obstacles.x - (this.ball.BCX+this.ball.vx))**2+(this.obstacles.y - (this.ball.BCY+this.ball.vy))**2)
        const R = this.obstacles.radius + this.ball.RADIUS

        if(D<=R && this.obstacles.obstacleExists){
            if (this.ball.vx>0 && this.player1.playerKicked){
                //console.log("ball colided with obstacle kicked by player 1")
                this.obstacles.obstacleExists = false;
                this.obstacles.obstacleEffect = true;
                this.player1.PLAYH *= this.obstacles.currentObstacle[0]
                this.player1.PLAYW *= this.obstacles.currentObstacle[0]
                this.player1.kickCount = 0
                this.player2.kickCount = 0
            } else if(this.ball.vx<0 && this.player2.playerKicked){
                //console.log("ball colided with obstacle kicked by player 2")
                this.obstacles.obstacleExists = false;
                this.obstacles.obstacleEffect = true;
                this.player2.PLAYH *= this.obstacles.currentObstacle[0]
                this.player2.PLAYW *= this.obstacles.currentObstacle[0]
                this.player1.kickCount = 0
                this.player2.kickCount = 0
            }
        }
    }
    resetCollisionObstacles(){

        if(this.player1.kickCount+this.player2.kickCount>= 6){
            this.player1.PLAYH = 53
            this.player2.PLAYH = 53
            this.player1.PLAYW = 30
            this.player2.PLAYW = 30
            this.obstacles.obstacleEffect = false;
        }
        //console.log(this.obstacles.obstacleEffect)
        }

    gameEnd (){
        this.boton.classList.remove("restart")
        this.boton.classList.add("start-game")
        this.boton.innerText = "Play again!"
    }

}
class Background{
    constructor (game){
        this.canvasWidth = game.$canvas.width;
        this.canvasHeight = game.$canvas.height;
        this.col = this.canvasWidth / 100;
        this.row = this.canvasHeight / 100;
        this.image = new Image ();
        this.image.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/sprite-inicial.png"
        this.score1 = 0
        this.score2 = 0
    }
    

    drawScoreboard(){
        game.context.font="16px monospace"
        game.context.fillStyle="#3683D1"
        game.context.fillText("PLAYER1", 40, 30);
        game.context.fillStyle="#FFF"
        game.context.fillText(`0${this.score1}`, 115, 30);
        game.context.fillStyle="#3683D1"
        game.context.fillText("TIME", 145, 30);
        game.context.fillStyle="#FFF"
        game.context.fillText("00:00", 190, 30);
        game.context.fillStyle="#3683D1"
        game.context.fillText("PLAYER2", 250, 30);
        game.context.fillStyle="#FFF"
        game.context.fillText(`0${this.score2}`, 325, 30);
        //game.context.fillText("PLAYER 2", 150, 30);
        game.context.font="18px monospace"
        game.context.fillStyle="#FFF"
        game.context.fillText("ESTADIO NUEVO GASOMETRO", 750, 30);
    }

    drawBackground(){
        //console.log('el click llega hasta aca')
        //const SCOREBOARD = 3/32
        //const TW = this.canvasWidth;
        //const TH = this.canvasHeight;
        game.context.fillStyle= "#6D3F1E"
        game.context.fillRect(0,0,1018,55)
        game.context.drawImage(this.image,16,509,509,208,0,55, 1018, 416)
        game.context.drawImage(this.image,429,156,114,8,1018-114,55+416-8, 114, 8)



        
        /*
        //Check each corner.
        game.context.fillStyle= "#FFF"
        //First corner (up-left)
        game.context.fillRect(98,72,20,20)
        //Second corner(up-right)
        game.context.fillRect(TW-88,72,20,20)
        //Third corner(down-right)
        game.context.fillRect(TW-58,TH-50,20,20)
        //Forth corner(down-left)
        game.context.fillRect(67,TH-50,20,20)
        */


        
        /*
        const FANS = 3/32
        const SEP = 1/32
        const TW = this.canvasWidth;
        const TH = this.canvasHeight;
        const FH = TH *(1-(2*FANS + 2*SEP))
        const y0 = (FANS+SEP)*TH
        const COL = this.col;
        const ROW = this.row;

        console.log(this.canvasHeight, this.canvasWidth);
        //first fans
        game.context.fillStyle = "#28464B"
        game.context.fillRect(0,0, TW, TH*FANS);
        //pitch
        game.context.fillStyle = "#68A754"
        game.context.fillRect(0,TH*(FANS+SEP), TW, TH*(1-(2*FANS+2*SEP)))
        //pitch stripes
        game.context.fillStyle = "#005B27"
        for(let i=0; i<TW;i+=(8.7*COL)){
            game.context.fillRect(i,TH*(FANS+SEP), 4.35*COL, TH*(1-(2*FANS+2*SEP)))  
        }
        //second fans
        game.context.fillStyle = "#6B6D76"
        game.context.fillRect(0,TH*(1-FANS), TW, TH*FANS)

        //pitch delimitations

        game.context.strokeStyle = "#FFF"
        game.context.lineWidth = 3
        game.context.beginPath();
        //miedfild
        game.context.moveTo(TW/2, TH*(FANS+SEP));
        game.context.lineTo(TW/2, TH*(1-FANS-SEP));
        //local area
        game.context.moveTo(0, y0+0.276*FH);
        game.context.lineTo(0.183*FH, y0+0.276*FH);
        game.context.lineTo(0.183*FH, y0+0.724*FH);
        game.context.lineTo(0, y0+0.724*FH);
        //visit area
        game.context.moveTo(TW, y0+0.276*FH);
        game.context.lineTo(TW-0.183*FH, y0+0.276*FH);
        game.context.lineTo(TW-0.183*FH, y0+0.724*FH);
        game.context.lineTo(TW, y0+0.724*FH);
        //

        game.context.stroke();

        
        
        //game.context.fillStyle = "green";
        //game.context.fillRect(0,0, 500, 500);
        */
        
    }
}
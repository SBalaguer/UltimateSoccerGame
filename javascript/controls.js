class Controls {
    constructor (game){
        this.game = game;
    }

    setBindingKeys2(){
        window.addEventListener('keydown', (event) => {
            let key;
            // React based on the key pressed
            switch (event.keyCode) {
                case 38:
                    //console.log('up')
                    key = 'up'
                    break;
                case 37:
                    //console.log('left')
                    key = 'left'
                    break;
                case 39:
                    //console.log('right')
                    key = 'right'
                    break;
                case 40:
                    //console.log('down')
                    key = 'down'
                    break;
            }
            if (key){
                // Stop the default behavior (moving the screen to the left/up/right/down)
                event.preventDefault();
                this.game.movePlayer2(key);
            }
        });    
    }

    setBindingKeys1(){
        window.addEventListener('keydown', (event) => {
            let key;
            // React based on the key pressed
            switch (event.keyCode) {
                case 87:
                    //console.log('up')
                    key = 'up'
                    break;
                case 65:
                    //console.log('left')
                    key = 'left'
                    break;
                case 68:
                    //console.log('right')
                    key = 'right'
                    break;
                case 83:
                    //console.log('down')
                    key = 'down'
                    break;
            }
            if (key){
                // Stop the default behavior (moving the screen to the left/up/right/down)
                event.preventDefault();
                this.game.movePlayer1(key);
            }
        });    
    }

    /*setReleaseKeys2(){
        window.addEventListener('keyup', (event) => {
            let key;
            // React based on the key pressed
            switch (event.keyCode) {
                case 38:
                    console.log('solte up')
                    // key = 'up'
                    break;
                case 37:
                    console.log('solte left')
                    // key = 'left'
                    break;
                case 39:
                   console.log('solte right')
                    // key = 'right'
                    break;
                case 40:
                   console.log('solte down')
                    // key = 'down'
                    break;
            }
            // if (key){
                // Stop the default behavior (moving the screen to the left/up/right/down)
                // event.preventDefault();
                // this.game.movePlayer2(key);
            // }
        });    
    }
    */



}

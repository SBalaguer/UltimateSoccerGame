const $canvas = document.querySelector("canvas")
const context = $canvas.getContext('2d')

const sprite = new Image()
sprite.src = "file:///Users/santiagoebalaguer/ironhack/projects/game-project/images/sprite-inicial.png"
const arrImg = [[217,263],[4,3],[217,3],[430,3],[643,3],[4,133],[217,133]]
let i = 0

sprite.addEventListener('load', () =>{
    //context.drawImage(sprite, 4, 3, 207, 128,0,0, 207*1.3, 128*1.3)
    setInterval(function(){
        if(i === 7){
            i=0
        }else{
            context.drawImage(sprite, arrImg[i][0], arrImg[i][1], 207, 128,0,0, 207*1.3, 128*1.3)
            i++
        }
    }, 250);
})
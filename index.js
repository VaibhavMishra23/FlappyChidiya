let inputDir = {x: 0 , y: 0};
let bird = {x: 5,y: 16}
let lastpainttime = 0;
let speed = 6;
let flag = false;
let cur = 0;
let prev = 0;
let c = 0;
let barrier = [{x: 31,y: 0,z:0}];
let score = 0;
//functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return ;
    }
    lastpainttime = ctime;
    gameEngine();
}
function obstical(a = true){
    let leng = barrier.length;
    for(let i=0;i<leng;i++){
        barrier[i].x -= 1;
    }
    if(a){
        a = 3;
        b = 20;
        c = Math.round(a + (b-a)* Math.random());
    }
    if(barrier[leng-1].x + 18 === 36){
        barrier.push({x:32,y:0,z:0});
    }
    box.innerHTML="";
    
        for(let k = 0; k<leng ;k++){
        if(barrier[k].z === 0){
            barrier[k].z = c;
        }
        for(let i=1;i<=28;i++){
            if(barrier[k].z===i){
                i+=6;
                continue;
            }
            let one = 1;
            for(let j = 0;j<3;j++){
                barrierElement = document.createElement('div');
                barrierElement.style.gridRowStart = barrier[k].y + i;
                barrierElement.style.gridColumnStart = barrier[k].x + j;
                if(one === 1){
                    barrierElement.classList.add('green2');
                    one++;
                }
                else{
                    barrierElement.classList.add('green');
                }
                box.appendChild(barrierElement);
            }
        }
    }
}
function iscollied(){
    if(bird.y <=0 || bird.y >= 28){
        return true;
    }
    for(let i =0;i<3;i++){
    if(bird.x === barrier[0].x+i && (bird.y <barrier[0].z || bird.y >barrier[0].z+5)){
        return true;
        }
    }
    return false;
}
function gameEngine(){
    //collision 
    if(iscollied()){
        inputDir.x = 0;
        inputDir.y = 0;
        bird.x = 5;
        bird.y = 16;
        cur = prev = 0;
        flag=false;
        alert(`GameOver Press key to start the game \n Score: ${score}`);
        bird = {x: 5,y: 16};
        barrier = [{x: 31,y: 0,z:0}];
        score = 0;
    }
    //Obstical
    obstical();
    if(barrier[0].x === 0){
        barrier.shift();
        obstical(false);
    }
    if(bird.x > barrier[0].x+3){
        score++;
    }
    //Bird
    birdElement = document.createElement('div');
    if(flag){
        if(cur>prev){
            birdElement.style.gridRowStart = bird.y -1;
            prev++;
            bird.y -= 1;
            birdElement.classList.add('birdcol2');
        }
        else{
            birdElement.style.gridRowStart = bird.y +1;
            bird.y += 1;
        }
    }
    else{
        birdElement.style.gridRowStart = bird.y;
    }
    birdElement.style.gridColumnStart = bird.x;
    birdElement.classList.add('birdcol');
    box.appendChild(birdElement);

}
//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    if(e.key === 'ArrowUp'){
        inputDir.x = 0;
        inputDir.y = -1;
        flag = true;
        cur += 3;
    }
})
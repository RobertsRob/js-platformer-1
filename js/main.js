// "use strict"

var ctx = myCanvas.getContext("2d"); 
let fps = 0;
let fpsC = 0;
let r = false;
let l = false;
let jump = false;
let dforce = 100;//30
let force = dforce;
let canJump = true;

let gameY = 0;


ctx.fillText( "Loading", 10, 30 );

function start() {
    game = new Game();
    setInterval(update, 25);//25
    setInterval(updateFast, 1);//1
}

let player = new Player(1, 1,  100, 300);
// let platforms = []
// for (let i = 0; i < array.length; i++)
// {    
// }

let platform = new GameObject(0, myCanvas.height-50+gameY, myCanvas.width, 50, "blue");
let platformSmall = new GameObject(150, myCanvas.height-900+gameY, 60, 50, "grey");
// let platformSmall = new GameObject(150, myCanvas.height-250, 60, 50, "grey");

function update()
{
    
}

function updateFast()
{
    // variables ------------------------------------
    let posPl = player.getPos();
    let sizePl = player.getSize();
    let speedPl = player.getSpeed();
    let posSm = platformSmall.getPos();
    let posPLB = platform.getPos();
    let heightSm = platformSmall.getSize();

    //colisions-----------------------------------
    if(player.collision(platform) == false)
    {
        player.collisionPlatfDetectedNOT();
    }
    if(player.collision(platformSmall) == false)
    {
        player.collisionPlatfDetectedNOT();
    }

    if(player.collision(platform) == true)
    {
        player.collisionPlatfDetected();
        canJump = true;
    }
    if(player.collision(platformSmall) == true && posPl.y+sizePl.h < posSm.y+10)
    {
        player.collisionPlatfDetected();
        canJump = true;
    }
    // variables ------------------------------------
    fps++;
    
    // player movement --------------------------
    if(l == true){player.left();}
    if(r == true){player.right();}
    if(l == false && r == false){player.setSpeed(0, speedPl.vy);}


    // jump player ---------------------------------
    if(jump == true)
    {
        canJump = false;
        player.setPos(posPl.x, posPl.y - force/1.5);
        force = force / 1.065;
        if(force < 1)
        {
            force = dforce;
            jump = false;
        }
    }

    // updates-------------------------------------------
    ctx.clearRect( 0, 0, myCanvas.width, myCanvas.height);
    player.update();
    ctx.fillText(fpsC, 10, 30);
    platform.draw();
    platform.update();
    platformSmall.draw();
    platformSmall.update();

    // screen moving up ----------------------------------
    if(posPl.y < 120)
    {
        if(jump == true)
        {
            gameY += force;
            platformSmall.setPos(posSm.x, posSm.y+force);
            platform.setPos(posPLB.x, posPLB.y+force);
        }
    }

}

let seconds = 0;
setInterval(function() {
    seconds++;
    fpsC = fps;
    fps = 0;
}, 1000);

function ButtonsDown(key)
{
    // alert(key.keyCode);
    if(key.keyCode == 65)
    {
        l = true;
    }
    if(key.keyCode == 68)
    {
        r = true;
    }
    if(key.keyCode == 32 && canJump)
    {
        // player.addForce();
        jump = true;
    }
}
function ButtonsUp(key)
{
    // alert(key.keyCode);
    if(key.keyCode == 65)
    {
        l = false;
    }
    if(key.keyCode == 68)
    {
        r = false;
    }
}

addEventListener( "keydown", ButtonsDown );
addEventListener( "keyup", ButtonsUp );
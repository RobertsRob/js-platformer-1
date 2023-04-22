// "use strict"

var ctx = myCanvas.getContext("2d"); 
let fps = 250;
let fpsC = 250;
let r = false;
let l = false;
let jump = false;
let dforce = 30;//30
let force = dforce;
let canJump = true;

let gameY = 0;
let previosPlatformCords = 200;
const platformDistance = 250;
let platforms = [];

let cW = myCanvas.width;

for (let i = 0; i < Math.round(myCanvas.height/platformDistance); i++)
{
    platforms.push(new GameObject(Math.floor(Math.random() * (cW-150 - 150 + 1) ) + 150, myCanvas.height-(previosPlatformCords+150)+gameY, 150, 50, "grey"));
    previosPlatformCords += platformDistance;
}

ctx.fillText( "Loading", 10, 30 );

function start() {
    game = new Game();
    setInterval(update, 25);//25
    setInterval(updateFast, 0.07);//1//0.1//0.07
}

let player = new Player(myCanvas.width/2, myCanvas.height-150,  100, 100);
// let platforms = []
// for (let i = 0; i < array.length; i++)
// {    
// }

let platform = new GameObject(0, myCanvas.height-50+gameY, myCanvas.width, 50, "blue");
// let platformSmall = new GameObject(150, myCanvas.height-900+gameY, 60, 50, "green");
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
    // let posSm = platformSmall.getPos();
    let posPLB = platform.getPos();
    // let heightSm = platformSmall.getSize();

    //colisions-----------------------------------
    if(player.collision(platform) == false && jump == false)
    {
        player.collisionPlatfDetectedNOT();
    }
    // if(player.collision(platformSmall) == false && jump == false)
    // {
    //     player.collisionPlatfDetectedNOT();
    // }
    for (let i = 0; i < platforms.length; i++) {
        let posPlatform = platforms[i].getPos();
        if(player.collision(platforms[i]) == false && jump == false)//10
        {
            player.collisionPlatfDetectedNOT();
        }
    }

    if(player.collision(platform) == true)
    {
        player.collisionPlatfDetected();
        canJump = true;
        player.fallZero();
    }
    // if(player.collision(platformSmall) == true && posPl.y+sizePl.h < posSm.y+15)//10
    // {
    //     player.collisionPlatfDetected();
    //     canJump = true;
    // }

    for (let i = 0; i < platforms.length; i++) {
        let posPlatform = platforms[i].getPos();
        if(player.collision(platforms[i]) == true && posPl.y+sizePl.h < posPlatform.y+15)//10
        {
            player.collisionPlatfDetected();
            canJump = true;
            player.fallZero();
        }
    }
    // variables ------------------------------------
    fps++;
    
    // player movement --------------------------

    if(posPl.x+2+sizePl.w < myCanvas.width)
    {
        if(r == true){player.right(fpsC);}
    }
    if(posPl.x+2 > 0)
    {
        if(l == true){player.left(fpsC);}
    }


    // else
    // {
    //     if(posPl.x+2 < 0)
    //     {

        
    //     }else{
    //         if(l == true){player.left(fpsC);}
    //         if(r == true){player.right(fpsC);}
    //     }
    // }
    if(l == false && r == false){player.setSpeed(0, speedPl.vy);}


    // jump player ---------------------------------
    if(jump == true)
    {
        canJump = false;
        if(posPl.y > 600)
        {
            player.setPos(posPl.x, posPl.y - force/1.5);
        }
        // player.setPos(posPl.x, posPl.y - force/(fpsC/167*2));
        force = force / 1.065;
        if(force < 1)
        {
            player.postJ();
            force = dforce;
            jump = false;
        }
    }

    // updates-------------------------------------------
    ctx.clearRect( 0, 0, myCanvas.width, myCanvas.height);
    // ctx.font = "bold 31px Arial";
    // if(fpsC > 250){ctx.fillStyle = "violet";}
    // if(fpsC <= 250){ctx.fillStyle = "green";}
    // if(fpsC <= 180){ctx.fillStyle = "yellow";}
    // if(fpsC <= 150){ctx.fillStyle = "red";}
    // ctx.fillText(fpsC, 10, 30);
    // ctx.fillStyle = "black";
    // ctx.strokeText(fpsC, 10, 30);
    platform.draw();
    platform.update();
    // platformSmall.draw();
    // platformSmall.update();
    player.update(fpsC);

    for (let i = 0; i < platforms.length; i++) {
        platforms[i].update();
        platforms[i].draw();
        
    }

    //up------------------------------------------------------
    if(posPl.y < 600)
    {
        if(jump == true)
        {
            gameY += force;
            // platformSmall.setPos(posSm.x, posSm.y+force);
            platform.setPos(posPLB.x, posPLB.y+force);

            for (let i = 0; i < platforms.length; i++) {
                let posPlatform = platforms[i].getPos();
                platforms[i].setPos(posPlatform.x, posPlatform.y+force);
                if(platforms.length == i+1 && a < 3)
                {
                    console.log(1);
                    a ++;
                        platforms.push(new GameObject(Math.floor(Math.random() * (cW-150 - 0 + 1) ) + 0, myCanvas.height-(previosPlatformCords+150)+gameY, 150, 50, "grey"));
                        previosPlatformCords += platformDistance;
                    // alert("posledni, xaxaxax $sdas");
                }
            }
        }
    }
    //down-------------------------------------------------------
    if(posPl.y > myCanvas.height-100)
    {
        let fall = player.fallFF();
        fall /= 10;
        gameY -= fall;
        let fallT = player.fallFaF();
        if(jump == false && fallT == true)
        {
            // platformSmall.setPos(posSm.x, posSm.y-fall);
            platform.setPos(posPLB.x, posPLB.y-fall);

            for (let i = 0; i < platforms.length; i++) {
                let posPlatform = platforms[i].getPos();
                platforms[i].setPos(posPlatform.x, posPlatform.y-fall);
            }
        }
    }

    //a----------------------------------------------------
    for (let i = 0; i < platforms.length; i++)
    {
        let posPlatform = platforms[i].getPos();
        if(platforms.length == i+1)
        {
            if(posPlatform.y < 300 && jump == false)
            {
                a = 0;
            }
        }
    }


    // UI-------------------------------
    ctx.font = "bold 31px Arial";
    if(fpsC > 250){ctx.fillStyle = "violet";}
    if(fpsC <= 250){ctx.fillStyle = "green";}
    if(fpsC <= 180){ctx.fillStyle = "yellow";}
    if(fpsC <= 150){ctx.fillStyle = "red";}
    ctx.fillText(fpsC, 10, 30);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.strokeText(fpsC, 10, 30);

    ctx.font = "bold 60px Arial";
    var gradient = ctx.createLinearGradient(0, 0, myCanvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    ctx.strokeText(Math.round(gameY/10), myCanvas.width/2-5, 60);
    ctx.fillText(Math.round(gameY/10), myCanvas.width/2-5, 60);

}
let a = 0;
let seconds = 0;
setInterval(function() {
    seconds++;
    fpsC = fps*2;
    fps = 0;
}, 500);

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
        player.GN();
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
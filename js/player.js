class Player extends gameObjPlayer {
    constructor(x, y, w, h)
    {
        super(x, y, w, h, "red");

        this.fall = true;
        // this.force = 1000;
        this.fallF = 20;//20
        this.g = 3;//3
    }
    update(fps)
    {
        //gravitation-----------------------------------
        if(this.fall == true)
        {
            let pos = this.getPos();
            if(this.y < myCanvas.height-100)
            {
                this.setPos(pos.x, pos.y+this.fallF/(fps/8));//30
            }
            // console.log(this.fallF/(fps/8));
            this.fallF += this.g;
        }
        
        //update speed
        // this.x += this.vx;
        this.y += this.vy;

        if(this.x+1+this.w < myCanvas.width && this.vx > 0)
        {
            // if(r == true){player.right(fpsC);}
            this.x += this.vx;
        }
        if(this.x-1 > 0 && this.vx < 0)
        {
            this.x += this.vx;
            // if(l == true){player.left(fpsC);}
        }

        super.draw();
    }
    detectFallTF()
    {
        return this.fall;
    }
    collisionPlatfDetected()
    {
        this.fallF = 5;
        this.fall = false;
    }
    collisionPlatfDetectedNOT()
    {
        this.fall = true;
    }
    collision(other)
    {
        return other.x < this.x+this.w && other.x+other.w > this.x && other.y < this.y+this.h && other.y+other.h > this.y;
    }

    right(fps)
    {
        // let pos = this.getPos();
        // this.setPos(pos.x+6, pos.y);
        let speed = this.getSpeed();
        this.setSpeed(8/2.5, speed.vy);
        // this.setSpeed(6/(fps/92), speed.vy);
    }

    left(fps)
    {
        // let pos = this.getPos();
        // this.setPos(pos.x-6, pos.y);
        let speed = this.getSpeed();
        this.setSpeed(-8/2.5, speed.vy);
        // this.setSpeed(-6/(fps/92), speed.vy);
    }
    GN()
    {
        this.fall = false;
    }
    postJ()
    {
        this.fall = true;
    }

    fallFF()
    {
        return this.fallF;
    }
    fallFaF()
    {
        return this.fall;
    }
    fallZero()
    {
        this.fallF = 0;
    }

}

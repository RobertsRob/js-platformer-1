class Player extends gameObjPlayer {
    constructor(x, y, w, h)
    {
        super(x, y, w, h, "red");

        this.fall = false;
        // this.force = 1000;
        this.fallF = 4;
        this.g = 1;
    }
    update()
    {
        //gravitation-----------------------------------
        if(this.fall == true)
        {
            let pos = this.getPos();
            this.setPos(pos.x, pos.y+this.fallF/50);
            this.fallF += this.g;
        }
        
        super.update();
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

    right()
    {
        // let pos = this.getPos();
        // this.setPos(pos.x+6, pos.y);
        let speed = this.getSpeed();
        this.setSpeed(6/3, speed.vy);
    }

    left()
    {
        // let pos = this.getPos();
        // this.setPos(pos.x-6, pos.y);
        let speed = this.getSpeed();
        this.setSpeed(-6/3, speed.vy);
    }

}

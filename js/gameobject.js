class GameObject {
    constructor(x, y,  w, h, color, img)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.img = img;
    }
    getPos()
    {
        return {x: this.x, y: this.y};
    }
    getSpeed()
    {
        return {vx: this.vx, vy: this.vy};
    }
    getSize()
    {
        return {w: this.w, h: this.h};
    }
    draw()
    {
        if(this.img == null)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect( this.x, this.y, this.w, this.h );
        }
        else
        {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
    }
    setSpeed( vx, vy )
    {
        this.vx = vx;
        this.vy = vy;
    }
    setPos( x, y )
    {
        this.x = x;
        this.y = y;
    }
    update()
    {
        this.x += this.vx;
        this.y += this.vy;
    }
}
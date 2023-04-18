class AnimatedImage {
    // img - image from HTML page
    // frameCount - how many frames in x direction
    // delay - after how many animation frames switch to next image frame
    constructor( img, frameCount, delay ) {
        this.img = img;
        this.frameCount = frameCount;
        if( this.delay != 0 ) {
            this.delay = delay;
        } else {
            this.delay = 1;
        }
        if( frameCount != 0 ) {
            this.w = img.width / frameCount;
        } else {
            this.w = img.width;
        }
        this.h = img.height;
        this.frame = 0;
        this.finished = false;
    }
    // update() {
        
    // }
    draw(ctx, x, y) { // returns true if animation finished
        ctx.drawImage(this.img, this.w*Math.floor(this.frame/this.delay), 0, this.w, this.h, x, y, this.w, this.h);

        this.frame += 1;
        if( this.frame >= this.frameCount*this.delay ) {
            this.frame = 0;
            this.finished = true;
        }
    }

    isFinished() {
        return this.finished;
    }
}
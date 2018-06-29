'use strict'

class Level extends Block {
	constructor( posX, posY, ctx ){
		super();
		this.posX = posX;
		this.posY = posY;
		this.ctx = ctx;
    }
    
	render(ix) {
		this.ctx.fillStyle = "#0000FF";
        this.ctx.fillRect(this.posX, this.posY, this.size, this.size);
    }

    setXY() {
        this.posX = posX;
        this.posY = posY;
    }
}

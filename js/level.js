'use strict'

class Level extends Block {
	constructor( posX, posY, ctx ){
		super();
		this.posX = posX;
		this.posY = posY;
		this.next = null;
		this.ctx = ctx;
		this.speed = 2;
    }
    
	render() {
        if(this.next != null){
			this.next.render(ctx);
		}
		this.updatePosition();
		this.ctx.fillStyle = "#0000FF";
        this.ctx.fillRect(this.posX, this.posY, this.size, this.size);
        //aqui pinto partes.
    }

    setXY() {
        this.posX = posX;
        this.posY = posY;
    }
    
	updatePosition(direction) {
		if ( this.next !== null ) {
			this.next.updatePosition();
		}
		switch ( direction ) {
			case 'up':
                this.posY-=this.speed;
				break;
			case 'down':
				this.posY+=this.speed;
				break;
			case 'left':
				this.posX-=this.speed;
				break;
			case 'right':
				this.posX+=this.speed;
				break;
		
			default:
				break;
		}
	}
}

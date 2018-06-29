'use strict'

class Food extends Block {
	constructor(ctx, canvas){
		super();
		this.canvas = canvas;
		this.posX = this.randomPosX();
		this.posY = this.randomPosY();
		this.ctx = ctx;
	}
	randomPosX(){
		return Math.floor(Math.random() * ((this.canvas.width / this.size))) * this.size;
	}
	randomPosY(){
		return Math.floor(Math.random() * ((this.canvas.height / this.size))) * this.size;
	}
	render() {
		this.ctx.fillStyle = "#FF0000";
		this.ctx.fillRect(this.posX, this.posY, this.size, this.size);
	}
	realocate() {
		this.posX =this.randomPosX();
		this.posY = this.randomPosY();
	}
}


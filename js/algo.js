var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown",OnKeyDown);

var velocity = 500;
var size = 100;

var move = '';

function OnKeyDown( e ) {
	switch (e.keyCode) {
		case 38:
			move = 'up';
			break;
		case 40:
			move = 'down';
			break;
		case 37:
			move = 'left';
			break;
		case 39:
			move = 'right';
			break;
		default:
			break;
	}
}


class Block {
	constructor(){
		this.size = size;
	}
}

class Food extends Block {
	constructor(){
		super();
		this.posX =this.randomPosX();
		this.posY = this.randomPosY();
	}
	randomPosX(){
		return Math.floor(Math.random() * ((canvas.width / size))) * size;
	}
	randomPosY(){
		return Math.floor(Math.random() * ((canvas.height / size))) * size;
	}
	render() {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.posX, this.posY, this.size, this.size);
	}
	realocate() {
		this.posX =this.randomPosX();
		this.posY = this.randomPosY();
	}
}

class Level extends Block{
	constructor( posX, posY ){
		super();
		this.posX = posX;
		this.posY = posY;
		this.next = null;
	}
	colition ( food ) {
		var difx = Math.abs(this.posX - food.posX);
		var dify = Math.abs(this.posY - food.posY);
		if ( difx >= 0 && difx < size && dify >= 0 && dify < size ) {
			food.realocate();
			this.next = new Level( this.posX, this.posY );
			console.log("colition!");
			return true;
		} else {
			console.log("No colition!");
			return false;
		}
	}
	render() {
		this.updatePosition();
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(this.posX, this.posY, this.size, this.size);
	}
	updatePosition() {
		if ( this.next !== null ) {
			this.next.updatePosition();
		}
		switch ( move ) {
			case 'up':
				this.posY-=size;
				break;
			case 'down':
				this.posY+=size;
				break;
			case 'left':
				this.posX-=size;
				break;
			case 'right':
				this.posX+=size;
				break;
		
			default:
				break;
		}
	}
}

var player = new Level( 100, 100 );
var food = new Food();

function render(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	player.colition( food );
	player.render();
	food.render();
	//aquí abajo va todo el dibujo
}

function main(){
	render();
}

setInterval("main()", velocity);
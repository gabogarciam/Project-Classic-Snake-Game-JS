'use strict'

class Game {
    constructor(ctx, canvas, gameOverCallback) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.gameOverCallback = gameOverCallback;
        this.move = '';
        this.isEnded = false;
    }

    startGame() {
        this.player = new Level(100, 100, this.ctx);
        this.food = new Food(this.ctx, this.canvas);
        this.doFrame();
    }

    doFrame() {
        var self = this;
        this.clearCanvas();
        this.player.updatePosition(this.move);
        this.checkCollisionFood();
        this.checkCollisionWall();

        this.player.render();
        this.food.render();

        window.requestAnimationFrame(function(){
            if (!self.isEnded) {
                self.doFrame();
            }
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkCollisionFood() {
        var difx = Math.abs(this.player.posX - this.food.posX);
		var dify = Math.abs(this.player.posY - this.food.posY);
		if ( difx >= 0 && difx < this.player.size && dify >= 0 && dify < this.player.size ) {
			this.food.realocate();
			this.next = new Level( this.posX, this.posY );
			// console.log("colition!");
			return true;
		} else {
			// console.log("No colition!");
			return false;
		}
    }

    checkCollisionWall() {
        var topWall = 0;
        var bottomWall = this.canvas.height;
        var leftWall = 0;
        var rightWall = this.canvas.width;
        
        var topPlayer = this.player.posY;
        var bottomPlayer = this.player.posY + this.player.size;
        var leftPlayer = this.player.posX;
        var rightPlayer = this.player.posX + this.player.size;

        if (topWall >= topPlayer){ this.endGame(); }
        if (bottomWall <= bottomPlayer){ this.endGame(); }
        if (leftWall >= leftPlayer){ this.endGame();}
        if (rightWall <= rightPlayer){ this.endGame();}



        // var difx = Math.abs(this.player.size - this.canvas.width);
		// var dify = Math.abs(this.player.size   - this.canvas.height);
		// if ( difx >= 0 && difx < this.canvas.width && dify >= 0 && dify < this.canvas.height ) {
			//this.food.realocate();
			//this.next = new Level( this.posX, this.posY );
		// 	console.log("collition! wall");
		// 	return true;
		// } else {
		// 	console.log("No collition! wall");
		// 	return false;
		// }
    }

    endGame() {
        this.isEnded = true;
        this.gameOverCallback();
    }
}
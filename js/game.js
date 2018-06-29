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
        this.player = new Levels(100, 100, this.ctx);
        this.food = new Food(this.ctx, this.canvas);
        this.doFrame();
    }

    doFrame() {
        var self = this;
        this.clearCanvas();
        this.player.updatePosition( this.move );
        this.player.checkCollisionFood( this.food );
        this.checkCollisionWall();

        this.player.render();
        this.food.render();

        window.requestAnimationFrame( function() {
            if (!self.isEnded) {
                self.doFrame();
            }
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    checkCollisionWall() {
        if ( this.player.checkCollisionWall( this.canvas ) ) {
            this.endGame();
        }
    }

    endGame() {
        this.isEnded = true;
        this.gameOverCallback(this.apples);
    }
}
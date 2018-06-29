class Levels {
    constructor (posX, posY, ctx) {
        this.ctx = ctx;
        this.speed = 3;
        this.direction = '';
        var level = new Level( posX, posY, ctx);
        this.levels = [level];
        this.growLevel = 0;
    }
    
	render() {
		for ( var i = this.levels.length; i > 0; i--) {
			this.levels[i-1].render();
		}
    }
	
    checkCollisionFood( food ) {
        var difx = Math.abs(this.levels[0].posX - food.posX);
		var dify = Math.abs(this.levels[0].posY - food.posY);
		if ( difx >= 0 && difx < this.levels[0].size && dify >= 0 && dify < this.levels[0].size ) {
			this.levels.push( new Level(food.posX, food.posY, this.ctx) );
			food.realocate();
		}
    }
    
    checkCollisionWall( canvas ) {
        var topWall = 0;
        var bottomWall = canvas.height;
        var leftWall = 0;
        var rightWall = canvas.width;
        
        var topPlayer = this.levels[0].posY;
        var bottomPlayer = this.levels[0].posY + this.levels[0].size;
        var leftPlayer = this.levels[0].posX;
        var rightPlayer = this.levels[0].posX + this.levels[0].size;

        if (( topWall >= topPlayer) ||
            ( bottomWall <= bottomPlayer) ||
            ( leftWall >= leftPlayer) ||
            ( rightWall <= rightPlayer)) 
		{ 
			return true;
		} else {
			return false;
		}
	}

	updatePosition( direction ) {
		if ( this.levels.length > 1 ) {
			for ( var i = this.levels.length; i > 1; i--) {
				this.levels[i-1].posX = this.levels[i-2].posX;
				this.levels[i-1].posY = this.levels[i-2].posY;
			}
		}
		
		switch ( direction ) {
            case 'up':
				this.levels[0].posY-=this.speed;
				break;
			case 'down':
				this.levels[0].posY+=this.speed;
				break;
			case 'left':
				this.levels[0].posX-=this.speed;
				break;
			case 'right':
				this.levels[0].posX+=this.speed;
				break;
		
			default:
				break;
        }
        this.direction = direction;
	}

    growSnake() {
        this.growLevel++;
    }
}
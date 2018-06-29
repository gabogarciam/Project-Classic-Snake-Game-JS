class levels {
    constructor (posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.levels = [posX, posY];
        this.growLevel = 0;
    }

    growSnake() {
        this.growLevel++;
    }
}
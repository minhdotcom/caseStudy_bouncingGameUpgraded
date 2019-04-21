var bar = new function () {
    this.color = "#0000ff";
    this.height = BAR_HEIGHT;
    this.x = CANVAS_WIDTH / 2 - BAR_WIDTH / 2;
    this.y = CANVAS_HEIGHT - this.height;
    this.width = BAR_WIDTH;
    this.speed = BAR_SPEED;
    this.accelaration = 0;

    this.leftEdge = this.x;
    this.rightEdge = this.x + this.width;

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.width, this.height);
        context.closePath();
        context.fill();
    }

    let moveX = 0;


    this.move = function () {
        this.x += moveX;
        this.draw();
    }

    this.setBarKeyBoard = function () {
        window.addEventListener("keydown", press_down, false);
        let that = this;
        function press_down(event) {
            let keyCode = event.which;
            switch (keyCode) {
                case 37:
                    if (that.x <= 0) {
                        moveX = 0;
                    } else if (that.x <= Math.min(150, CANVAS_WIDTH / 5)) {
                        moveX = - that.speed * that.x / Math.min(200, CANVAS_WIDTH / 5);
                    }else {
                        moveX = - that.speed;
                    }
                    break;
                case 39:
                    if (that.x + that.width >= CANVAS_WIDTH) {
                        moveX = 0;
                    } else if (that.x + that.width >= Math.max(CANVAS_WIDTH - 200, CANVAS_WIDTH * 4 / 5)) {
                        moveX = that.speed * (CANVAS_WIDTH - (that.x + that.width)) / Math.min(200, CANVAS_WIDTH / 5);
                    } else {
                        moveX = + that.speed;
                    }
                    break;
            }
        }
        window.addEventListener("keyup", press_up, false);
        function press_up (event) {
            moveX = 0;
        }
    }
}
function Bar (x, y, width, height, color, speed, type) {
    this.color = color;
    this.height = height;
    this.x = x;
    this.y = y;
    this.width = width;
    this.speed = speed;
    this.type = type;

    this.updateThis = function () {
        this.leftEdge = this.x;
        this.rightEdge = this.x + this.width;
        this.topEdge = this.y;
        this.bottomEdge = this.y + this.height;
    };

    this.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.width, this.height);
        context.closePath();
        context.fill();
    };

    let moveX = 0,
        moveY = 0;

    this.move = function () {
        if (this.type == "horizon") {
            this.x += moveX;
        } else this.y += moveY;
        this.updateThis();
        this.draw();
    };

    this.setBarKeyBoard = function () {
        window.addEventListener("keydown", key_down, false);
        let that = this;
        function key_down(event) {
            let keyCode = event.which;
            switch (keyCode) {
                case 37:
                    if (that.leftEdge <= HELP_BORDER_X) {
                        moveX = 0;
                    } else if (that.leftEdge <= Math.min(BAR_BREAK_X + HELP_BORDER_X, CANVAS_WIDTH / 5 + HELP_BORDER_X)) {
                        moveX = - that.speed * that.x / Math.min(BAR_BREAK_X + HELP_BORDER_X, CANVAS_WIDTH / 5 + HELP_BORDER_X);
                    }else {
                        moveX = - that.speed;
                    }
                    break;
                case 39:
                    if (that.rightEdge >= CANVAS_WIDTH - HELP_BORDER_X) {
                        moveX = 0;
                    } else if (that.rightEdge >= Math.max(CANVAS_WIDTH - BAR_BREAK_X - HELP_BORDER_X, CANVAS_WIDTH * 4 / 5 - HELP_BORDER_X)) {
                        moveX = that.speed * (CANVAS_WIDTH - HELP_BORDER_X - (that.x + that.width)) / Math.min(BAR_BREAK_X, CANVAS_WIDTH / 5);
                    } else {
                        moveX = + that.speed;
                    }
                    break;
                case 38:
                    if (that.topEdge <= HELP_BORDER_Y) {
                        moveY = 0;
                    } else if (that.topEdge <= Math.max(BAR_BREAK_Y + HELP_BORDER_Y, CANVAS_HEIGHT / 5 + HELP_BORDER_Y)) {
                        moveY = - that.speed * that.y / Math.min(BAR_BREAK_Y + HELP_BORDER_Y, CANVAS_HEIGHT / 5 + HELP_BORDER_Y);
                    } else {
                        moveY = - that.speed;
                    }
                    break;
                case 40:
                    if (that.bottomEdge >= CANVAS_HEIGHT - HELP_BORDER_Y) {
                        moveY = 0;
                    } else if (that.bottomEdge >= Math.max(CANVAS_HEIGHT - BAR_BREAK_Y - HELP_BORDER_Y, CANVAS_HEIGHT * 4 / 5 - HELP_BORDER_Y)) {
                        moveY = that.speed * (CANVAS_HEIGHT - HELP_BORDER_Y - (that.y + that.height)) / Math.min(BAR_BREAK_Y, CANVAS_HEIGHT / 5);
                    } else {
                        moveY = + that.speed;
                    }
                    break;
            }
        }
        window.addEventListener("keyup", key_up, false);
        function key_up (event) {
            moveX = 0;
            moveY = 0;
        }
    }
}



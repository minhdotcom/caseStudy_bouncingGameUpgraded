var ball = new function () {
    this.radius = BALL_RADIUS;
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT - 20;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.color = BALL_COLOR;
    this.speed = BALL_SPEED;
    this.moveAngle = Math.random();

    this.updatePosition = function () {
        this.leftEdge = this.x - this.radius;
        this.rightEdge = this.x + this.radius;
        this.topEdge = this.y - this.radius;
        this.bottomEdge = this.y + this.radius;
    };

    let moveX = this.speed;
    let moveY = moveX * (1 + this.moveAngle);

    this.updateMoveAngle = function () {
        moveY = moveY / Math.abs(moveY) * Math.abs(moveX * (1 + this.moveAngle));
    };

    this.draw = function () {
        context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        context.closePath();
        context.fill();
    };

    this.brickCrashRules = function () {
        for (let i = 0; i < bricks.length; i++) {
            if (((this.leftEdge >= bricks[i].leftSide && this.leftEdge <= bricks[i].rightSide) ||
                 (this.rightEdge >= bricks[i].leftSide && this.rightEdge <= bricks[i].rightSide)) &&
                ((this.topEdge >= bricks[i].topSide && this.topEdge <= bricks[i].bottomSide) ||
                 (this.bottomEdge >= bricks[i].topSide && this.bottomEdge <= bricks[i].bottomSide))) {
                if (Math.min(Math.abs(bricks[i].rightSide - this.leftEdge),
                             Math.abs(this.rightEdge - bricks[i].leftSide)) <=
                    Math.min(Math.abs(this.bottomEdge - bricks[i].topSide),
                             Math.abs(bricks[i].bottomSide - this.topEdge))) {
                    moveX = - moveX;
                } else {
                    moveY = - moveY;
                }
                bricks.splice(i,1); // make crushed brick disappeared from brick array
            }
        }
    };

    this.topCanvasRules = function (horizBarLeft, horizBarRight) {
        if ((this.topEdge <= HELP_THICKNESS) &&
            (this.leftEdge <= HELP_BORDER_X || this.rightEdge >= CANVAS_WIDTH - HELP_BORDER_X)) {
            moveY = - Math.abs(moveY);
        }
        if ((this.topEdge <= BAR_HEIGHT) &&
            (this.leftEdge >= horizBarLeft && this.rightEdge <= horizBarRight)) {
            moveY = - Math.abs(moveY);
        }
        if ((this.topEdge < 0) &&
            (this.leftEdge < horizBarLeft || this.rightEdge > horizBarRight)) {
            clearInterval(interval);
            alert("Game over!");
            // moveY = - moveY;
        }
    };

    this.bottomCanvasRules = function (horizBarLeft, horizBarRight) {
        if ((this.bottomEdge >= CANVAS_HEIGHT - HELP_THICKNESS) &&
            (this.leftEdge <= HELP_BORDER_X || this.rightEdge >= CANVAS_WIDTH - HELP_BORDER_X)) {
            moveY = Math.abs(moveY);
        }
        if ((this.bottomEdge >= CANVAS_HEIGHT - BAR_HEIGHT) &&
            (this.leftEdge >= horizBarLeft && this.rightEdge <= horizBarRight)) {
            moveY = Math.abs(moveY);
        }
        if ((this.bottomEdge > CANVAS_HEIGHT) &&
            (this.leftEdge < horizBarLeft || this.rightEdge > horizBarRight)) {
            clearInterval(interval);
            alert("Game over!");
            // moveY = - moveY;
        }
    };

    this.leftCanvasRules = function (vertiBarTop, vertiBarBottom) {
        if ((this.leftEdge <= HELP_THICKNESS) &&
            (this.topEdge <= HELP_BORDER_Y || this.bottomEdge >= CANVAS_HEIGHT - HELP_BORDER_Y)) {
            moveX = - Math.abs(moveX);
        }
        if ((this.leftEdge <= BAR_THICKNESS) &&
            (this.topEdge >= vertiBarTop && this.bottomEdge <= vertiBarBottom)) {
            moveX = - Math.abs(moveX);
        }
        if ((this.leftEdge <= 0) &&
            (this.topEdge < vertiBarTop || this.bottomEdge > vertiBarBottom)) {
            clearInterval(interval);
            alert("Game over!");
            // moveY = - moveY;
        }
    };

    this.rightCanvasRules = function (vertiBarTop, vertiBarBottom) {
        if ((this.rightEdge >= CANVAS_WIDTH - HELP_THICKNESS) &&
            (this.topEdge <= HELP_BORDER_Y || this.bottomEdge >= CANVAS_HEIGHT - HELP_BORDER_Y)) {
            moveX = Math.abs(moveX);
        }
        if ((this.rightEdge >= CANVAS_WIDTH - BAR_THICKNESS) &&
            (this.topEdge >= vertiBarTop && this.bottomEdge <= vertiBarBottom)) {
            moveX = Math.abs(moveX);
        }
        if ((this.rightEdge >= CANVAS_WIDTH) &&
            (this.topEdge < vertiBarTop || this.bottomEdge > vertiBarBottom)) {
            clearInterval(interval);
            alert("Game over!");
            // moveY = - moveY;
        }
    };

    this.moveRules = function (horizBarLeft, horizBarRight, vertiBarTop, vertiBarBottom) {
        this.brickCrashRules();
        this.topCanvasRules(horizBarLeft, horizBarRight);
        this.bottomCanvasRules(horizBarLeft, horizBarRight);
        this.leftCanvasRules(vertiBarTop, vertiBarBottom);
        this.rightCanvasRules(vertiBarTop, vertiBarBottom);
    };

    this.move = function (horizBarLeft, horizBarRight, vertiBarTop, vertiBarBottom) {
        this.moveRules(horizBarLeft, horizBarRight, vertiBarTop, vertiBarBottom);
        this.x -= moveX;
        this.y -= moveY;
        this.updatePosition();
        this.draw();
    }
};
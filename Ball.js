var ball = new function () {
    this.radius = BALL_RADIUS;
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT - 20;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.color = "#0000ff"
    this.speed = BALL_SPEED;
    this.moveAngle = Math.random();

    this.updatePosition = function () {
        this.leftEdge = this.x - this.radius;
        this.rightEdge = this.x + this.radius;
        this.topEdge = this.y - this.radius;
        this.bottomEdge = this.y + this.radius;
    }

    this.draw = function () {
        context.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        context.closePath();
        context.fill();
    }

    let moveX = this.speed;
    let moveY = moveX * (1 + this.moveAngle);;

    this.updateMovingAngle = function () {
        moveY = moveY / Math.abs(moveY) * Math.abs(moveX) * (1 + this.moveAngle);
    }

    this.moveRules = function (leftBarEdge, rightBarEdge) {
        if (this.bottomEdge > CANVAS_HEIGHT && (this.leftEdge < leftBarEdge || this.rightEdge > rightBarEdge)) {
            // clearInterval(interval);
            // alert("Game over!");
            this.x = CANVAS_WIDTH / 2;
            this.y = CANVAS_HEIGHT - 20;
            this.moveAngle = Math.random();
            this.speed = BALL_SPEED;
            bar.x = CANVAS_WIDTH / 2 - BAR_WIDTH / 2;

        }
        if ((this.topEdge <= 0) ||
            (this.bottomEdge >= bar.y) && (this.leftEdge >= leftBarEdge && this.leftEdge<= rightBarEdge)) {
            moveY = - moveY;
        }
        if (this.leftEdge <= 0 || this.rightEdge >= CANVAS_WIDTH) {
            moveX = - moveX;
        }
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
                bricks.splice(i,1); // make crushed brick disappeared
            }
        }
    }

    this.move = function (leftBarEdge, rightBarEdge) {
        this.updateMovingAngle();
        this.moveRules(leftBarEdge, rightBarEdge);
        this.x -= moveX;
        this.y -= moveY;
        this.updatePosition();
        this.draw();
    }
}
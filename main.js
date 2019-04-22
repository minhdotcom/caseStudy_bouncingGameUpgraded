var context = canvas.getContext("2d"),
    interval;
LOG = console.log;

var barX = new Bar (CANVAS_WIDTH / 2 - BAR_WIDTH / 2, CANVAS_HEIGHT - BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT, "0000ff", BAR_SPEED),
    barY = new Bar (CANVAS_WIDTH / 2 - BAR_WIDTH / 2, CANVAS_HEIGHT - BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT, "0000ff", BAR_SPEED);

var tempBarX = 0,
    tempBallX = 0;

barX.setBarKeyBoard();

function change_ball_angle (bar) {

    if (bar.x == tempBarX) bar.accelaration = 0; else bar.accelaration ++;
    if (bar.accelaration > BAR_ACCELERATION_MAX) {bar.accelaration = BAR_ACCELERATION_MAX;}

    if (ball.bottomEdge >= bar.y && ball.leftEdge >= bar.leftEdge && ball.rightEdge <= bar.rightEdge) {
        if(((bar.x - tempBarX) / (ball.x - tempBallX)) > 0) {
            ball.moveAngle -= bar.accelaration / (100 - BALL_ANGLE_SENSITIVE);
        } else {
            ball.moveAngle += bar.accelaration / (100 - BALL_ANGLE_SENSITIVE);
        }
        // ball.moveAngle = -1000;
        if (ball.moveAngle < -0.9) {
            ball.moveAngle = -0.9;
        }
        ball.updateMoveAngle();
    }

    tempBarX = bar.x;
    tempBallX = ball.x;
}

function init_game () {
    interval = setInterval(function () {
        change_ball_angle(barX);
        ball.move(barX.x, barX.x + barX.width);
        barX.move();
        for (let i = 0; i < bricks.length; i++) {
            bricks[i].draw();
        }
    }, 100 - GAME_SPEED);
}

init_game();
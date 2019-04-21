var context = canvas.getContext("2d"),
    interval;
LOG = console.log;
var tempBarX = 0,
    tempBallX = 0;

bar.setBarKeyBoard();

function init_game () {
    interval = setInterval(function () {
        ball.move(bar.x, bar.x + bar.width);
        bar.move();
        if (bar.x == tempBarX) bar.accelaration = 0; else bar.accelaration ++;
        if (bar.accelaration > BAR_ACCELERATION_MAX) {bar.accelaration = BAR_ACCELERATION_MAX;}
        if (ball.bottomEdge >= bar.y) {
            if((bar.x - tempBarX) / (ball.x - tempBallX) > 0) {
                ball.moveAngle -= bar.accelaration / 50;
            } else {
                ball.moveAngle += bar.accelaration / 50;
            }
        }
        tempBarX = bar.x;
        tempBallX = ball.x;
        for (let i = 0; i < bricks.length; i++) {
            bricks[i].draw();
        }
    }, 100 - GAME_SPEED);
}

init_game();
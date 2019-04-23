var context = document.getElementById("canvas").getContext("2d"),
    interval,
    tempBarX = 0,
    tempBallX = 0,
    tempBricksLength = 0,
    barAcceleration,
    barX = new Bar (BARX_POSITION_X, BARX_POSITION_Y, BAR_WIDTH, BAR_HEIGHT, BAR_COLOR, BAR_SPEED_X, "horizon"),
    barX2 = new Bar (BARX_POSITION_X, 0, BAR_WIDTH, BAR_HEIGHT, BAR_COLOR, BAR_SPEED_X, "horizon"),
    barY = new Bar (0, BARY_POSITION_Y, BAR_THICKNESS, 100, BAR_COLOR, BAR_SPEED_Y, "vertical"),
    barY2 = new Bar (CANVAS_WIDTH - 15, BARY_POSITION_Y, BAR_THICKNESS, 100, BAR_COLOR, BAR_SPEED_Y, "vertical"),
    borderX1 = new Border(0, 0, HELP_BORDER_X, HELP_THICKNESS, "#ffd700"),
    borderX2 = new Border(CANVAS_WIDTH - HELP_BORDER_X, 0, HELP_BORDER_X, HELP_THICKNESS, "#ffd700"),
    borderX3 = new Border(0, CANVAS_HEIGHT - HELP_THICKNESS, HELP_BORDER_X, HELP_THICKNESS, "#ffd700"),
    borderX4 = new Border(CANVAS_WIDTH - HELP_BORDER_X, CANVAS_HEIGHT - HELP_THICKNESS, HELP_BORDER_X, HELP_THICKNESS, "#ffd700"),
    borderY1 = new Border(0, 0, HELP_THICKNESS, HELP_BORDER_Y, "#ffd700"),
    borderY2 = new Border(CANVAS_WIDTH - HELP_THICKNESS, 0, HELP_THICKNESS, HELP_BORDER_Y, "#ffd700"),
    borderY3 = new Border(0, CANVAS_HEIGHT - HELP_BORDER_Y, HELP_THICKNESS, HELP_BORDER_Y, "#ffd700"),
    borderY4 = new Border(CANVAS_WIDTH - HELP_THICKNESS, CANVAS_HEIGHT - HELP_BORDER_Y, HELP_THICKNESS, HELP_BORDER_Y, "#ffd700");


function redraw_borders () {
    borderX1.draw();
    borderX2.draw();
    borderX3.draw();
    borderX4.draw();
    borderY1.draw();
    borderY2.draw();
    borderY3.draw();
    borderY4.draw();
}

barX.setBarKeyBoard();
barX2.setBarKeyBoard();
barY.setBarKeyBoard();
barY2.setBarKeyBoard();

function change_ball_angle (bar) {
    if (bar.x === tempBarX) barAcceleration = 0; else barAcceleration ++;
    if (ball.leftEdge >= bar.leftEdge && ball.rightEdge <= bar.rightEdge && ball.bottomEdge >= bar.y) {
        if((bar.x - tempBarX) / (ball.x - tempBallX) > 0) {
            ball.moveAngle -= barAcceleration / (100 - BALL_ANGLE_SENSITIVE);
        } else {
            ball.moveAngle += barAcceleration / (100 - BALL_ANGLE_SENSITIVE);
        }
        if (ball.moveAngle < -0.8) {ball.moveAngle = -0.8;}
        ball.updateMoveAngle();
    }
    tempBarX = bar.x;
    tempBallX = ball.x;
}

function increase_ball_speed () {
    ball.speed += (tempBricksLength - bricks.length) * BALL_SPEED_INCREASE;
    tempBricksLength = bricks.length;
}

function init_game () {
    interval = setInterval(function () {
        change_ball_angle(barX);
        ball.move(barX.leftEdge, barX.rightEdge, barY.topEdge, barY.bottomEdge);
        barX.move();
        barX2.move();
        barY.move();
        barY2.move();
        for (let i = 0; i < bricks.length; i++) {
            bricks[i].draw();
        }
        redraw_borders();
        increase_ball_speed();
    }, 100 - GAME_SPEED);
}

init_game();


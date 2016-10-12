let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let ball = {};
ball.radius = 10;
ball.x = canvas.width / 2;
ball.y = canvas.height - 30;
ball.speedX = 2;
ball.speedY = -2;

let paddle = {};
paddle.height = 10;
paddle.width = 75;
paddle.x =(canvas.width - paddle.width) / 2;

let rightPressed = false;
let leftPressed = false;

let color = 'red';

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;


function changeColor(color) {
	switch (color){
		case 'red':color = 'green';break;
		case 'green':color = '#0095DD"';break;
		case '#0095DD"':color = 'purple';break;
		case 'purple':color = 'yellow';break;
		case 'yellow':color = 'pink';break;
		case 'pink':color = 'red';break;
	}
	return color;
}

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(ball.x > b.x && ball.x < b.x+brickWidth && ball.y > b.y && ball.y < b.y+brickHeight) {
                    ball.speedY = -ball.speedY;
                    b.status = 0;
					score++;
					color = changeColor(color);
					if(score == brickColumnCount * brickRowCount){
						alert("YOU 	WIN, CONGRATULATIONS! YOUR SCORE IS : " +score);
						document.location.reload();
					}
                }
            }
        }
    }
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, 10, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
		}
	}
}

function drawScore() {
	ctx.font = "16p Arial";
	ctx.fontStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20)
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
    collisionDetection();

	if(ball.x + ball.speedX > canvas.width - ball.radius || ball.x + ball.speedX < ball.radius) {
		ball.speedX = -ball.speedX;
	}
	if(ball.y + ball.speedY < ball.radius) {
		ball.speedY = -ball.speedY;
	}
	else if(ball.y + ball.speedY > canvas.height - ball.radius) {
		if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
			ball.speedY = -ball.speedY;
		}
		else {
			alert("GAME OVER! YOUR SCORE IS : " + score);
			document.location.reload();
		}
	}


	if(rightPressed && paddle.x < canvas.width - paddle.width) {
		paddle.x += 7;
	}
	else if(leftPressed && paddle.x > 0) {
		paddle.x -= 7;
	}

	ball.x += ball.speedX;
	ball.y += ball.speedY;
}

setInterval(draw, 10);
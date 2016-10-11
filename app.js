let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let ball = {};
ball.radius = 10;
ball.x = canvas.width / 2;
ball.y = canvas.height - 30;
ball.speedX = 2;
ball.speedY = -2;

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, 10, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();

	if(ball.x + ball.speedX > canvas.width - ball.radius || ball.x + ball.speedX < ball.radius) {
		ball.speedX = -ball.speedX;
	}

	if(ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
		ball.speedY = -ball.speedY;
	}

	ball.x += ball.speedX;
	ball.y += ball.speedY;
}

setInterval(draw, 10);
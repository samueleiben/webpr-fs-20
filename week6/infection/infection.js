
const canvas  = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "black";

const radius = 10;

const ball = {x: 100, y: 100} ;

function start() {
    setInterval(() => {
        nextBoard();
    }, 1000 / 50);
}

function nextBoard() {
    fillBox(ball, radius);
}

function fillBox(ball, radius) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}



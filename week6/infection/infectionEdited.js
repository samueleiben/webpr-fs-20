const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.fillStyle = 'black';

const maxWidth = canvas.width;
const maxHeight = canvas.height;

const radius = 10;

const balls = [
  { x: 100, y: 100, dx: 1, dy: 1 },
  { x: 100, y: 100, dx: -0.5, dy: -0.5 }
];

const addBallButton = document.getElementById('addBall');
const addInfectedButton = document.getElementById('addInfected');

const newBall = infected => evt =>
  balls.push({
    x: maxWidth / 2,
    y: maxHeight / 2,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    infected
  });

addBallButton.onclick = newBall(false);
addInfectedButton.onclick = newBall(true);

function start() {
  setInterval(() => {
    nextBoard();
  }, 1000 / 50);
}

const distance = (radius * 2) ** 2; // without * 2: true, if centers meet
const touching = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < distance;

function nextBoard() {
  const infectedBalls = [];
  const cleanBalls = [];
  balls.forEach(ball =>
    ball.infected ? infectedBalls.push(ball) : cleanBalls.push(ball)
  );

  infectedBalls.forEach(infected =>
    cleanBalls.forEach(clean =>
      touching(infected, clean) ? (clean.infected = true) : undefined
    )
  );

  balls.forEach(ball => display(ball, radius));
}

function display(ball, radius) {
  context.fillStyle = 'gold';
  fillBox(ball, radius + 1);
  context.fillStyle = !ball.infected ? 'black' : 'red';
  ball.x = (ball.x + maxWidth + ball.dx) % maxWidth;
  ball.y = (ball.y + maxHeight + ball.dy) % maxHeight;
  fillBox(ball, radius);
}

function fillBox(ball, radius) {
  context.beginPath();
  context.arc(ball.x, ball.y, radius, 0, 6.3, false);
  context.fill();
}

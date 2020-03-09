
const radius = 10;
const ball = {x:Math.random()*400, y:10, dx: 5, dy: 1};
const old  = {x: ball.x, y: ball.y};

const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.type  = oscillator.SINE;
oscillator.frequency.value = 440; // default

const audioControl = audioContext.createGain();
audioControl.gain.value = 0;

oscillator.connect(audioControl);
audioControl.connect(audioContext.destination);

function beep(offset = 0) {
    oscillator.frequency.value = 440 + offset;
    audioControl.gain.value = 1;
    setTimeout( () => audioControl.gain.value = 0, 500 )
}

function start() {
    oscillator.start(0);
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "black";

    setInterval(() => {
        if (Math.abs(ball.dx) < 0.1 && Math.abs(ball.dy) < 0.1) return;
        nextBoard();
        display(context);
    }, 1000 / 20);
}

function nextBoard() {
    old.x = ball.x;
    old.y = ball.y;
    if (ball.y >= 390 && ball.dy > 0) {  // ball.y < 0 cannot occur due to conservation of energy
        if ( Math.abs(ball.dy) > 4) {
            beep(Math.abs(ball.dy) * 20);
        } else {
            oscillator.stop(0);    // avoid surface noise
            ball.dx *= 0.99;       // surface traction
        }
        ball.dy -= 4;
        ball.dy *= -1;
    }
    if (ball.x <= 10 && ball.dx < 0 || ball.x >= 390 && ball.dx > 0) {
        beep();
        ball.dx *= -1;
        ball.dx *= 0.8;
    }
    ball.x  += ball.dx;
    ball.y  += ball.dy;
    ball.y = Math.min(390, ball.y);
    ball.dy += 1.5 ;                // constant acceleration
}

function display(context) {
    context.clearRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}



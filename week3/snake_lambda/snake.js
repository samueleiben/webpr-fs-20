const id = x => x;
const fst = x => y => x;
const snd = x => y => y;
const M = f => f(f); // mockingbird
const konst = fst;
const T = fst;
const F = snd;
const and = first => second => first(second)(first);
const or = M;

const Pair = first => second => f => f(first)(second);
const getX = fst;
const getY = snd;

const north = {dx:  0, dy: -1};
const east  = {dx:  1, dy:  0};
const south = {dx:  0, dy:  1};
const west  = {dx: -1, dy:  0};

let direction = north;

const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

let snake = [
    Pair(10)(5),
    Pair(10)(6),
    Pair(10)(7),
    Pair(10)(8),
];
let food = Pair(15)(15);

function snakeEquals(a, b) { return a(getX) === b(getX) && a(getY) === b(getY) }

function changeDirection(orientation) {
    const idx = orientation.indexOf(direction);
    direction = orientation[idx + 1];
}

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const rightArrow = 39;
    const leftArrow  = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : countercw;
        changeDirection(orientation);
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
}

function nextBoard() {
    const maxX = 20;
    const maxY = 20;
    const oldHead = snake[0];

    function inBounds(x, max) {
        if (x < 0)   { return max - 1 }
        if (x > max) { return 0 }
        return x
    }

    const head = Pair(inBounds(oldHead(getX) + direction.dx, maxX))(inBounds(oldHead(getY) + direction.dy, maxY));

    if (snakeEquals(food, head)) {  // have we found any food?
        // food is now immutable --> create new pair for the new food position instead
		// food.x = Math.floor(Math.random() * 20);   // place new food at random location
        // food.y = Math.floor(Math.random() * 20);
		food = Pair(Math.floor(Math.random() * 20))(Math.floor(Math.random() * 20));
    } else {
        snake.pop(); // no food found => no growth despite new head => remove last element
    }

    snake.unshift(head); // put head at front of the list
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw all elements
    context.fillStyle = "cyan";
    snake.forEach(element =>
        fillBox(context, element)
    );
    context.fillStyle = "green";
    fillBox(context, snake[0]);
    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillRect(element(getX) * 20 + 1, element(getY) * 20 + 1, 18, 18);
}



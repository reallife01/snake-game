const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const backgroundColor = 'green';
const snakeColor = '#ff5c8a';
const snakeBorder = '#d7b9d5';
const foodColor = 'white';
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0, }

]

const createFood = () => {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}

const drawFood = () => {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

const gameStart = () => {
    running = true;
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
}

const nextTick = () => {
    if (running) {
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 1000)
    }
    else {
        displayGameOver()

    }
}
gameStart()

const clearBoard = () => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}

const drawSnake = () => {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

const moveSnake = () => {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head)

    // if food is eaten 
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 5;
        scoreText.textContent = score;
        createFood()
    }
    else {
        snake.pop()
    }
}

const checkGameOver = () => {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }
}

const displayGameOver = () => {
    ctx.font = '50px MV Boli';
    ctx.fillStyle = '#98621f';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER🥚🐍', gameWidth / 2, gameHeight / 2);

    running = false;

}

window.addEventListener('keydown', changeDirection)
resetBtn.addEventListener('click', resetGame)

function changeDirection(event) {
    const keyPress = event.keyCode;

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity === -unitSize);

    const goingDown = (yVelocity === unitSize);

    const goingRight = (xVelocity === unitSize);
    const goingLeft = (xVelocity === -unitSize);

    switch (true) {
        case (keyPress === LEFT && !goingRight):
            xVelocity = -unitSize
            yVelocity = 0;
            break
        case (keyPress === UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize
            break
        case (keyPress === RIGHT && !goingLeft):
            xVelocity = unitSize
            yVelocity = 0;
            break
        case (keyPress === DOWN && !goingUp):
            xVelocity = 0
            yVelocity = unitSize;
    }
}

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0, }
    ]
    gameStart()


}
















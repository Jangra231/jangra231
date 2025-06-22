<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Snake Game</title>
  <style>
    body {
      margin: 0;
      background-color: #111;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      font-family: Arial, sans-serif;
    }
    h1 {
      margin: 20px;
    }
    canvas {
      border: 2px solid #fff;
      background-color: #000;
    }
  </style>
</head>
<body>
  <h1>🐍 Snake Game</h1>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <script src="snake.js"></script>
</body>
</html>
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = randomPosition();
let dx = box;
let dy = 0;
let score = 0;

function randomPosition() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomPosition();
    score++;
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize ||
    snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    alert(`Game Over! Your Score: ${score}`);
    document.location.reload();
  }
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  else if (event.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (event.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
}

document.addEventListener("keydown", changeDirection);
setInterval(draw, 100);

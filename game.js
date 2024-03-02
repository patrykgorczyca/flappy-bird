const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
let intervalId;
let intervalTime = 1000;
let stopped = false;

const squares = [];
let speed = 1;
const player_square = {
  x: canvas.width/2 - 25,
  y: 20,
  width: 50,
  height: 50,
}

function update_player_square() {
  context.fillStyle = "blue";
  context.fillRect(player_square.x, player_square.y, player_square.width, player_square.height);
}

function draw_square() {
  context.fillStyle = "red";
  const x = 25 + Math.random() * (canvas.width - 50);
  const y = 700;
  const width = 50;
  const height = 50;
  context.fillRect(x, y, width, height);
  return {x, y, width, height};
}

function update_kill_squares() {
  squares.forEach(function(element){
    element.y -= speed
    context.fillStyle = "red";
    context.fillRect(element.x, element.y, element.width, element.height);
  })
  speed += 0.002;
  intervalTime -= 0.1;
}

function update() {
    if (!stopped) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      update_kill_squares()
      update_player_square()
    }
    requestAnimationFrame(update);
    
    squares.forEach(function(element) {
      if (
        player_square.x < element.x + 50 &&
        player_square.x + 50 > element.x &&
        player_square.y < element.y + 50 &&
        player_square.y + 50 > element.y
        ) {
          stopped = true;
          const deathscreen = document.getElementById("deathscreen");
          deathscreen.style.display = "block";
        }
    })
}

update()

function create_square() {
  if (!stopped) {
  squares.push(draw_square());
  clearInterval(intervalId);
  intervalId = setInterval(create_square, intervalTime)
  }
  
}

function replay() {
  stopped = false
  deathscreen.style.display = "none";
  squares.splice(0, squares.length);
  intervalTime = 1000;
  speed = 1;
}

document.addEventListener("mousemove", function(event) {
  player_square.x = event.x - 25
})

intervalId = setInterval(create_square, 1000)

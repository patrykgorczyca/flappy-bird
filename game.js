const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,

    draw: function () {
        ctx.fillStyle = '#FF5733';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    },

    update: function () {
        this.velocity += 0.5; // Adjust gravity as needed
        this.y += this.velocity;

        // Ensure the bird stays within the canvas
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocity = 0;
        }
    },

    jump: function () {
        this.velocity = -10; // Adjust jump strength as needed
    },
};

const obstacles = [];

function createObstacle() {
    const gapHeight = 190; // Adjust the gap between upper and lower obstacles
    const minHeight =   50; // Minimum height for the upper obstacle
    const maxHeight = canvas.height - gapHeight - minHeight;

    const upperHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    const lowerHeight = canvas.height - upperHeight - gapHeight;

    obstacles.push({
        x: canvas.width,
        upperHeight: upperHeight,
        lowerHeight: lowerHeight,
        width: 30, // Adjust obstacle width
        color: '#008000', // Adjust obstacle color
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 2; // Adjust obstacle speed

        // Remove obstacles that are off-screen
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
        }
    }

    // Create a new obstacle every 100 frames (adjust as needed)
    if (frameCount % 100 === 0) {
        createObstacle();
    }
}

function drawObstacles() {
    for (const obstacle of obstacles) {
        // Draw upper obstacle
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.upperHeight);

        // Draw lower obstacle
        ctx.fillRect(obstacle.x, canvas.height - obstacle.lowerHeight, obstacle.width, obstacle.lowerHeight);
    }
}

let frameCount = 0;

function update() {
    bird.update();
    updateObstacles();

    // Check for collisions with obstacles
    for (const obstacle of obstacles) {
        if (
            bird.x + bird.radius > obstacle.x &&
            bird.x - bird.radius < obstacle.x + obstacle.width &&
            (bird.y - bird.radius < obstacle.upperHeight || bird.y + bird.radius > canvas.height - obstacle.lowerHeight)
        ) {
            // Collision detected, restart the game or handle as needed
            alert('Game Over!');
            obstacles.length = 0; // Clear obstacles array
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObstacles();
    bird.draw();

    frameCount++;

    requestAnimationFrame(update);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        bird.jump();
    }
});

update();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let birdY = canvas.height / 2;
let birdVelocity = 0;
const gravity = 0.5;

function drawBird() {
    ctx.fillStyle = '#FF5733'; // Bird color
    ctx.beginPath();
    ctx.arc(50, birdY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function update() {
    // Update game state
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawBird();

    // Repeat the update function
    requestAnimationFrame(update);
}

// Handle user input
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        birdVelocity = -10; // Jump when space key is pressed
    }
});

// Start the game loop
update();

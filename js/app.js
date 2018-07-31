// Enemies constructor
var Enemy = function(eType, x, y, speed) {
    this.sprite = eType;
    this.speed = speed;
    this.x = x;
    this.y = y;
};

// Updates the enemy's position over time
Enemy.prototype.update = function(dt) {
    if (this.x < 500) {
        this.x += this.speed * dt 
    } else if (this.x >= 500){
        this.x = -50;
    }
};

// Draws enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor
const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
    this.reset = function(){
        this.x = 200;
        this.y = 390;
    }    
}

//Updates player's position over time
Player.prototype.update = function(dt) { 
// Detects when a collision happens and move the player back to initial position
   for(enemy of allEnemies) {
        if((this.y-5 == enemy.y) && (this.x < enemy.x+50 && this.x > enemy.x-50)){
            this.reset();
            console.log('reset')
        } 
// Detects when the player arrives "water" and show the game over modal.
        if(this.y == 0) {
            modal.style.display = 'block';
            this.y = 0; 
        }
        
}}
// Resets the board for a new game
Player.prototype.replay = function() {
    this.x = 200;
    this.y = 390;
    modal.style.display = 'none';
} 
// Draws player on every new rendering
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Positions player based on event listener
Player.prototype.handleInput = function(k) {
    switch(k) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 80;
            break;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 390) {
        this.y = 390;
    }
    if (this.y < 0) {
        this.y = 0;
    }
}

// Instantiates enemies
const allEnemies = [
    new Enemy('images/enemy-bug.png', 0, 65, 100),
    new Enemy('images/Rock.png', 0, 145, 250),
    new Enemy('images/enemy-bug.png', 0, 225, 160)
]
// Instantiate player
const player = new Player();

// Listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Game Over modal
const modal = document.querySelector('.modal-background');
// Game Over modal button
const replayBtn = document.querySelector('.modalBtn');
// Modal button event listener
replayBtn.addEventListener('click', replay);
// Replay function declaration
function replay() {
    player.replay();
}

// Player management and physics
class Player {
    constructor(canvasWidth, canvasHeight) {
        this.x = 100;
        this.y = canvasHeight - 100;
        this.width = 32;
        this.height = 32;
        this.velX = 0;
        this.velY = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.onGround = false;
        this.color = '#FF6B6B';
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    
    update(gravity, friction, platforms) {
        // Apply gravity
        this.velY += gravity;
        
        // Update position
        this.x += this.velX;
        this.y += this.velY;
        
        // Reset ground state
        this.onGround = false;
        
        // Platform collision
        platforms.forEach(platform => {
            if (this.checkCollision(platform)) {
                // Landing on top
                if (this.velY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velY = 0;
                    this.onGround = true;
                }
            }
        });
        
        // Screen boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvasWidth) {
            this.x = this.canvasWidth - this.width;
        }
        
        // Check if fallen off screen
        return this.y > this.canvasHeight;
    }
    
    handleInput(keys) {
        // Horizontal movement
        if (keys['a'] || keys['arrowleft']) {
            this.velX = -this.speed;
        } else if (keys['d'] || keys['arrowright']) {
            this.velX = this.speed;
        } else {
            this.velX *= 0.8; // friction
        }
        
        // Jumping
        if ((keys['w'] || keys['arrowup'] || keys[' ']) && this.onGround) {
            this.velY = -this.jumpPower;
            this.onGround = false;
        }
    }
    
    checkCollision(rect) {
        return this.x < rect.x + rect.width &&
               this.x + this.width > rect.x &&
               this.y < rect.y + rect.height &&
               this.y + this.height > rect.y;
    }
    
    render(ctx) {
        // Player body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Player details (simple Mario-like appearance)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + 8, this.y + 4, 16, 8); // Hat
        ctx.fillStyle = '#FFE4C4';
        ctx.fillRect(this.x + 8, this.y + 12, 16, 8); // Face
        ctx.fillStyle = '#0000FF';
        ctx.fillRect(this.x + 4, this.y + 20, 24, 12); // Shirt
    }
    
    respawn() {
        this.x = 100;
        this.y = this.canvasHeight - 100;
        this.velX = 0;
        this.velY = 0;
    }
}

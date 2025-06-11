// Enemy management and AI
class EnemyManager {
    constructor() {
        this.enemies = [];
    }
    
    setEnemies(enemies) {
        this.enemies = enemies;
    }
    
    update(platforms, canvasWidth) {
        this.enemies.forEach(enemy => {
            if (!enemy.alive) return;
            
            // Move enemy
            enemy.x += enemy.velX;
            
            // Bounce off screen edges
            if (enemy.x <= 0 || enemy.x + enemy.width >= canvasWidth) {
                enemy.velX *= -1;
            }
            
            // Enhanced platform collision for enemies
            let onPlatform = false;
            platforms.forEach(platform => {
                if (enemy.x + enemy.width > platform.x && 
                    enemy.x < platform.x + platform.width &&
                    enemy.y + enemy.height >= platform.y &&
                    enemy.y + enemy.height <= platform.y + platform.height + 10) {
                    onPlatform = true;
                }
            });
            
            // Turn around at platform edges
            if (!onPlatform) {
                enemy.velX *= -1;
            }
        });
    }
    
    checkPlayerCollision(player) {
        let collisionResult = { hit: false, defeated: false, score: 0 };
        
        this.enemies.forEach(enemy => {
            if (!enemy.alive) return;
            
            if (this.checkCollision(player, enemy)) {
                collisionResult.hit = true;
                
                // Check if player is jumping on enemy
                if (player.velY > 0 && player.y < enemy.y) {
                    // Defeat enemy
                    enemy.alive = false;
                    collisionResult.defeated = true;
                    collisionResult.score = 200;
                    player.velY = -8; // Small bounce
                }
            }
        });
        
        return collisionResult;
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    render(ctx) {
        this.enemies.forEach(enemy => {
            if (enemy.alive) {
                // Enemy body
                ctx.fillStyle = enemy.color;
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                
                // Enemy eyes
                ctx.fillStyle = 'white';
                ctx.fillRect(enemy.x + 4, enemy.y + 4, 4, 4);
                ctx.fillRect(enemy.x + 16, enemy.y + 4, 4, 4);
                ctx.fillStyle = 'black';
                ctx.fillRect(enemy.x + 5, enemy.y + 5, 2, 2);
                ctx.fillRect(enemy.x + 17, enemy.y + 5, 2, 2);
                
                // Add spikes for advanced enemies (orange ones)
                if (enemy.color === '#FF4500') {
                    ctx.fillStyle = '#FFD700';
                    ctx.fillRect(enemy.x + 8, enemy.y - 4, 3, 4);
                    ctx.fillRect(enemy.x + 13, enemy.y - 4, 3, 4);
                }
            }
        });
    }
}

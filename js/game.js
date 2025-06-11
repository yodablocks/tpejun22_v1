// Main game class
class SimpleMarioGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Game state
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = true;
        this.levelMessage = null;
        this.levelMessageTime = 0;
        
        // Physics
        this.gravity = 0.8;
        this.friction = 0.8;
        
        // Input handling
        this.keys = {};
        this.setupInput();
        this.showMenu = true; //
        this.initializeMenu(); //
        
        // Initialize game components
        this.player = new Player(this.canvas.width, this.canvas.height);
        this.enemyManager = new EnemyManager();
        this.blockchain = new BlockchainIntegration();
        this.multiplayer = new VircadiaMultiplayer();
        
        // Initialize level
        this.initializeLevel();
        
        // Start game loop
        this.gameLoop();
    }
    
    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key.toLowerCase() === 'r') {
                this.restartLevel();
            }
            // Connect wallet with 'C' key
            if (e.key.toLowerCase() === 'c') {
                this.connectWallet();
            }
            // Connect multiplayer with 'M' key
            if (e.key.toLowerCase() === 'm') {
                this.connectMultiplayer();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    
    async connectWallet() {
        const result = await this.blockchain.connectWallet();
        if (result.success) {
            console.log('Wallet connected:', result.account);
            // Could show UI notification here
        } else {
            console.error('Failed to connect wallet:', result.error);
        }
    }
    
    async connectMultiplayer() {
        const result = await this.multiplayer.connect();
        if (result.success) {
            console.log('Multiplayer connected:', result.playerId);
            // Set up multiplayer callbacks
            this.multiplayer.onPlayerUpdate((playerData) => {
                console.log('Other player update:', playerData);
                // Could render other players here
            });
        }
    }
    
    initializeLevel() {
        this.platforms = LevelManager.createLevel(this.level, this.canvas.width, this.canvas.height);
        this.coinsList = LevelManager.createCoins(this.level, this.canvas.width, this.canvas.height);
        this.enemyManager.setEnemies(LevelManager.createEnemies(this.level, this.canvas.width, this.canvas.height));
        this.goal = { 
            x: this.canvas.width * 0.9, 
            y: this.canvas.height - 80, 
            width: 40, 
            height: 40 
        };
    }
    
    handleInput() {
        this.player.handleInput(this.keys);
    }
    
    update() {
        // Update player
        const playerFell = this.player.update(this.gravity, this.friction, this.platforms);
        if (playerFell) {
            this.loseLife();
        }
        
        // Update enemies
        this.enemyManager.update(this.platforms, this.canvas.width);
        
        // Check collisions
        this.checkCollisions();
        
        // Send multiplayer data
        if (this.multiplayer.isConnected()) {
            this.multiplayer.sendPlayerPosition(this.player.x, this.player.y, this.level);
        }
    }
    
    checkCollisions() {
        // Coin collection
        this.coinsList.forEach(coin => {
            if (!coin.collected && this.player.checkCollision(coin)) {
                coin.collected = true;
                this.score += 100;
                this.updateUI();
                
                // Send multiplayer action
                if (this.multiplayer.isConnected()) {
                    this.multiplayer.sendPlayerAction('collect_coin', { coinIndex: this.coinsList.indexOf(coin) });
                }
            }
        });
        
        // Enemy collision
        const enemyCollision = this.enemyManager.checkPlayerCollision(this.player);
        if (enemyCollision.hit) {
            if (enemyCollision.defeated) {
                this.score += enemyCollision.score;
                this.updateUI();
                
                // Send multiplayer action
                if (this.multiplayer.isConnected()) {
                    this.multiplayer.sendPlayerAction('defeat_enemy', { score: enemyCollision.score });
                }
            } else {
                this.loseLife();
            }
        }
        
        // Goal collision
        if (this.player.checkCollision(this.goal)) {
            this.levelComplete();
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // If game is over, show game over screen
        if (!this.gameRunning && this.lives <= 0) {
            this.gameOver();
            return;
        }
        
        // Render platforms
        this.platforms.forEach(platform => {
            this.ctx.fillStyle = platform.color;
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
            this.ctx.fillRect(platform.x, platform.y, platform.width, 4);
        });
        
        // Render coins
        this.coinsList.forEach(coin => {
            if (!coin.collected) {
                this.ctx.fillStyle = '#FFD700';
                this.ctx.beginPath();
                this.ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.fillStyle = '#FFFF00';
                this.ctx.beginPath();
                this.ctx.arc(coin.x + coin.width/2 - 3, coin.y + coin.height/2 - 3, 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Render enemies
        this.enemyManager.render(this.ctx);
        
        // Render player
        this.player.render(this.ctx);
        
        // Render goal
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillRect(this.goal.x, this.goal.y, this.goal.width, this.goal.height);
        this.ctx.fillStyle = this.level >= 5 ? '#9400D3' : '#FF0000';
        this.ctx.fillRect(this.goal.x, this.goal.y, 30, 20);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px Arial';
        this.ctx.fillText(this.level >= 5 ? 'FINAL' : 'GOAL', this.goal.x + 2, this.goal.y + 12);
        
        // Render level transition message
        if (this.levelMessage && this.levelMessageTime > 0) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.levelMessage, this.canvas.width/2, this.canvas.height/2);
            
            const levelDescriptions = LevelManager.getLevelDescriptions();
            this.ctx.fillStyle = 'white';
            this.ctx.font = '24px Arial';
            this.ctx.fillText(levelDescriptions[this.levelMessage] || '', this.canvas.width/2, this.canvas.height/2 + 50);
            this.levelMessageTime--;
            this.ctx.textAlign = 'left';
        }
        
        // Render connection status
        this.renderConnectionStatus();
    }
    
    renderConnectionStatus() {
        let statusY = 150;
        this.ctx.fillStyle = 'white';
        this.ctx.font = '12px Arial';
        
        if (this.blockchain.isConnected()) {
            this.ctx.fillText('🔗 Wallet: ' + this.blockchain.getWalletAddress().substring(0, 10) + '...', 10, statusY);
            statusY += 15;
        }
        
        if (this.multiplayer.isConnected()) {
            this.ctx.fillText('🎮 Multiplayer: Connected (' + this.multiplayer.getPlayerCount() + ' players)', 10, statusY);
        }
    }
    
    loseLife() {
        this.lives--;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.player.respawn();
        }
    }
    
    async levelComplete() {
        this.score += 1000 + (this.level * 500);
        
        // Save score to blockchain
        if (this.blockchain.isConnected()) {
            await this.blockchain.saveHighScore(this.score, this.level);
        }
        
        // Send multiplayer completion
        if (this.multiplayer.isConnected()) {
            this.multiplayer.sendPlayerAction('level_complete', { level: this.level, score: this.score });
        }
        
        if (this.level >= 5) {
            this.gameWon();
            return;
        }
        
        this.level++;
        this.updateUI();
        this.player.respawn();
        this.initializeLevel();
        this.showLevelMessage('LEVEL ' + this.level);
    }
    
    async gameWon() {
        this.gameRunning = false;
        
        // Mint NFT for completing the game
        if (this.blockchain.isConnected()) {
            await this.blockchain.mintNFT(this.score, 5);
        }
        
        this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🎉 YOU WIN! 🎉', this.canvas.width/2, this.canvas.height/2 - 60);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '28px Arial';
        this.ctx.fillText('All Levels Completed!', this.canvas.width/2, this.canvas.height/2);
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Final Score: ' + this.score, this.canvas.width/2, this.canvas.height/2 + 40);
        this.ctx.fillText('Press R to Play Again', this.canvas.width/2, this.canvas.height/2 + 80);
        this.drawFireworks();
    }
    
    gameOver() {
        this.gameRunning = false;
        this.ctx.fillStyle = 'rgba(0,0,0,0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Main "GAME OVER" text
        this.ctx.fillStyle = '#FF0000';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width/2, this.canvas.height/2 - 40);
        
        // Additional "A game over" text
        this.ctx.fillStyle = 'white';
        this.ctx.font = '32px Arial';
        this.ctx.fillText('A game over', this.canvas.width/2, this.canvas.height/2 + 10);
        
        // Score and restart instruction
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Final Score: ' + this.score, this.canvas.width/2, this.canvas.height/2 + 60);
        this.ctx.fillText('Press R to Restart', this.canvas.width/2, this.canvas.height/2 + 100);
    }
    
    showLevelMessage(message) {
        this.levelMessage = message;
        this.levelMessageTime = 120;
    }
    
    drawFireworks() {
        const time = Date.now() * 0.01;
        for (let i = 0; i < 5; i++) {
            const x = this.canvas.width * (0.2 + i * 0.15);
            const y = this.canvas.height * 0.3;
            this.ctx.fillStyle = `hsl(${(time + i * 60) % 360}, 100%, 50%)`;
            this.ctx.beginPath();
            this.ctx.arc(x + Math.sin(time + i) * 30, y + Math.cos(time + i) * 20, 5, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    restartLevel() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = true;
        this.levelMessage = null;
        this.levelMessageTime = 0;
        this.player.respawn();
        this.initializeLevel();
        this.updateUI();
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
    }
    /* 
    gameLoop() {
        if (this.gameRunning) {
            this.handleInput();
            this.update();
        }
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    */
    gameLoop() {
        if (!this.showMenu && this.gameRunning) {
            this.handleInput();
            this.update();
        }
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    // Handle window resize
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.player.canvasWidth = this.canvas.width;
        this.player.canvasHeight = this.canvas.height;
        this.initializeLevel();
    }

// ADD ALL THESE METHODS HERE (after resize method):
    initializeMenu() {
        const startBtn = document.getElementById('startGameBtn');
        const connectBtn = document.getElementById('connectWalletBtn');
        const leaderboardBtn = document.getElementById('leaderboardBtn');
        const helpBtn = document.getElementById('helpBtn');
    
        startBtn.addEventListener('click', () => this.startGame());
        connectBtn.addEventListener('click', () => this.connectWalletFromMenu());
        leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        helpBtn.addEventListener('click', () => this.showHelp());
    }

    startGame() {
        document.getElementById('gameMenu').classList.add('hidden');
        this.showMenu = false;
        this.gameRunning = true;
    }

    async connectWalletFromMenu() {
        const result = await this.blockchain.connectWallet();
        if (result.success) {
            document.getElementById('walletAddress').textContent = 
            result.account.substring(0, 6) + '...' + result.account.substring(38);
            document.getElementById('walletStatus').classList.remove('hidden');
            document.getElementById('connectWalletBtn').textContent = '✅ Wallet Connected';
        } else {
            alert('Failed to connect wallet: ' + result.error);
        }
    }

    showLeaderboard() {
        alert('🏆 Leaderboard\n\nFeature coming soon!\nConnect your wallet to save high scores on Polygon blockchain.');
    }

    showHelp() {
        alert('🎮 CONTROLS:\n\nWASD/Arrow Keys - Move & Jump\nR - Restart\nC - Connect Wallet\nM - Multiplayer\n\n🎯 GOAL:\nComplete all 5 levels!\nCollect coins and defeat enemies!');
    }
} // End of class

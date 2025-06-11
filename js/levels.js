// Level data and configuration
class LevelManager {
    static createLevel(level, canvasWidth, canvasHeight) {
        const w = canvasWidth;
        const h = canvasHeight;
        const groundY = h - 40;
        
        const levels = {
            1: [
                // GROUND PLATFORMS (Brown platforms at bottom - #8B4513 = brown)
                { x: 0, y: groundY, width: w * 0.15, height: 40, color: '#8B4513' },
                { x: w * 0.25, y: groundY, width: w * 0.15, height: 40, color: '#8B4513' },
                { x: w * 0.5, y: groundY, width: w * 0.15, height: 40, color: '#8B4513' },
                { x: w * 0.75, y: groundY, width: w * 0.25, height: 40, color: '#8B4513' },

                // FLOATING PLATFORMS (Green platforms in air - #228B22 = green)
                { x: w * 0.2, y: h - 150, width: w * 0.08, height: 20, color: '#228B22' },
                { x: w * 0.37, y: h - 200, width: w * 0.08, height: 20, color: '#228B22' },
                { x: w * 0.54, y: h - 180, width: w * 0.1, height: 20, color: '#228B22' }
            ],
            2: [
                // GROUND PLATFORMS (Brown platforms at bottom - #8B4513 = brown)
                { x: 0, y: groundY, width: w * 0.12, height: 40, color: '#8B4513' },
                { x: w * 0.2, y: groundY, width: w * 0.08, height: 40, color: '#8B4513' },
                { x: w * 0.35, y: groundY, width: w * 0.12, height: 40, color: '#8B4513' },
                { x: w * 0.55, y: groundY, width: w * 0.08, height: 40, color: '#8B4513' },
                { x: w * 0.7, y: groundY, width: w * 0.3, height: 40, color: '#8B4513' },

                // FLOATING PLATFORMS (Green platforms in air - #228B22 = green)
                { x: w * 0.14, y: h - 160, width: w * 0.06, height: 20, color: '#228B22' },
                { x: w * 0.29, y: h - 220, width: w * 0.06, height: 20, color: '#228B22' },
                { x: w * 0.48, y: h - 180, width: w * 0.06, height: 20, color: '#228B22' },
                { x: w * 0.64, y: h - 280, width: w * 0.06, height: 20, color: '#228B22' }
            ],
            3: [
                // Ground platforms
                { x: 0, y: groundY, width: w * 0.1, height: 40, color: '#8B4513' },
                { x: w * 0.55, y: groundY, width: w * 0.08, height: 40, color: '#8B4513' },
                { x: w * 0.75, y: groundY, width: w * 0.25, height: 40, color: '#8B4513' }, // Made wider for final area
    
                // Staircase platforms (easier to navigate)
                { x: w * 0.12, y: h - 120, width: w * 0.08, height: 20, color: '#228B22' }, // Made wider
                { x: w * 0.24, y: h - 180, width: w * 0.08, height: 20, color: '#228B22' },
                { x: w * 0.12, y: h - 240, width: w * 0.08, height: 20, color: '#228B22' },
                { x: w * 0.24, y: h - 300, width: w * 0.08, height: 20, color: '#228B22' },
    
                // Bridge platform to connect to final area
                { x: w * 0.4, y: h - 200, width: w * 0.12, height: 20, color: '#228B22' }
            ],
            4: [
                { x: 0, y: groundY, width: w * 0.08, height: 40, color: '#8B4513' },
                { x: w * 0.15, y: h - 80, width: w * 0.06, height: 40, color: '#8B4513' },
                { x: w * 0.3, y: h - 120, width: w * 0.08, height: 40, color: '#8B4513' },
                { x: w * 0.45, y: h - 80, width: w * 0.06, height: 40, color: '#8B4513' },
                { x: w * 0.6, y: groundY, width: w * 0.4, height: 40, color: '#8B4513' },
                { x: w * 0.09, y: h - 200, width: w * 0.04, height: 15, color: '#FF6347' },
                { x: w * 0.23, y: h - 250, width: w * 0.04, height: 15, color: '#FF6347' },
                { x: w * 0.39, y: h - 200, width: w * 0.04, height: 15, color: '#FF6347' },
                { x: w * 0.52, y: h - 280, width: w * 0.06, height: 20, color: '#228B22' },
                { x: w * 0.15, y: h - 350, width: w * 0.15, height: 20, color: '#4169E1' },
                { x: w * 0.4, y: h - 320, width: w * 0.12, height: 20, color: '#4169E1' }
            ],
            5: [
                { x: 0, y: groundY, width: w * 0.06, height: 40, color: '#8B4513' },
                { x: w * 0.88, y: groundY, width: w * 0.12, height: 40, color: '#8B4513' },
                { x: w * 0.09, y: h - 140, width: w * 0.04, height: 15, color: '#FF6347' },
                { x: w * 0.17, y: h - 200, width: w * 0.03, height: 15, color: '#FF6347' },
                { x: w * 0.25, y: h - 260, width: w * 0.04, height: 15, color: '#FF6347' },
                { x: w * 0.33, y: h - 200, width: w * 0.03, height: 15, color: '#FF6347' },
                { x: w * 0.41, y: h - 280, width: w * 0.05, height: 15, color: '#FF6347' },
                { x: w * 0.49, y: h - 220, width: w * 0.04, height: 15, color: '#FF6347' },
                { x: w * 0.57, y: h - 160, width: w * 0.06, height: 20, color: '#228B22' },
                { x: w * 0.24, y: h - 380, width: w * 0.24, height: 20, color: '#9400D3' },
                { x: w * 0.36, y: h - 320, width: w * 0.08, height: 15, color: '#FF6347' }
            ]
        };
        
        return levels[level] || levels[1];
    }
    
    static createCoins(level, canvasWidth, canvasHeight) {
        const w = canvasWidth;
        const h = canvasHeight;
        
        const levelCoins = {
            1: [
                { x: w * 0.26, y: h - 200, width: 20, height: 20, collected: false },
                { x: w * 0.4, y: h - 250, width: 20, height: 20, collected: false },
                { x: w * 0.58, y: h - 230, width: 20, height: 20, collected: false }
            ],
            2: [
                { x: w * 0.17, y: h - 210, width: 20, height: 20, collected: false },
                { x: w * 0.32, y: h - 270, width: 20, height: 20, collected: false },
                { x: w * 0.51, y: h - 230, width: 20, height: 20, collected: false },
                { x: w * 0.67, y: h - 330, width: 20, height: 20, collected: false }
            ],
            3: [
                { x: w * 0.15, y: h - 170, width: 20, height: 20, collected: false },
                { x: w * 0.25, y: h - 230, width: 20, height: 20, collected: false },
                { x: w * 0.15, y: h - 290, width: 20, height: 20, collected: false },
                { x: w * 0.38, y: h - 250, width: 20, height: 20, collected: false },
                { x: w * 0.63, y: h - 270, width: 20, height: 20, collected: false }
            ],
            4: [
                { x: w * 0.12, y: h - 250, width: 20, height: 20, collected: false },
                { x: w * 0.26, y: h - 300, width: 20, height: 20, collected: false },
                { x: w * 0.42, y: h - 250, width: 20, height: 20, collected: false },
                { x: w * 0.22, y: h - 400, width: 20, height: 20, collected: false },
                { x: w * 0.46, y: h - 370, width: 20, height: 20, collected: false }
            ],
            5: [
                { x: w * 0.11, y: h - 190, width: 20, height: 20, collected: false },
                { x: w * 0.18, y: h - 250, width: 20, height: 20, collected: false },
                { x: w * 0.27, y: h - 310, width: 20, height: 20, collected: false },
                { x: w * 0.43, y: h - 330, width: 20, height: 20, collected: false },
                { x: w * 0.36, y: h - 430, width: 20, height: 20, collected: false },
                { x: w * 0.4, y: h - 370, width: 20, height: 20, collected: false }
            ]
        };
        
        return levelCoins[level] || levelCoins[1];
    }
    
    static createEnemies(level, canvasWidth, canvasHeight) {
        const w = canvasWidth;
        const h = canvasHeight;
        
        const levelEnemies = {
            1: [
                { x: w * 0.28, y: h - 64, width: 24, height: 24, velX: -1, color: '#8B0000', alive: true }
            ],
            2: [
                { x: w * 0.28, y: h - 64, width: 24, height: 24, velX: -1, color: '#8B0000', alive: true },
                { x: w * 0.43, y: h - 64, width: 24, height: 24, velX: 1, color: '#8B0000', alive: true }
            ],
            3: [
              // Enemy on first stair platform
                { x: w * 0.15, y: h - 144, width: 24, height: 24, velX: -0.5, color: '#8B0000', alive: true }, // h-120-24 = h-144
    
                // Enemy on bridge platform  
                { x: w * 0.43, y: h - 224, width: 24, height: 24, velX: 0.8, color: '#8B0000', alive: true }, // h-200-24 = h-224
    
                // Enemy on ground (final area)
                { x: w * 0.8, y: h - 64, width: 24, height: 24, velX: -1, color: '#8B0000', alive: true } // groundY-24 = h-40-24 = h-64
            ],
            4: [
                { x: w * 0.18, y: h - 120, width: 24, height: 24, velX: -1, color: '#8B0000', alive: true },
                { x: w * 0.35, y: h - 160, width: 24, height: 24, velX: 1.5, color: '#8B0000', alive: true },
                { x: w * 0.48, y: h - 120, width: 24, height: 24, velX: -1.2, color: '#8B0000', alive: true },
                { x: w * 0.24, y: h - 390, width: 24, height: 24, velX: 0.8, color: '#FF4500', alive: true }
            ],
            5: [
                { x: w * 0.16, y: h - 240, width: 24, height: 24, velX: -2, color: '#FF4500', alive: true },
                { x: w * 0.32, y: h - 240, width: 24, height: 24, velX: 1.5, color: '#FF4500', alive: true },
                { x: w * 0.47, y: h - 270, width: 24, height: 24, velX: -1.8, color: '#FF4500', alive: true },
                { x: w * 0.4, y: h - 420, width: 24, height: 24, velX: 1, color: '#8B0000', alive: true },
                { x: w * 0.36, y: h - 360, width: 24, height: 24, velX: -1, color: '#8B0000', alive: true }
            ]
        };
        
        return levelEnemies[level] || levelEnemies[1];
    }
    
    static getLevelDescriptions() {
        return {
            'LEVEL 1': 'Tutorial - Learn the basics!',
            'LEVEL 2': 'Jumping Challenge - Mind the gaps!',
            'LEVEL 3': 'Vertical Challenge - Climb high!',
            'LEVEL 4': 'Advanced Platforming - Precision required!',
            'LEVEL 5': 'Master Level - Ultimate test!'
        };
    }
}

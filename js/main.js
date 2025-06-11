// Game initialization and window event handling
let gameInstance = null;

// Initialize game when page loads
window.addEventListener('load', () => {
    console.log('🎮 Initializing Mario Game...');
    gameInstance = new SimpleMarioGame();
    console.log('✅ Game initialized successfully!');
    
    // Display help text
    console.log('🎯 Controls:');
    console.log('  WASD/Arrow Keys: Move & Jump');
    console.log('  R: Restart Game');
    console.log('  C: Connect Wallet (Polygon)');
    console.log('  M: Connect Multiplayer (Vircadia)');
});

// Handle window resize - recreate level when screen size changes
window.addEventListener('resize', () => {
    if (gameInstance) {
        console.log('📱 Window resized, updating game layout...');
        gameInstance.resize();
    }
});

// Handle visibility change (pause when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (gameInstance) {
        if (document.hidden) {
            console.log('⏸️ Game paused (tab hidden)');
            // Could pause game here if needed
        } else {
            console.log('▶️ Game resumed (tab visible)');
            // Could resume game here if needed
        }
    }
});

// Keyboard shortcuts info
window.addEventListener('keydown', (e) => {
    if (e.key === 'F1') {
        e.preventDefault();
        showHelp();
    }
});

function showHelp() {
    const helpText = `
🎮 MARIO GAME CONTROLS:
━━━━━━━━━━━━━━━━━━━━

Movement:
• WASD or Arrow Keys - Move & Jump
• Spacebar - Alternative Jump

Game Controls:
• R - Restart Game
• F1 - Show this help

Blockchain Features:
• C - Connect Polygon Wallet
• Auto-save high scores on blockchain
• Mint NFT when completing all levels

Multiplayer Features:
• M - Connect to Vircadia Multiplayer
• See other players in real-time
• Share achievements

Game Features:
• 5 challenging levels
• Responsive design (works on all devices)
• Collect coins for points
• Defeat enemies by jumping on them
• Avoid falling or getting hit

Ready for deployment on Vercel! 🚀
    `;
    
    console.log(helpText);
    alert(helpText);
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gameInstance };
}

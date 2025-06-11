# 🎮 Simple Mario Game - Polygon & Vircadia Ready

A responsive Mario-style platformer game built for blockchain integration and multiplayer functionality.

## 🚀 Live Demo

Deploy this to Vercel, Netlify, or any static hosting platform!

## ✨ Features

### 🎯 Core Gameplay
- **5 Progressive Levels** - From tutorial to master difficulty
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Classic Mario Mechanics** - Jump, run, collect coins, defeat enemies
- **Lives System** - 3 lives with respawn functionality
- **Scoring System** - Points for coins, enemy defeats, and level completion

### 🔗 Blockchain Integration (Polygon)
- **Wallet Connection** - MetaMask integration
- **High Score Storage** - Save scores on Polygon blockchain
- **NFT Minting** - Mint completion NFTs for finishing all levels
- **Leaderboard** - Global high scores on-chain

### 🌐 Multiplayer Ready (Vircadia)
- **Real-time Multiplayer** - See other players
- **Action Sharing** - Share coin collection and enemy defeats
- **Chat System** - Communicate with other players
- **Room-based Sessions** - Join specific game rooms

## 📁 File Structure

```
mario-game/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # Game styling and animations
├── js/
│   ├── main.js         # Game initialization
│   ├── game.js         # Main game class and logic
│   ├── player.js       # Player physics and rendering
│   ├── levels.js       # Level data and configuration
│   ├── enemies.js      # Enemy AI and behavior
│   ├── blockchain.js   # Polygon wallet and smart contract integration
│   └── multiplayer.js  # Vircadia multiplayer functionality
└── README.md           # This file
```

## 🎮 Controls

| Key | Action |
|-----|--------|
| `WASD` or `Arrow Keys` | Move & Jump |
| `Spacebar` | Alternative Jump |
| `R` | Restart Game |
| `C` | Connect Polygon Wallet |
| `M` | Connect Multiplayer |
| `F1` | Show Help |

## 🛠️ Development Setup

### Local Development
1. Clone or download all files
2. Open `index.html` in a web browser
3. No build process required!

### Deployment to Vercel
1. **Push to GitHub** - Create a repository with all files
2. **Connect Vercel** - Import your GitHub repository
3. **Auto-deploy** - Vercel automatically detects static site
4. **Custom domain** - Optional: Add your own domain

### Deployment to Netlify
1. **Drag & Drop** - Upload folder to Netlify
2. **GitHub Integration** - Or connect your repository
3. **Instant deploy** - Live in seconds

## 🔧 Configuration

### Blockchain Setup
To enable full blockchain functionality:

1. **Deploy Smart Contract** on Polygon
2. **Update Contract Address** in `js/blockchain.js`
3. **Configure ABI** for your smart contract
4. **Test with Polygon Mumbai** testnet first

### Multiplayer Setup
To enable full multiplayer:

1. **Set up Vircadia Server** or use existing instance
2. **Update Connection URLs** in `js/multiplayer.js`
3. **Configure Room Management** for your needs
4. **Test WebRTC Connectivity**

## 🎯 Game Levels

1. **Level 1: Tutorial** - Learn basic controls and mechanics
2. **Level 2: Jumping Challenge** - Master gap jumping
3. **Level 3: Vertical Challenge** - Climb and navigate heights
4. **Level 4: Advanced Platforming** - Precision jumping required
5. **Level 5: Master Level** - Ultimate platforming test

## 📱 Responsive Design

The game automatically adapts to:
- **Mobile phones** (portrait/landscape)
- **Tablets** (all orientations)
- **Desktop** (any resolution)
- **Ultrawide monitors**

## 🏆 Scoring System

- **Coins**: 100 points each
- **Enemy Defeat**: 200 points each
- **Level Completion**: 1000 + (level × 500) bonus points
- **Perfect Run Bonus**: Extra points for collecting all coins

## 🔐 Blockchain Features

### Wallet Integration
- Connect MetaMask wallet
- Auto-switch to Polygon network
- Secure transaction signing

### Smart Contract Features
- Save high scores permanently
- Mint achievement NFTs
- Global leaderboards
- Provably fair scoring

## 🎪 Multiplayer Features

### Real-time Sync
- Player positions
- Coin collection events
- Enemy defeats
- Level completions

### Social Features
- In-game chat
- Player avatars
- Achievement sharing
- Cooperative gameplay

## 🚀 Production Deployment

### Performance Optimizations
- **Minified assets** for faster loading
- **CDN deployment** for global reach
- **Browser caching** for repeat visits
- **Mobile optimization** for touch devices

### Monitoring
- **Error tracking** for debugging
- **Analytics integration** for insights
- **Performance monitoring** for optimization

## 📄 License

MIT License - Feel free to use this for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Issues**: Report bugs via GitHub Issues
- **Documentation**: Check the code comments
- **Community**: Join the Vircadia Discord

---

**Ready to deploy and play! 🎮🚀**

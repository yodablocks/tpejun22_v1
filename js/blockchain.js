// Blockchain integration for Polygon network
class BlockchainIntegration {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.userAccount = null;
        this.connected = false;
    }
    
    async connectWallet() {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask detected');
                
                // Request account access
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                this.userAccount = accounts[0];
                this.connected = true;
                
                // Switch to Polygon network if needed
                await this.switchToPolygon();
                
                console.log('Connected to wallet:', this.userAccount);
                return { success: true, account: this.userAccount };
            } else {
                console.log('MetaMask not detected');
                return { success: false, error: 'MetaMask not installed' };
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            return { success: false, error: error.message };
        }
    }
    
    async switchToPolygon() {
        try {
            // Polygon Mainnet configuration
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }], // Polygon chainId
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x89',
                            chainName: 'Polygon Mainnet',
                            nativeCurrency: {
                                name: 'MATIC',
                                symbol: 'MATIC',
                                decimals: 18
                            },
                            rpcUrls: ['https://polygon-rpc.com/'],
                            blockExplorerUrls: ['https://polygonscan.com/']
                        }]
                    });
                } catch (addError) {
                    console.error('Error adding Polygon network:', addError);
                }
            }
        }
    }
    
    async saveHighScore(score, level) {
        if (!this.connected) {
            console.log('Wallet not connected');
            return { success: false, error: 'Wallet not connected' };
        }
        
        try {
            // This would interact with your smart contract
            console.log('Saving high score to Polygon:', { score, level, account: this.userAccount });
            
            // Placeholder for actual smart contract interaction
            // const tx = await this.contract.methods.saveScore(score, level).send({
            //     from: this.userAccount,
            //     gas: 200000
            // });
            
            return { success: true, score, level };
        } catch (error) {
            console.error('Error saving high score:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getLeaderboard() {
        try {
            console.log('Fetching leaderboard from Polygon...');
            
            // Placeholder for actual smart contract call
            // const leaderboard = await this.contract.methods.getLeaderboard().call();
            
            // Mock leaderboard data
            const mockLeaderboard = [
                { player: '0x1234...5678', score: 15000, level: 5 },
                { player: '0x9876...3210', score: 12500, level: 4 },
                { player: '0x5555...7777', score: 10000, level: 3 },
                { player: '0x8888...9999', score: 7500, level: 3 },
                { player: '0x1111...2222', score: 5000, level: 2 }
            ];
            
            return { success: true, leaderboard: mockLeaderboard };
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return { success: false, error: error.message };
        }
    }
    
    async mintNFT(score, level) {
        if (!this.connected) {
            return { success: false, error: 'Wallet not connected' };
        }
        
        try {
            console.log('Minting NFT for completion:', { score, level });
            
            // Placeholder for NFT minting logic
            // const tx = await this.contract.methods.mintCompletionNFT(score, level).send({
            //     from: this.userAccount,
            //     gas: 300000
            // });
            
            return { success: true, message: 'NFT minted successfully!' };
        } catch (error) {
            console.error('Error minting NFT:', error);
            return { success: false, error: error.message };
        }
    }
    
    getWalletAddress() {
        return this.userAccount;
    }
    
    isConnected() {
        return this.connected;
    }
}

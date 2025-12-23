class NeonSweeper {
    constructor() {
        this.gridSize = 10;
        this.mineCount = 15;
        this.grid = [];
        this.gameState = 'STANDBY';
        this.startTime = null;
        this.gameTimer = null;
        this.flaggedCells = new Set();
        this.revealedCells = new Set();
        this.firstClick = true;
        this.probabilityEngineActive = false;
        this.cellProbabilities = new Map();
        
        // Performance optimizations
        this.animationQueue = [];
        this.isCalculating = false;
        this.lastCalculationTime = 0;
        this.calculationThrottle = 100;
        
        // Next-level features
        this.aiPersonality = 'ANALYTICAL';
        this.quantumMode = false;
        this.matrixRainActive = false;
        this.neuralNetworkActive = false;
        this.aiLearningData = new Map();
        this.performanceMetrics = {
            calculations: 0,
            accuracy: 0,
            speed: 0
        };
        
        // Professional features
        this.currentScreen = 'loading';
        this.gameScore = 0;
        this.gamesPlayed = 0;
        this.winRate = 0;
        this.bestTime = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.showLoadingScreen();
        setTimeout(() => {
            this.initializeDOM();
            this.createGrid();
            this.bindEvents();
            this.initializeNextLevelFeatures();
            this.showMainMenu();
        }, 3000);
    }

    showLoadingScreen() {
        const loadingTexts = [
            'Initializing Neural Networks...',
            'Loading AI Protocols...',
            'Calibrating Quantum Sensors...',
            'Establishing Matrix Connection...',
            'Activating Probability Engine...',
            'System Ready!'
        ];
        
        let progress = 0;
        const progressBar = document.getElementById('loadingProgress');
        const loadingText = document.getElementById('loadingText');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            if (progressBar) progressBar.style.width = progress + '%';
            
            if (progress < 100) {
                const textIndex = Math.floor((progress / 100) * loadingTexts.length);
                if (loadingText) loadingText.textContent = loadingTexts[textIndex] || loadingTexts[0];
            } else {
                if (loadingText) loadingText.textContent = 'System Ready!';
                clearInterval(loadingInterval);
            }
        }, 200);
    }

    showMainMenu() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainMenu = document.getElementById('mainMenu');
        
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainMenu) mainMenu.style.display = 'flex';
        this.currentScreen = 'menu';
    }

    showGame() {
        const mainMenu = document.getElementById('mainMenu');
        const gameContainer = document.getElementById('gameContainer');
        
        if (mainMenu) mainMenu.style.display = 'none';
        if (gameContainer) gameContainer.style.display = 'block';
        this.currentScreen = 'game';
        this.newGame();
    }

    initializeDOM() {
        // Game elements
        this.gridElement = document.getElementById('mineGrid');
        this.gameStateElement = document.getElementById('gameState');
        this.gameTimeElement = document.getElementById('gameTime');
        this.mineCountElement = document.getElementById('mineCount');
        this.gameScoreElement = document.getElementById('gameScore');
        this.accuracyElement = document.getElementById('accuracy');
        
        // AI elements
        this.probabilityEngineButton = document.getElementById('probabilityEngine');
        this.aiChat = document.getElementById('aiChat');
        this.aiAvatar = document.getElementById('aiAvatar');
        this.aiStatusIndicator = document.getElementById('aiStatusIndicator');
        this.aiAccuracy = document.getElementById('aiAccuracy');
        this.aiSpeed = document.getElementById('aiSpeed');
        this.aiConfidence = document.getElementById('aiConfidence');
        
        // Control buttons
        this.newGameButton = document.getElementById('newGameBtn');
        this.resetGameButton = document.getElementById('resetGameBtn');
        this.playButton = document.getElementById('playBtn');
        this.backToMenuButton = document.getElementById('backToMenu');
        
        // Effect elements
        this.radarOverlay = document.getElementById('radarOverlay');
        this.matrixRain = document.getElementById('matrixRain');
        this.quantumParticles = document.getElementById('quantumParticles');
        this.neuralNetwork = document.getElementById('neuralNetwork');
        
        // Quick action buttons
        this.quantumModeBtn = document.getElementById('quantumModeBtn');
        this.matrixModeBtn = document.getElementById('matrixModeBtn');
        this.neuralModeBtn = document.getElementById('neuralModeBtn');
        this.autoSolveBtn = document.getElementById('autoSolveBtn');
        this.aiHintBtn = document.getElementById('aiHintBtn');
        this.aiAnalyzeBtn = document.getElementById('aiAnalyzeBtn');
        
        // Dashboard elements
        this.safeZones = document.getElementById('safeZones');
        this.dangerZones = document.getElementById('dangerZones');
        this.threatIndicator = document.getElementById('threatIndicator');
        this.accuracyFill = document.getElementById('accuracyFill');
        this.speedFill = document.getElementById('speedFill');
        this.confidenceFill = document.getElementById('confidenceFill');
    }

    createGrid() {
        // Initialize empty grid
        this.grid = [];
        for (let row = 0; row < this.gridSize; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.gridSize; col++) {
                this.grid[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborCount: 0,
                    element: null
                };
            }
        }

        // Create DOM elements
        if (this.gridElement) {
            this.gridElement.innerHTML = '';
            for (let row = 0; row < this.gridSize; row++) {
                for (let col = 0; col < this.gridSize; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.row = row;
                    cell.dataset.col = col;
                    
                    this.grid[row][col].element = cell;
                    this.gridElement.appendChild(cell);
                }
            }
        }

        // Reset game state
        this.flaggedCells.clear();
        this.revealedCells.clear();
        this.firstClick = true;
        this.gameState = 'STANDBY';
        this.probabilityEngineActive = false;
        this.cellProbabilities.clear();
        this.updateDisplay();
    }

    bindEvents() {
        // Menu events
        if (this.playButton) {
            this.playButton.addEventListener('click', () => this.showGame());
        }
        
        if (this.backToMenuButton) {
            this.backToMenuButton.addEventListener('click', () => this.showMainMenu());
        }

        // Grid cell events
        if (this.gridElement) {
            this.gridElement.addEventListener('click', (e) => {
                if (e.target.classList.contains('cell')) {
                    const row = parseInt(e.target.dataset.row);
                    const col = parseInt(e.target.dataset.col);
                    this.handleCellClick(row, col);
                }
            });

            this.gridElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('cell')) {
                    const row = parseInt(e.target.dataset.row);
                    const col = parseInt(e.target.dataset.col);
                    this.handleCellRightClick(row, col);
                }
            });
        }

        // Control buttons
        if (this.newGameButton) {
            this.newGameButton.addEventListener('click', () => this.newGame());
        }
        if (this.resetGameButton) {
            this.resetGameButton.addEventListener('click', () => this.resetGame());
        }
        
        // AI buttons
        if (this.probabilityEngineButton) {
            this.probabilityEngineButton.addEventListener('click', () => {
                this.toggleProbabilityEngine();
            });
        }
        
        if (this.aiHintBtn) {
            this.aiHintBtn.addEventListener('click', () => this.provideAIHint());
        }
        
        if (this.aiAnalyzeBtn) {
            this.aiAnalyzeBtn.addEventListener('click', () => this.performDeepAnalysis());
        }
        
        // Quick action buttons
        if (this.quantumModeBtn) {
            this.quantumModeBtn.addEventListener('click', () => this.toggleQuantumMode());
        }
        if (this.matrixModeBtn) {
            this.matrixModeBtn.addEventListener('click', () => this.toggleMatrixRain());
        }
        if (this.neuralModeBtn) {
            this.neuralModeBtn.addEventListener('click', () => this.toggleNeuralNetwork());
        }
        if (this.autoSolveBtn) {
            this.autoSolveBtn.addEventListener('click', () => this.autoSolveSafeMoves());
        }
    }

    // ===== GAME LOGIC =====

    placeMines(excludeRow, excludeCol) {
        const positions = [];
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (row !== excludeRow || col !== excludeCol) {
                    positions.push({ row, col });
                }
            }
        }

        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        for (let i = 0; i < this.mineCount; i++) {
            const { row, col } = positions[i];
            this.grid[row][col].isMine = true;
        }

        this.calculateNeighborCounts();
    }

    calculateNeighborCounts() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (!this.grid[row][col].isMine) {
                    this.grid[row][col].neighborCount = this.countAdjacentMines(row, col);
                }
            }
        }
    }

    countAdjacentMines(row, col) {
        let count = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if (this.isValidPosition(newRow, newCol) && this.grid[newRow][newCol].isMine) {
                count++;
            }
        }

        return count;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
    }

    handleCellClick(row, col) {
        if (this.gameState === 'GAME_OVER' || this.gameState === 'VICTORY') {
            return;
        }

        const cell = this.grid[row][col];
        
        if (cell.isFlagged || cell.isRevealed) {
            return;
        }

        if (this.firstClick) {
            this.placeMines(row, col);
            this.startGame();
            this.firstClick = false;
        }

        this.revealCell(row, col);
        this.playSound('click');
    }

    handleCellRightClick(row, col) {
        if (this.gameState === 'GAME_OVER' || this.gameState === 'VICTORY') {
            return;
        }

        const cell = this.grid[row][col];
        
        if (cell.isRevealed) {
            return;
        }

        const cellKey = `${row},${col}`;
        if (cell.isFlagged) {
            cell.isFlagged = false;
            cell.element.classList.remove('flagged');
            this.flaggedCells.delete(cellKey);
        } else {
            cell.isFlagged = true;
            cell.element.classList.add('flagged');
            this.flaggedCells.add(cellKey);
        }

        this.updateDisplay();
        this.playSound('flag');
        
        if (this.probabilityEngineActive) {
            this.throttledProbabilityUpdate();
        }
    }

    revealCell(row, col) {
        const cell = this.grid[row][col];
        
        if (cell.isRevealed || cell.isFlagged) {
            return;
        }

        cell.isRevealed = true;
        cell.element.classList.add('revealed', 'revealing');
        this.revealedCells.add(`${row},${col}`);

        setTimeout(() => {
            cell.element.classList.remove('revealing');
        }, 300);

        if (cell.isMine) {
            this.gameOver();
            return;
        }

        if (cell.neighborCount > 0) {
            cell.element.textContent = cell.neighborCount;
            cell.element.style.color = this.getNumberColor(cell.neighborCount);
        } else {
            this.floodFill(row, col);
        }

        this.checkVictory();
        
        if (this.probabilityEngineActive) {
            this.throttledProbabilityUpdate();
        }
    }

    floodFill(row, col) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if (this.isValidPosition(newRow, newCol)) {
                const adjacentCell = this.grid[newRow][newCol];
                
                if (!adjacentCell.isRevealed && !adjacentCell.isFlagged && !adjacentCell.isMine) {
                    adjacentCell.isRevealed = true;
                    adjacentCell.element.classList.add('revealed');
                    this.revealedCells.add(`${newRow},${newCol}`);
                    
                    if (adjacentCell.neighborCount > 0) {
                        adjacentCell.element.textContent = adjacentCell.neighborCount;
                        adjacentCell.element.style.color = this.getNumberColor(adjacentCell.neighborCount);
                    } else {
                        this.floodFill(newRow, newCol);
                    }
                }
            }
        }
    }

    getNumberColor(count) {
        const colors = {
            1: '#39ff14',
            2: '#ffff00',
            3: '#ff8800',
            4: '#ff00ff',
            5: '#ff0000',
            6: '#800080',
            7: '#000080',
            8: '#808080'
        };
        return colors[count] || '#39ff14';
    }

    startGame() {
        this.gameState = 'ACTIVE';
        this.startTime = Date.now();
        this.gameTimer = setInterval(() => {
            this.updateTimer();
        }, 1000);
        this.updateDisplay();
        this.addAIMessage('Mission started. Analyzing minefield patterns...', 'info');
    }

    gameOver() {
        this.gameState = 'GAME_OVER';
        clearInterval(this.gameTimer);
        
        this.addAIMessage('CRITICAL FAILURE: Mine detonated! Mission failed.', 'error');
        this.triggerGlitchEffect();
        this.playSound('explosion');
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = this.grid[row][col];
                if (cell.isMine) {
                    cell.element.classList.add('mine', 'exploded');
                    cell.element.textContent = '💣';
                }
            }
        }
        
        console.log('GAME OVER - Mine detonated!');
        this.updateDisplay();
        this.gamesPlayed++;
        this.updateStatistics();
    }

    checkVictory() {
        const totalCells = this.gridSize * this.gridSize;
        const mineCells = this.mineCount;
        const safeCells = totalCells - mineCells;
        
        if (this.revealedCells.size === safeCells) {
            this.gameState = 'VICTORY';
            clearInterval(this.gameTimer);
            
            const timeBonus = Math.max(0, 1000 - (Date.now() - this.startTime) / 1000);
            const accuracyBonus = this.calculateAIConfidence() * 10;
            this.gameScore = Math.round(timeBonus + accuracyBonus);
            
            this.addAIMessage(`MISSION ACCOMPLISHED! Excellent work, Commander. Final score: ${this.gameScore}`, 'success');
            this.triggerVictoryEffect();
            this.playSound('victory');
            
            console.log('VICTORY - All safe cells revealed!');
            this.updateDisplay();
            
            this.gamesPlayed++;
            this.updateWinRate();
            this.updateBestTime();
            this.updateStatistics();
        }
    }

    newGame() {
        clearInterval(this.gameTimer);
        this.createGrid();
        this.gameScore = 0;
        this.addAIMessage('New mission initiated. Scanning for optimal entry points...', 'info');
        this.updateDisplay();
    }

    resetGame() {
        this.newGame();
    }

    updateTimer() {
        if (this.startTime && this.gameTimeElement) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            this.gameTimeElement.textContent = `${minutes}:${seconds}`;
        }
    }

    // ===== AI SYSTEM =====

    throttledProbabilityUpdate() {
        const now = Date.now();
        if (now - this.lastCalculationTime < this.calculationThrottle || this.isCalculating) {
            return;
        }
        
        this.lastCalculationTime = now;
        this.isCalculating = true;
        
        requestAnimationFrame(() => {
            this.calculateProbabilities();
            this.visualizeProbabilities();
            this.isCalculating = false;
        });
    }
    
    toggleProbabilityEngine() {
        if (this.gameState !== 'ACTIVE') {
            console.log('AI Protocol requires active game state');
            return;
        }

        this.probabilityEngineActive = !this.probabilityEngineActive;
        
        if (this.probabilityEngineActive) {
            console.log('🤖 AI PROBABILITY ENGINE ACTIVATED');
            this.playSound('ai_activate');
            this.startRadarScan();
        } else {
            console.log('🤖 AI PROBABILITY ENGINE DEACTIVATED');
            this.playSound('ai_deactivate');
            this.clearProbabilityVisualization();
        }
        
        this.updateDisplay();
    }

    calculateProbabilities() {
        this.cellProbabilities.clear();
        
        const unrevealedCells = [];
        const baseProbability = this.calculateBaseProbability();
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = this.grid[row][col];
                if (!cell.isRevealed && !cell.isFlagged) {
                    unrevealedCells.push({ row, col });
                    this.cellProbabilities.set(`${row},${col}`, baseProbability);
                }
            }
        }

        this.applyConstraintRules();
        
        console.log('📊 Probability analysis complete:', this.cellProbabilities.size, 'cells analyzed');
    }

    calculateBaseProbability() {
        const remainingMines = this.mineCount - this.flaggedCells.size;
        const totalCells = this.gridSize * this.gridSize;
        const remainingCells = totalCells - this.revealedCells.size - this.flaggedCells.size;
        
        if (remainingCells === 0) return 0;
        return Math.round((remainingMines / remainingCells) * 100);
    }

    applyConstraintRules() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = this.grid[row][col];
                
                if (cell.isRevealed && cell.neighborCount > 0) {
                    this.analyzeNumberedCell(row, col);
                }
            }
        }
    }

    analyzeNumberedCell(row, col) {
        const cell = this.grid[row][col];
        const requiredMines = cell.neighborCount;
        
        const neighbors = this.getNeighbors(row, col);
        const unrevealedNeighbors = neighbors.filter(n => 
            !this.grid[n.row][n.col].isRevealed && !this.grid[n.row][n.col].isFlagged
        );
        const flaggedNeighbors = neighbors.filter(n => 
            this.grid[n.row][n.col].isFlagged
        );

        const currentFlags = flaggedNeighbors.length;
        const remainingMines = requiredMines - currentFlags;

        if (remainingMines === unrevealedNeighbors.length && remainingMines > 0) {
            console.log(`🎯 CERTAINTY RULE: Cell (${row},${col}) - ${unrevealedNeighbors.length} neighbors are 100% mines`);
            for (const neighbor of unrevealedNeighbors) {
                this.cellProbabilities.set(`${neighbor.row},${neighbor.col}`, 100);
            }
        }
        else if (remainingMines === 0 && unrevealedNeighbors.length > 0) {
            console.log(`✅ SAFETY RULE: Cell (${row},${col}) - ${unrevealedNeighbors.length} neighbors are 0% mines`);
            for (const neighbor of unrevealedNeighbors) {
                this.cellProbabilities.set(`${neighbor.row},${neighbor.col}`, 0);
            }
        }
        else if (unrevealedNeighbors.length > 0 && remainingMines > 0) {
            const localProbability = Math.round((remainingMines / unrevealedNeighbors.length) * 100);
            const baseProbability = this.calculateBaseProbability();
            
            if (Math.abs(localProbability - baseProbability) > 10) {
                for (const neighbor of unrevealedNeighbors) {
                    const currentProb = this.cellProbabilities.get(`${neighbor.row},${neighbor.col}`) || baseProbability;
                    const newProb = Math.abs(localProbability - 50) > Math.abs(currentProb - 50) ? localProbability : currentProb;
                    this.cellProbabilities.set(`${neighbor.row},${neighbor.col}`, newProb);
                }
            }
        }
    }

    getNeighbors(row, col) {
        const neighbors = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if (this.isValidPosition(newRow, newCol)) {
                neighbors.push({ row: newRow, col: newCol });
            }
        }

        return neighbors;
    }

    visualizeProbabilities() {
        this.clearProbabilityVisualization();

        const updates = [];
        
        for (const [cellKey, probability] of this.cellProbabilities) {
            const [row, col] = cellKey.split(',').map(Number);
            const cell = this.grid[row][col];
            
            if (!cell.isRevealed && !cell.isFlagged) {
                updates.push({ cell, probability });
            }
        }

        requestAnimationFrame(() => {
            updates.forEach(({ cell, probability }, index) => {
                setTimeout(() => {
                    this.applyCellProbabilityVisualization(cell, probability);
                }, index * 10);
            });
        });

        const probabilities = Array.from(this.cellProbabilities.values());
        const safeCells = probabilities.filter(p => p === 0).length;
        const dangerCells = probabilities.filter(p => p === 100).length;
        const uncertainCells = probabilities.length - safeCells - dangerCells;
        
        console.log(`🎯 AI Analysis: ${safeCells} safe, ${dangerCells} dangerous, ${uncertainCells} uncertain`);
    }

    applyCellProbabilityVisualization(cell, probability) {
        cell.element.classList.remove('prob-safe', 'prob-danger', 'prob-unknown');
        cell.element.classList.remove('probability');
        
        cell.element.classList.add('probability', 'probability-animating');
        cell.element.setAttribute('data-probability', `${probability}%`);
        
        if (probability === 0) {
            cell.element.classList.add('prob-safe');
            cell.element.style.backgroundColor = 'rgba(57, 255, 20, 0.5)';
        } else if (probability === 100) {
            cell.element.classList.add('prob-danger');
            cell.element.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        } else if (probability >= 70) {
            cell.element.classList.add('prob-danger');
            cell.element.style.backgroundColor = 'rgba(255, 100, 0, 0.5)';
        } else if (probability >= 40) {
            cell.element.classList.add('prob-unknown');
            cell.element.style.backgroundColor = 'rgba(255, 255, 0, 0.4)';
        } else if (probability >= 20) {
            cell.element.classList.add('prob-unknown');
            cell.element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
        } else {
            cell.element.classList.add('prob-safe');
            cell.element.style.backgroundColor = 'rgba(57, 255, 20, 0.3)';
        }
        
        setTimeout(() => {
            cell.element.classList.remove('probability-animating');
        }, 400);
    }

    clearProbabilityVisualization() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = this.grid[row][col];
                cell.element.classList.remove('probability', 'prob-safe', 'prob-danger', 'prob-unknown');
                cell.element.removeAttribute('data-probability');
                
                if (!cell.isRevealed && !cell.isFlagged) {
                    cell.element.style.backgroundColor = '';
                }
            }
        }
    }

    // ===== AI CHAT & FEATURES =====
    
    addAIMessage(message, type = 'info') {
        if (!this.aiChat) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ai-message ${type}`;
        
        const messageText = document.createElement('span');
        messageText.className = 'message-text';
        messageText.textContent = message;
        
        messageElement.appendChild(messageText);
        this.aiChat.appendChild(messageElement);
        
        this.aiChat.scrollTop = this.aiChat.scrollHeight;
        
        if (this.aiAvatar) {
            this.aiAvatar.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.aiAvatar.style.transform = 'scale(1)';
            }, 200);
        }
    }

    performDeepAnalysis() {
        if (this.gameState !== 'ACTIVE') {
            this.addAIMessage('Deep analysis requires an active game state.', 'warning');
            return;
        }

        this.addAIMessage('Initiating deep scan of the minefield...', 'info');
        
        setTimeout(() => {
            this.calculateProbabilities();
            this.visualizeProbabilities();
            
            const analysis = this.generateAnalysisReport();
            this.addAIMessage(analysis, 'success');
        }, 2000);
    }

    generateAnalysisReport() {
        const totalCells = this.cellProbabilities.size;
        const safeCells = Array.from(this.cellProbabilities.values()).filter(p => p === 0).length;
        const dangerCells = Array.from(this.cellProbabilities.values()).filter(p => p === 100).length;
        const uncertainCells = totalCells - safeCells - dangerCells;
        
        let report = `Deep scan complete. Found ${safeCells} safe zones, ${dangerCells} confirmed mines, and ${uncertainCells} uncertain areas.`;
        
        if (safeCells > 0) {
            report += ' Recommend clearing safe zones first.';
        } else if (dangerCells > 0) {
            report += ' Flag confirmed mines immediately.';
        } else {
            report += ' No certain moves available. Proceed with caution.';
        }
        
        return report;
    }

    provideAIHint() {
        if (!this.probabilityEngineActive || this.gameState !== 'ACTIVE') {
            this.addAIMessage('💡 AI HINT: Activate the Probability Engine first!', 'warning');
            return;
        }

        let bestSafeCell = null;
        let bestDangerCell = null;

        for (const [cellKey, probability] of this.cellProbabilities) {
            if (probability === 0 && !bestSafeCell) {
                bestSafeCell = cellKey;
            }
            if (probability === 100 && !bestDangerCell) {
                bestDangerCell = cellKey;
            }
        }

        if (bestSafeCell) {
            const [row, col] = bestSafeCell.split(',').map(Number);
            this.highlightCell(row, col, 'safe');
            this.addAIMessage(`💡 AI HINT: Cell (${row},${col}) is 100% SAFE - Click it!`, 'success');
        } else if (bestDangerCell) {
            const [row, col] = bestDangerCell.split(',').map(Number);
            this.highlightCell(row, col, 'danger');
            this.addAIMessage(`💡 AI HINT: Cell (${row},${col}) is 100% MINE - Flag it!`, 'warning');
        } else {
            this.addAIMessage('💡 AI HINT: No certain moves available. Use probability analysis.', 'info');
        }

        this.playSound('hint');
    }

    highlightCell(row, col, type) {
        const cell = this.grid[row][col].element;
        const highlightClass = type === 'safe' ? 'hint-safe' : 'hint-danger';
        
        cell.classList.add(highlightClass);
        setTimeout(() => {
            cell.classList.remove(highlightClass);
        }, 3000);
    }

    autoSolveSafeMoves() {
        if (!this.probabilityEngineActive) {
            this.addAIMessage('Activate AI Analysis first to enable auto-solve.', 'warning');
            return;
        }

        let movesMade = 0;
        
        for (const [cellKey, probability] of this.cellProbabilities) {
            if (probability === 0) {
                const [row, col] = cellKey.split(',').map(Number);
                const cell = this.grid[row][col];
                
                if (!cell.isRevealed && !cell.isFlagged) {
                    setTimeout(() => {
                        this.revealCell(row, col);
                    }, movesMade * 200);
                    movesMade++;
                }
            }
        }
        
        for (const [cellKey, probability] of this.cellProbabilities) {
            if (probability === 100) {
                const [row, col] = cellKey.split(',').map(Number);
                const cell = this.grid[row][col];
                
                if (!cell.isRevealed && !cell.isFlagged) {
                    setTimeout(() => {
                        this.handleCellRightClick(row, col);
                    }, movesMade * 200);
                    movesMade++;
                }
            }
        }
        
        if (movesMade > 0) {
            this.addAIMessage(`Auto-solving ${movesMade} certain moves...`, 'success');
        } else {
            this.addAIMessage('No certain moves available for auto-solve.', 'info');
        }
    }

    // ===== VISUAL EFFECTS =====

    initializeNextLevelFeatures() {
        this.createMatrixRain();
        this.createQuantumParticles();
        this.setupAdvancedKeyboardShortcuts();
    }

    createMatrixRain() {
        if (!this.matrixRain) return;
        
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'matrix-drop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            drop.textContent = characters[Math.floor(Math.random() * characters.length)];
            this.matrixRain.appendChild(drop);
        }
    }

    createQuantumParticles() {
        if (!this.quantumParticles) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
            this.quantumParticles.appendChild(particle);
        }
    }

    setupAdvancedKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'q':
                    this.toggleQuantumMode();
                    break;
                case 'm':
                    this.toggleMatrixRain();
                    break;
                case 'n':
                    this.toggleNeuralNetwork();
                    break;
                case 'h':
                    this.provideAIHint();
                    break;
            }
        });
    }

    toggleQuantumMode() {
        this.quantumMode = !this.quantumMode;
        
        if (this.quantumMode) {
            console.log('🌌 QUANTUM MODE ACTIVATED');
            if (this.gridElement) this.gridElement.style.filter = 'hue-rotate(45deg) saturate(1.5)';
            if (this.quantumParticles) this.quantumParticles.style.opacity = '1';
        } else {
            console.log('🌌 QUANTUM MODE DEACTIVATED');
            if (this.gridElement) this.gridElement.style.filter = '';
            if (this.quantumParticles) this.quantumParticles.style.opacity = '0.3';
        }
    }

    toggleMatrixRain() {
        this.matrixRainActive = !this.matrixRainActive;
        
        if (this.matrixRainActive) {
            console.log('🌧️ MATRIX RAIN ACTIVATED');
            if (this.matrixRain) this.matrixRain.style.opacity = '1';
        } else {
            console.log('🌧️ MATRIX RAIN DEACTIVATED');
            if (this.matrixRain) this.matrixRain.style.opacity = '0';
        }
    }

    toggleNeuralNetwork() {
        this.neuralNetworkActive = !this.neuralNetworkActive;
        
        if (this.neuralNetworkActive) {
            console.log('🧠 NEURAL NETWORK ACTIVATED');
            if (this.neuralNetwork) this.neuralNetwork.style.opacity = '1';
            if (this.gridElement) this.gridElement.classList.add('ai-analyzing');
        } else {
            console.log('🧠 NEURAL NETWORK DEACTIVATED');
            if (this.neuralNetwork) this.neuralNetwork.style.opacity = '0';
            if (this.gridElement) this.gridElement.classList.remove('ai-analyzing');
        }
    }

    startRadarScan() {
        if (this.probabilityEngineButton) {
            this.probabilityEngineButton.classList.add('scanning');
        }
        
        if (this.radarOverlay) {
            this.radarOverlay.classList.add('radar-scanning');
        }
        
        setTimeout(() => {
            this.calculateProbabilities();
            this.visualizeProbabilities();
            
            if (this.probabilityEngineButton) {
                this.probabilityEngineButton.classList.remove('scanning');
            }
            if (this.radarOverlay) {
                this.radarOverlay.classList.remove('radar-scanning');
            }
        }, 2000);
    }

    triggerGlitchEffect() {
        document.body.classList.add('advanced-glitch-effect');
        
        const title = document.querySelector('.game-title');
        if (title) title.classList.add('glitch-text');
        
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.classList.remove('advanced-glitch-effect');
            if (title) title.classList.remove('glitch-text');
            flash.remove();
        }, 1500);
    }

    triggerVictoryEffect() {
        const gridContainer = document.querySelector('.grid-container');
        if (gridContainer) gridContainer.classList.add('victory-effect');
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = this.grid[row][col];
                if (cell.isRevealed) {
                    cell.element.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.8)';
                }
            }
        }
    }

    // ===== DISPLAY & UTILITIES =====

    updateDisplay() {
        if (this.gameStateElement) {
            this.gameStateElement.textContent = this.gameState;
        }
        
        const remainingMines = this.mineCount - this.flaggedCells.size;
        if (this.mineCountElement) {
            this.mineCountElement.textContent = Math.max(0, remainingMines);
        }
        
        if (this.gameScoreElement) {
            this.gameScoreElement.textContent = this.gameScore;
        }
        
        const totalClicks = this.revealedCells.size + this.flaggedCells.size;
        const accuracy = totalClicks > 0 ? Math.round((this.revealedCells.size / totalClicks) * 100) : 100;
        if (this.accuracyElement) {
            this.accuracyElement.textContent = accuracy + '%';
        }
        
        if (this.aiStatusIndicator) {
            this.aiStatusIndicator.textContent = this.probabilityEngineActive ? 'ONLINE' : 'OFFLINE';
            this.aiStatusIndicator.className = `ai-status-indicator ${this.probabilityEngineActive ? 'online' : 'offline'}`;
        }
        
        if (this.safeZones && this.dangerZones) {
            const safeCells = Array.from(this.cellProbabilities.values()).filter(p => p === 0).length;
            const dangerCells = Array.from(this.cellProbabilities.values()).filter(p => p === 100).length;
            
            this.safeZones.textContent = safeCells;
            this.dangerZones.textContent = dangerCells;
        }
        
        const stateColors = {
            'STANDBY': '#39ff14',
            'ACTIVE': '#ffff00',
            'GAME_OVER': '#ff0000',
            'VICTORY': '#00ff00'
        };
        
        if (this.gameStateElement && stateColors[this.gameState]) {
            this.gameStateElement.style.color = stateColors[this.gameState];
        }
    }

    calculateAIConfidence() {
        if (this.cellProbabilities.size === 0) return 0;
        
        let certainCells = 0;
        for (const probability of this.cellProbabilities.values()) {
            if (probability === 0 || probability === 100) {
                certainCells++;
            }
        }
        
        return Math.round((certainCells / this.cellProbabilities.size) * 100);
    }

    updateWinRate() {
        const wins = parseInt(localStorage.getItem('neonsweeperWins') || '0') + 1;
        localStorage.setItem('neonsweeperWins', wins.toString());
        this.winRate = Math.round((wins / this.gamesPlayed) * 100);
    }

    updateBestTime() {
        if (this.gameTimeElement) {
            const currentTime = this.gameTimeElement.textContent;
            const storedBestTime = localStorage.getItem('neonsweeperBestTime');
            
            if (!storedBestTime || this.timeToSeconds(currentTime) < this.timeToSeconds(storedBestTime)) {
                this.bestTime = currentTime;
                localStorage.setItem('neonsweeperBestTime', currentTime);
            }
        }
    }

    timeToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    updateStatistics() {
        localStorage.setItem('neonsweeperGamesPlayed', this.gamesPlayed.toString());
        
        const gamesPlayedElement = document.getElementById('gamesPlayed');
        const winRateElement = document.getElementById('winRate');
        const bestTimeElement = document.getElementById('bestTime');
        
        if (gamesPlayedElement) gamesPlayedElement.textContent = this.gamesPlayed;
        if (winRateElement) winRateElement.textContent = this.winRate + '%';
        if (bestTimeElement) bestTimeElement.textContent = this.bestTime || '--:--';
    }

    playSound(soundName) {
        try {
            const audio = new Audio(`sounds/${soundName}.mp3`);
            audio.volume = 0.3;
            audio.play().catch(e => {
                console.log(`Sound ${soundName} could not play:`, e.message);
            });
        } catch (error) {
            console.log(`Sound file sounds/${soundName}.mp3 not found`);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.neonSweeper = new NeonSweeper();
});
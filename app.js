import { authHandler } from './auth-handler.js';
import { DataValidator } from './data-validator.js';
import { offlineHandler } from './offline-handler.js';
import { visualizationHandler } from './visualization-handler.js';
import { database, ref, onValue } from './firebase-config.js';

class NetZeroApp {
    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        // Initialize authentication
        await this.setupAuthListeners();
        
        // Initialize offline support
        this.setupOfflineDetection();
        
        // Initialize real-time data listeners
        this.setupDataListeners();
    }

    setupAuthListeners() {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = await authHandler.loginWithEmail(email, password);
            
            if (!result.success) {
                this.showError(result.error);
            }
        });

        document.getElementById('googleLogin').addEventListener('click', async () => {
            const result = await authHandler.loginWithGoogle();
            if (!result.success) {
                this.showError(result.error);
            }
        });
    }

    setupOfflineDetection() {
        window.addEventListener('online' 
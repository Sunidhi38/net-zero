import { authOperations } from './firebase-service.js';

class AuthHandler {
    constructor() {
        this.initializeAuthListeners();
    }

    initializeAuthListeners() {
        const emailForm = document.getElementById('emailLoginForm');
        const googleBtn = document.getElementById('googleLogin');
        const errorElement = document.getElementById('authError');

        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                await authOperations.signInWithEmail(email, password);
            } catch (error) {
                errorElement.textContent = error.message;
            }
        });

        googleBtn.addEventListener('click', async () => {
            try {
                await authOperations.signInWithGoogle();
            } catch (error) {
                errorElement.textContent = error.message;
            }
        });
    }
}

export default AuthHandler; 
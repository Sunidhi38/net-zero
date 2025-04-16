import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDizW8fv-DgeMihB1gQahXAYFi7Yqz9hqk",
    authDomain: "net-zero-c8cd6.firebaseapp.com",
    databaseURL: "https://net-zero-c8cd6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "net-zero-c8cd6",
    storageBucket: "net-zero-c8cd6.firebasestorage.app",
    messagingSenderId: "9310338529",
    appId: "1:9310338529:web:bc5043a01a4190d07a66a0",
    measurementId: "G-2BZPCEDXFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Authentication state observer
const authStateObserver = (callback) => {
    onAuthStateChanged(auth, callback);
};

// Database operations
const realTimeData = {
    // Subscribe to sensor data
    subscribeSensorData: (callback) => {
        const sensorRef = ref(db, 'sensors');
        return onValue(sensorRef, (snapshot) => {
            callback(snapshot.val());
        });
    },

    // Write sensor data
    writeSensorData: (data) => {
        const sensorRef = ref(db, 'sensors');
        return set(sensorRef, {
            ...data,
            timestamp: Date.now()
        });
    },

    // Get historical data
    getHistoricalData: async () => {
        const historyRef = ref(db, 'history');
        const snapshot = await get(historyRef);
        return snapshot.val();
    }
};

// Authentication operations
const authOperations = {
    signInWithEmail: (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    },

    signInWithGoogle: () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    },

    getCurrentUser: () => {
        return auth.currentUser;
    }
};

export { realTimeData, authOperations, authStateObserver }; 
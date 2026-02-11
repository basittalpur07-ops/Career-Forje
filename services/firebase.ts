
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCWJkH8V0fXvFI7rqQwK9aJMmcY50Dglbc",
  authDomain: "career-forge-50018.firebaseapp.com",
  projectId: "career-forge-50018",
  storageBucket: "career-forge-50018.firebasestorage.app",
  messagingSenderId: "15764508793",
  appId: "1:15764508793:web:60153ab949b4afda57c4a8",
  measurementId: "G-NJ1ZMBNLG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const authService = {
  signUp: (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass),
  signIn: (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass),
  logout: () => signOut(auth),
  onAuthState: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback)
};

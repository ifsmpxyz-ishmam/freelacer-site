// ধাপ ১: Firebase CDN থেকে import করা
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ধাপ ২: Firebase Config (React app-এর সাথে same)
const firebaseConfig = {
  apiKey: "AIzaSyD02l07LpiKbGhGmCKedk7JEwL_3zbbApE",
  authDomain: "freelancer-site-e1a95.firebaseapp.com",
  projectId: "freelancer-site-e1a95",
  storageBucket: "freelancer-site-e1a95.firebasestorage.app",
  messagingSenderId: "887538936072",
  appId: "1:887538936072:web:492340317e79b421fda4bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ধাপ ৩: HTML Elements ধরা
const loginRequired = document.getElementById('login-required');
const reviewFormWrapper = document.getElementById('review-form-wrapper');
const reviewForm = document.getElementById('review-form');
const reviewStatus = document.getElementById('review-status');

// ধাপ ৪: Login State চেক করা (page load হওয়ার সাথে সাথে)
if (loginRequired && reviewFormWrapper) {
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
}

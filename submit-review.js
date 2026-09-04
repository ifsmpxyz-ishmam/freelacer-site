import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

// HTML Elements
const reviewForm = document.getElementById('review-form');
const reviewStatus = document.getElementById('review-status');
const navAuth = document.getElementById('nav-auth');

// বর্তমান logged-in user মনে রাখার জন্য
let currentUser = null;

// Auth State Track করা
onAuthStateChanged(auth, (user) => {
  currentUser = user;

  if (navAuth) {
    if (user) {
      const initial = user.email.charAt(0).toUpperCase();
      navAuth.innerHTML = `<span class="nav-avatar">${initial}</span>`;
      navAuth.href = '#';
      navAuth.onclick = async (e) => {
        e.preventDefault();
        await signOut(auth);
      };
    } else {
      navAuth.textContent = 'Login / Sign Up';
      navAuth.href = 'https://forgedigital-login.netlify.app/';
      navAuth.onclick = null;
    }
  }
});

// Review Form Submit
if (reviewForm) {
  reviewForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!currentUser) {
      reviewStatus.textContent = 'Please log in to submit a review.';
      return;
    }

    const rating = document.getElementById('rating').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!rating || !comment) {
      reviewStatus.textContent = 'Please fill in all fields.';
      return;
    }

    reviewStatus.textContent = 'Submitting...';

    const reviewData = {
      fields: {
        'Name': currentUser.email,
        'Rating': Number(rating),
        'Comment': comment,
        'Status': 'Pending'
      }
    };

    try {
      const response = await fetch('/.netlify/functions/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      reviewStatus.textContent = "Thanks! Your review is pending approval.";
      reviewForm.reset();

    } catch (error) {
      console.error('Error submitting review:', error);
      reviewStatus.textContent = 'Something went wrong. Please try again.';
    }
  });
}

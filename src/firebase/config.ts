// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZs3qBek0oBs9_HlEOkzj0Kzk5K9JHKDU',
  authDomain: 'looksop-613c5.firebaseapp.com',
  projectId: 'looksop-613c5',
  storageBucket: 'looksop-613c5.appspot.com',
  messagingSenderId: '1049176681992',
  appId: '1:1049176681992:web:38a5689a27838f453bebbd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

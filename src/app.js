// import { analytics } from
// 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
// import { auth } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js';
// import { firestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js';
const firebaseConfig = {
    apiKey: 'AIzaSyDbtmCLKNIpSe6Oh7UFmaWL2Nz3TD8Sqpw',
    authDomain: 'leta-tech-dev.firebaseapp.com',
    databaseURL: 'https://leta-tech-dev-default-rtdb.firebaseio.com',
    projectId: 'leta-tech-dev',
    storageBucket: 'leta-tech-dev.appspot.com',
    messagingSenderId: '712148337056',
    appId: '1:712148337056:web:28a8ae142108e2295ca4c5',
};

import FooterWrapper from './footer-wrapper.js';
import SimpleGreeting from './simple-greeting.js';

customElements.define('simple-greeting', SimpleGreeting);
customElements.define('footer-wrapper', FooterWrapper);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(firebase);
const auth = app.auth();
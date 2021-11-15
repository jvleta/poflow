import FooterWrapper from './footer-wrapper.js';
import HeaderWrapper from './header-wrapper.js';
import SimpleGreeting from './simple-greeting.js';

customElements.define('simple-greeting', SimpleGreeting);
customElements.define('footer-wrapper', FooterWrapper);
customElements.define('header-wrapper', HeaderWrapper);
const int_sqrt = Module.cwrap('int_sqrt', 'number', ['number']);
console.log(int_sqrt(4));
// import { analytics } from
// 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
// import { initializeApp } from
// 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js'; import { auth }
// from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js'; import {
// firestore } from
// 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'; const
// firebaseConfig = {}; Initialize Firebase const app =
// initializeApp(firebaseConfig); console.log(firebase); const auth =
// app.auth();
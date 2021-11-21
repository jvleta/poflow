import { addDoc, collection, getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'
import { createApp } from 'https://unpkg.com/petite-vue?module';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { GetEllipseCoordinates, GetNaca00XXCoordinates } from "./poflow.js"
import { firebaseConfig } from "./config.js";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const analytics = getAnalytics(app);

// petitevue

createApp({
    // Data
    currentStep: 0,
    submitted: false,
    invalids: {},
    fields: {
        airfoiltype: {
            label: 'Airfoil Type',
            value: '',
            validations: [{ message: 'Name is a required field', test: (value) => value }]
        },
    }
}).mount('#multi-step-form');


// try {
//     const docRef = await addDoc(
//         collection(db, 'users'), { first: 'Ada', last: 'Lovelace2', born:
//         1815 });
//     console.log('Document written with ID: ', docRef.id);
// } catch (e) {
//     console.error('Error adding document: ', e);
// }

console.log('ellipse');
console.log(JSON.parse(GetEllipseCoordinates(10, 0.5)));
console.log(JSON.parse(GetEllipseCoordinates(50, 0.5)));

console.log('naca0006');
console.log(JSON.parse(GetNaca00XXCoordinates(10, 0.06)));
console.log(JSON.parse(GetNaca00XXCoordinates(50, 0.06)));
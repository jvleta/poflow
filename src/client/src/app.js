import { createApp } from 'https://unpkg.com/petite-vue?module';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { addDoc, collection, getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'

import { firebaseConfig } from './config.js';
import { GetEllipseCoordinates, GetNaca00XXCoordinates } from './poflow.js'

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

const numPoints = 1000;
const coords = JSON.parse(GetNaca00XXCoordinates(numPoints, 0.06));
const x = coords.x;
const y = coords.y;

const points = [];
for (let i = 0; i < numPoints; i++) {
    points.push({ x: x[i], y: y[i] });
}

const data = {
    datasets: [{
        label: 'Scatter Dataset',
        data: points,
        backgroundColor: 'rgb(255, 99, 132)'
    }],
};

const config = {
    type: 'scatter',
    data: data,
    options: {
        showLine: true,
        borderWidth: 5,
        borderColor: 'black',
        pointRadius: 0,
        scales: {
            x: {
                title: { font: { size: 24 }, display: true, text: 'adfadsfdsafa' },
                type: 'linear',
                position: 'bottom'
            }
        },
        plugins: { legend: { display: false } }
    }

};
const myChart = new Chart(document.getElementById('myChart'), config);
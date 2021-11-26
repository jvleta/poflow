import { createApp, nextTick } from 'https://unpkg.com/petite-vue?module';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { addDoc, collection, getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'

import { firebaseConfig } from './config.js';
import { GetEllipseCoordinates, GetNaca00XXCoordinates } from './poflow.js'
import { autocomplete } from './autocomplete.js';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const analytics = getAnalytics(app);

function FieldComponent(props) {
    return {
        $template: "#field-component-template",
        field: props.field,
        get isInvalid() {
            return props.isInvalid();
        },
        get invalidMessage() {
            return props.invalidMessage();
        },
        // methods
        validate() {
            nextTick(() => {
                if (this.isInvalid) props.validate();
            });
        }
    };
}

function StepsIndicatorComponent(props) {
    return {
        $template: "#step-indicator-component-template",
        stepsCount: props.stepsCount,
        get stepsCountWithSuccessPage() {
            return this.stepsCount + 1;
        }
    };
}


createApp({
    StepsIndicatorComponent,
    FieldComponent,
    currentStep: 0,
    submitted: false,
    invalids: {},
    fields: {
        airfoiltype: {
            id: 'myInput',
            label: 'Airfoil Type',
            value: '',
            validations: [{ message: 'Name is a required field', test: (value) => value }]
        },
        horizontalVelocity: {
            id: '',
            label: 'Horizontal Velocity',
            value: '',
            validations: []
        },
        verticalVelocity: {
            id: '',
            label: 'Vertical Velocity',
            value: '',
            validations: []
        }
    },
    steps: [
        ['airfoiltype'],
        ['horizontalVelocity', 'verticalVelocity']
    ],
    get currentFields() {
        return this.steps[this.currentStep];
    },
    get totalSteps() {
        return this.steps.length;
    },
    get isFirstStep() {
        return this.currentStep === 0;
    },
    get isLastStep() {
        return this.currentStep === this.totalSteps - 1;
    },

    // Methods
    previousStep() {
        if (this.isFirstStep) return;
        // removes all invalids so doesn't show error messages on back
        this.invalids = {};
        this.currentStep--;
    },
    nextStep() {
        if (this.isLastStep) return;
        this.validate();
        if (this.isInvalid) return;
        this.currentStep++;
    },
    get isInvalid() {
        return !!Object.values(this.invalids).filter((key) => key).length;
    },
    // methods
    validate() {
        this.invalids = {};
        // validates all the fields on the current page
        this.currentFields.forEach((key) => {
            this.validateField(key);
        });
    },
    validateField(fieldKey) {
        this.invalids[fieldKey] = false;
        const field = this.fields[fieldKey];
        // run through each of the fields validation tests
        field.validations.forEach((validation) => {
            if (!validation.test(field.value)) {
                this.invalids[fieldKey] = validation.message;
            }
        });
    },

    submit() {
        // if form not valid don't submit
        this.validate();
        if (this.isInvalid) return;

        // submit on valid form
        console.log("doing submit", this.fields);
        this.submitted = true;
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
                title: { font: { size: 24 }, display: true, text: 'x/L' },
                type: 'linear',
                position: 'bottom',
                ticks: {
                    font: {
                        size: 22,
                    }
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    font: {
                        size: 22,
                    }
                },
            }
        },
        plugins: { legend: { display: false } }
    }

};

// const airfoils = [
//     'NACA-0006', 'NACA-0008', 'NACA-0010', 'NACA-0015', 'NACA-0018', 'NACA-0021',
//     'NACA-0024'
// ];

// autocomplete(document.getElementById('myInput'), airfoils);
const myChart = new Chart(document.getElementById('myChart'), config);
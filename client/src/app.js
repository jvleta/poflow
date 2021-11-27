import { createApp, nextTick } from 'https://unpkg.com/petite-vue?module';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { addDoc, collection, getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'

import { firebaseConfig } from './config.js';
import { GetEllipseCoordinates, GetNaca00XXCoordinates } from './poflow.js'

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const analytics = getAnalytics(app);

function PlotComponent(props) {
    console.log(props);
    return {
        $template: '#plot-component-template',
        step: props.step,
        x: props.x,
        y: props.y,
        get step() {
            return props.step;
        },
        mounted() {
            console.log('i am so mounted');
        }
    };
}

function FieldComponent(props) {
    return {
        $template: '#field-component-template',
        field: props.field,
        get isInvalid() {
            return props.isInvalid();
        },
        get invalidMessage() {
            return props.invalidMessage();
        },
        validate() {
            nextTick(() => {
                if (this.isInvalid) props.validate();
            });
        }
    };
}

function StepsIndicatorComponent(props) {
    return {
        $template: '#step-indicator-component-template',
        stepsCount: props.stepsCount,
        get stepsCountWithSuccessPage() {
            return this.stepsCount + 1;
        }
    };
}


createApp({
    PlotComponent,
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
            validations: [{ message: 'Name is a required field', test: (value) => value }],
            isSelectList: true,
            validValues: {
                '2:1 Ellipse': { type: 'ellipse', ratio: 0.5 },
                'NACA-0006': { type: 'naca', ratio: 0.06 },
                'NACA-0008': { type: 'naca', ratio: 0.08 }
            }
        },
        horizontalVelocity: { id: '', label: 'Horizontal Velocity', value: '', validations: [] },
        verticalVelocity: { id: '', label: 'Vertical Velocity', value: '', validations: [] }
    },

    steps: [
        ['airfoiltype'],
        ['horizontalVelocity', 'verticalVelocity']
    ],

    get doStuff() {
        if (this.currentStep === 0) {
            console.log('we should probably try to make the plot now');
        } else {
            console.log('aaaaahhhh');
        }
        const fieldValue = this.fields['airfoiltype'].value
        const data = this.fields['airfoiltype'].validValues[fieldValue];
        if (data) {
            if (data.type === 'ellipse') {
                console.log(GetEllipseCoordinates(10, data.ratio));
            } else if (data.type === 'naca') {
                console.log(GetNaca00XXCoordinates(10, data.ratio));
            } else {
                console.log('error');
            }
        }
        return data;
    },
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
        console.log('you clicked previous');
        console.log('isFirstStep', this.isFirstStep);
        console.log('current step is', this.currentStep);
        if (this.isFirstStep) return;
        // removes all invalids so doesn't show error messages on back
        this.invalids = {};
        this.currentStep--;
        console.log('current step is', this.currentStep);
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
        console.log('doing submit', this.fields);
        this.submitted = true;
    },

    mounted: {
        DrawCoords() {
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
            const myChart = new Chart(this.$refs.myChart, config);
        }
    }
}).mount('#multi-step-form');
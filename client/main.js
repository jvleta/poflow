import { createApp } from 'petite-vue';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from './config.js';

export const app = initializeApp(firebaseConfig);

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

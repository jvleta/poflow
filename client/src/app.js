import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { addDoc, collection, getFirestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA7oxGdbv2i-fqEdNYG2D_fCpyfP96-uE0',
    authDomain: 'poflow-leta-tech.firebaseapp.com',
    projectId: 'poflow-leta-tech',
    storageBucket: 'poflow-leta-tech.appspot.com',
    messagingSenderId: '545726653232',
    appId: '1:545726653232:web:b2b8a27aba7f00235c9ef5',
    measurementId: 'G-GSENSHJ9BM'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const analytics = getAnalytics(app);

try {
    const docRef = await addDoc(
        collection(db, 'users'), { first: 'Ada', last: 'Lovelace2', born: 1815 });
    console.log('Document written with ID: ', docRef.id);
} catch (e) {
    console.error('Error adding document: ', e);
}



export default app;

// import PoflowWrapper from './poflow-wrapper.js';
// import SimpleGreeting from './simple-greeting.js';

// customElements.define('simple-greeting', SimpleGreeting);
// customElements.define('poflow-wrapper', PoflowWrapper);
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

const airfoils = [
    'NACA-0006', 'NACA-0008', 'NACA-0010', 'NACA-0015', 'NACA-0018', 'NACA-0021',
    'NACA-0024'
];

const autocomplete =
    (inp, arr) => {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener('input', function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement('DIV');
            a.setAttribute('id', this.id + 'autocomplete-list');
            a.setAttribute('class', 'autocomplete-items');
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field
                 * value:*/
                // if (arr[i].substr(0, val.length).toUpperCase() ==
                // val.toUpperCase()) {
                if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement('DIV');
                    /*make the matching letters bold:*/
                    b.innerHTML =
                        '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's
                     * value:*/
                    b.innerHTML += '<input type=\'hidden\' value=\'' + arr[i] + '\'>';
                    /*execute a function when someone clicks on the item value (DIV
                     * element):*/
                    b.addEventListener('click', function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName('input')[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener('keydown', function(e) {
            var x = document.getElementById(this.id + 'autocomplete-list');
            if (x) x = x.getElementsByTagName('div');
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { // up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being
                 * submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        const addActive = x => {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add('autocomplete-active');
        };

        const removeActive = x => {
            /*a function to remove the "active" class from all autocomplete
             * items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove('autocomplete-active');
            }
        };

        const closeAllLists = elmnt => {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName('autocomplete-items');
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        };

        /*execute a function when someone clicks in the document:*/
        document.addEventListener('click', function(e) {
            closeAllLists(e.target);
        });
    }

autocomplete(document.getElementById('myInput'), airfoils);
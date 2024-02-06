// Targeting HTML Elements
import { dataIsNotValid, changeVitalKeyDataName, sendDataToBackend } from './helpers/helpers.js';
const password = document.getElementById('password');
const username = document.getElementById('username');
const btn = document.getElementById('btn');


// Listens for button click for Login/Signup, and Validates input data
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        value1: username.value,
        value2: password.value,
        value1Msg: 'Username is Required!',
        value2Msg: 'Password is Required!'
    }
    
    if(dataIsNotValid(data)) return;
    const credentials = changeVitalKeyDataName(data, 'Username', 'Password');
    sendDataToBackend(credentials, `${location.pathname}/Api`);
})
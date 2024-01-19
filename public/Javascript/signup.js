// Targeting HTML Elements
const password = document.getElementById('password');
const username = document.getElementById('username');
const btn = document.getElementById('btn');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    validateInput();
})


async function validateInput() {
    if(password.value === '') {
        return;
    }
    try {
        const res = (await fetch('/Signup')).json();
        console.log(res);
    }
    catch(error) {
        console.error('Error Occured in validateInput function');
        throw error;
    }
}
// Targeting HTML Elements
const password = document.getElementById('password');
const username = document.getElementById('username');
const btn = document.getElementById('btn');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    validateInput(location.pathname);
})


// Login/Signup Function
async function validateInput(apiRoute) {
    if(username.value === '') {
        alert("Username is Required!");
        return;
    }
    else if(password.value === '') {
        alert("Password is Required!");
        return;
    }
    try {
        const credentials = {
            Username: username.value,
            Password: password.value
        }
        const res = await fetch(apiRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });

        if(res.ok && res.redirected) {
            location.replace(res.url);
        }
        else {
            const data = await res.json();
            alert(data);
        }
    }
    catch(error) {
        console.error('Error Occured in validateInput function');
        throw error;
    }
}
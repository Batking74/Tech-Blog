// Targeting HTML Elements
const deleteAccountBtn = document.getElementById('deleteAccount');
const logoutBtn = document.getElementById('logout');

// Logs Users out of their Accounts
if(logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const isValid = confirm('Are you sure you would like to logout of your account?');
        if (isValid) {
            const response = await fetch('/Login/Api/logout', getOptions('POST'));
            if(response.ok) location.replace(response.url);
        }
    })
}


// Deletes User Accounts
if(deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const isValid = confirm('Are you certain you want to proceed with deleting your account? This action is irreversible and permanent, meaning it cannot be undone.');
        if (isValid) {
            const url = location.href;
            const id = url.substring(url.indexOf('/:') + 2);
            const response = await fetch(`/Login/Api/Delete/:${id}`, getOptions('DELETE'));
            if(!response.ok) location.replace(response.url);
        }
    })
}


// Validates all User inputs to make sure they arent empty
export function dataIsNotValid({ value1, value2, value1Msg, value2Msg }) {
    if(value1 === '') {
        alert(value1Msg);
        return true;
    }
    else if(value2 === '') {
        alert(value2Msg);
        return true;
    }
    return false;
}


// Changes the name of only vital keys needed to make a request to the server, and deletes data that isn't needed
export function changeVitalKeyDataName(data, value1NewName, value2NewName) {
    data[value1NewName] = data['value1'];
    data[value2NewName] = data['value2'];
    delete data.value1;
    delete data.value2;
    delete data.value1Msg;
    delete data.value2Msg;
    return JSON.stringify(data);
}


// Returns POST Request options
export function getOptions(method) {
    return {
        method: method,
        headers: {'Content-Type': 'application/json'},
    }
}



// Sends Post Data to Backend
export async function sendDataToBackend(method, data, apiRoute) {
    try {
        const options = getOptions(method);
        options['body'] = data;
        const res = await fetch(apiRoute, options);
        
        if(!(res.ok && res.redirected)) {
            const data = await res.json();
            // alert(data);
            return data;
        }
        else location.replace(res.url);
    }
    catch(error) {
        console.error('Error Occured in validateInput function');
        throw error;
    }
}
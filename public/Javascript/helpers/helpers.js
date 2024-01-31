// Targeting HTML Elements
const deleteAccountBtn = document.getElementById('deleteAccount');
const logoutBtn = document.getElementById('logout');

// Logs Users out of their Accounts
if(logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const isValid = confirm('Are you sure you would like to logout of your account?');
        if (isValid) {
            const response = await fetch('/Login/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
            if(response.ok) {
                location.replace(response.url);
            }
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
            const response = await fetch(`/Login/:${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            console.log(response)
            if(!response.ok) {
                location.replace(response.url);
            }
        }
    })
}
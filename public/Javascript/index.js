// Importing Modules
import './helpers/helpers.js';
const mainContainer = document.getElementsByTagName('main')[0];

try {
    const allPosts = await (await fetch('/Posts/Api/?queryAll=true')).json();
    displayAllPosts(allPosts);
    addEventListenerForAllPosts();
}
catch(error) {
    console.error('Error occured in function!');
    throw error;
}


// Displays All Users Post in database
function displayAllPosts(allPosts) {
    for(let { User, Title, Content, Date } of allPosts) {
        mainContainer.innerHTML += `
        <div class="card">
            <div class="card-header-container">
                <h2>${Title}</h2>
                <p>Posted by ${User} on ${Date}</p>
            </div>
            <div id="language-buttons" class="card-body">
                <p class="user-message">${Content}</p>
            </div>
        </div>
        `
    }
}


// Enables Users to comment on other Posts
function addEventListenerForAllPosts() {
    const cards = document.querySelectorAll('.card');
    for(let card of cards) {
        card.addEventListener('click', () => {
            console.log('Testing')
        })
    }
}
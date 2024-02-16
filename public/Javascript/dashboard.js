// Targeting HTML Elements/Importing Modules
import { dataIsNotValid, changeVitalKeyDataName, sendDataToBackend } from './helpers/helpers.js';
const startNewPostBtn = document.getElementById('start-new-post-btn');
const mainContainer = document.getElementsByTagName('main')[0];
const postMainContainer = document.getElementById('posts-container');
const submitBtn = document.getElementById('submit');
const cardHeader = document.querySelector('.card-header');
const content = document.getElementById('content');
const title = document.getElementById('title');
let updateID;
let userLoggedIn;
try {
    const isUserLoggedIn = await (await fetch('/Login/Api/IsloggedIn')).json();
    userLoggedIn = isUserLoggedIn;
}
catch(error) {
    console.error('Error occured when checking if the user was logged in!');
    throw error;
}

if(userLoggedIn) displayPosts();

// Toggles the main create post container
startNewPostBtn.addEventListener('click', async () => {
    if(userLoggedIn) {
        setCardText('Create New Post', 'Create!');
        // Validates and submits Post data
        submitBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            validate(event.target);
        })
    }
    else alert('Login or Create an Account to Create Posts!');
})


// Displays all specific user posts
async function displayPosts() {
    try {
        const allPosts = await (await fetch('/Posts/Api/?queryAll=false')).json();
        console.log(allPosts)
        if(!localStorage.getItem('AllPosts')) {
            localStorage.setItem('AllPosts', JSON.stringify(allPosts));
        }
        for(let { Title, Date, id } of allPosts) {
            const postContainer = document.createElement('div');
            const titleElement = document.createElement('h3');
            const dateElement = document.createElement('h3');
            postContainer.setAttribute('class', 'Post-Container');
            postContainer.setAttribute('id', id);
            titleElement.setAttribute('id', id);
            dateElement.setAttribute('id', id);
            postContainer.append(titleElement);
            postContainer.append(dateElement);
            titleElement.append(Title);
            dateElement.append(Date);
            postMainContainer.append(postContainer);
            
            postContainer.addEventListener('click', (event) => validate(event.target));
        }
    }
    catch(error) {
        console.error('Error occured in displayUserPosts function!');
        throw error;
    }
}



// Validates users request
function validate({ textContent, id }) {
    if(textContent === 'Update Post') {
        completeRequest('PUT', `/Posts/Api/:${updateID}`);
        let allPosts = JSON.parse(localStorage.getItem('AllPosts'));
        allPosts[updateID - 1].Title = title.value;
        allPosts[updateID - 1].Content = content.value;
        localStorage.setItem('AllPosts', JSON.stringify(allPosts));
    }
    else if(textContent != 'Create!') {
        const { Title, Content } = JSON.parse(localStorage.getItem('AllPosts'))[id - 1];
        content.value = Content;
        updateID = id;
        title.value = Title;
        setCardText('Edit Post', 'Update Post');
    }
    else completeRequest('POST', '/Posts/Api/Create');
}


// Changes card text based on what the user clicks
function setCardText(headerText, submitBtnTxt) {
    cardHeader.textContent = headerText;
    submitBtn.textContent = submitBtnTxt;
    mainContainer.style.display = 'block';
    postMainContainer.style.display = 'none';
}


// Completes the request by sending data to server
function completeRequest(method, apiRoute) {
    const usersInput = {
        value1: title.value,
        value2: content.value,
        value1Msg: 'Must have a title!',
        value2Msg: 'Must have Content!'
    }
    if(dataIsNotValid(usersInput)) return;
    const data = changeVitalKeyDataName(usersInput, 'Title', 'Content');
    sendDataToBackend(method, data, apiRoute);
    mainContainer.style.display = 'none';
    postMainContainer.style.display = 'block';
    location.reload();
}
// Targeting HTML Elements/Importing Modules
import { dataIsNotValid, changeVitalKeyDataName, sendDataToBackend } from './helpers/helpers.js';
const startNewPostBtn = document.getElementById('start-new-post-btn');
const mainContainer = document.getElementsByTagName('main')[0];
const content = document.getElementById('content');
const title = document.getElementById('title');
const submitBtn = document.getElementById('submit');


// Toggles the main create post container
startNewPostBtn.addEventListener('click', () => {
    mainContainer.style.display = 'block';
})


// Validates and submits post data
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        value1: title.value,
        value2: content.value,
        value1Msg: 'Must have a title!',
        value2Msg: 'Must have Content!'
    }
    if(dataIsNotValid(data)) return;
    const post = changeVitalKeyDataName(data, 'Title', 'Content');
    sendDataToBackend(post, '/Posts/Api/Create');
})
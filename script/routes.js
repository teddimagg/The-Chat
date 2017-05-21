//TODO: dynamically create routes

// Scoping render functions
let displayChat;
let displayLogin;
let displayRegister;

//A simple routing
window.onload = () => {
    // Element fetching
    const chatElement = document.querySelector('#chat');
    const loginElement = document.querySelector('#login');
    const registerElement = document.querySelector('#register');

    const chatBtn = document.querySelector('#chat-btn');
    const loginBtn = document.querySelector('#login-btn');
    const registerBtn = document.querySelector('#register-btn');

    //Render functions
    displayChat = function (){
        clearContainer();
        chatElement.style.display = "block";
        chatBtn.classList.add('active');
    }
    displayLogin = function (){
        clearContainer();
        loginElement.style.display = "block";
        loginBtn.classList.add('active');
    }

    displayRegister = function (){
        clearContainer();
        registerElement.style.display = "block";
        registerBtn.classList.add('active');
    }

    //Button event listeners
    chatBtn.addEventListener('click', displayChat, false);
    loginBtn.addEventListener('click', displayLogin, false);
    registerBtn.addEventListener('click', displayRegister, false);

    // HELPERS
    function clearContainer(){
        //Clearing the main container
        chatElement.style.display = "none";
        loginElement.style.display = "none";
        registerElement.style.display = "none";

        //Clearing active class on anchors
        chatBtn.classList.remove('active');
        loginBtn.classList.remove('active');
        registerBtn.classList.remove('active');
    }
}
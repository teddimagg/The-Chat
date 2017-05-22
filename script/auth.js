const auth = firebase.auth();

//Event listener on authentixation state changing (logging in/out)
firebase.auth().onAuthStateChanged(user => {
    user ? UIauth(user) : UIunauth(user);
});

function login(event){
    event.preventDefault();

    UIload(event.target.submitbutton);

    //Sign in with firebase
    auth.signInWithEmailAndPassword(event.target.email.value, event.target.password.value)
        .then(() => {
            UIunload(event.target.submitbutton);
            displayChat();
        })
        .catch(e => {
            //Error handling for login input
            (e.code == "auth/invalid-email" && event.target.email.classList.add('is-error'));
            (e.code == "auth/wrong-password" && event.target.password.classList.add('is-error'));
            UIunload(event.target.submitbutton);
        });
}

function logout(event){
    firebase.auth().signOut().then(function() {

    }, function(error) {

    });
}


function register(event){
    //TODO
    event.preventDefault();
    //Manual required attr on inputs
    let err;
    !event.target.name.value && event.target.name.classList.add('is-error') && (err = true);
    !event.target.email.value && event.target.email.classList.add('is-error') && (err = true);
    !event.target.password.value && event.target.password.classList.add('is-error') && (err = true);
    !event.target.passwordagain.value && event.target.passwordagain.classList.add('is-error') && (err = true);
    if(err) return;

    //Add loader
    UIload(event.target.submitbutton);

    //Checking wether passwords match, if so create a new user in firebase database
    if(event.target.password.value === event.target.passwordagain.value){
        firebase.auth().createUserWithEmailAndPassword(event.target.email.value, event.target.password.value)
            .then(() => {
                UIunload(event.target.submitbutton);
                displayChat();

                //Update the fresh user account's display name
                firebase.auth().currentUser.updateProfile({ displayName: event.target.name.value })
                    .then(function () {
                        UIauth(firebase.auth().currentUser);
                    });
            })
            .catch(error => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
            });
    } else {
        event.target.password.classList.add('is-error');
        event.target.passwordagain.classList.add('is-error');
        UIunload(event.target.submitbutton);
    }
}
// HELPER
//Changes an element to a loading stage
function UIload(element){
    // element.classList.add('btn-primary');
    element.classList.add('loading');
}
//Removes any loading states
function UIunload(element){
    // element.classList.remove('btn-primary');
    element.classList.remove('loading');
}

//AUTH
function UIauth(user){
    const userzone = document.querySelector('.useremail');
    const unauth = document.querySelectorAll('.unauth');
    const auth = document.querySelectorAll('.auth');

    userzone.innerHTML = `<b>${user.displayName}</b> | ${user.email}`;
    userzone.parentElement.style.display = 'block';
    if(unauth){
        unauth.forEach(elem => {
            elem.style.display = 'none'
        });
    }
    if(auth){
        auth.forEach(elem => {
            elem.style.display = 'block'
        });
    }
}
//UNAUTH
function UIunauth(user){
    const userzone = document.querySelector('.useremail');
    const unauth = document.querySelectorAll('.unauth');
    const auth = document.querySelectorAll('.auth');

    if(userzone){
        userzone.innerText = "";
        userzone.parentElement.style.display = 'none';
    }
    if(unauth){
        unauth.forEach(elem => {
            elem.style.display = 'block'
        });
    }
    if(auth){
        auth.forEach(elem => {
            elem.style.display = 'none'
        });
    }
}
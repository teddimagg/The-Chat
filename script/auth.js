const auth = firebase.auth();

//Event listener on authentixation state changing (logging in/out)
firebase.auth().onAuthStateChanged(user => {
    const userzone = document.querySelector('.useremail');
    const unauth = document.querySelector('.unauth');

    if(user){
        //inject user info to header
        userzone.innerText = user.email;
        userzone.parentElement.style.display = 'block';
        unauth.style.display = 'none';
    } else {
        //remove login info from navbar and auth view
        if(userzone){
            userzone.innerText = "";
            userzone.parentElement.style.display = 'none';
        }
        unauth && (unauth.style.display = 'block');
    }
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
}
// HELPER
//Changes an element to a loading stage
function UIload(element){
    element.classList.add('btn-primary');
    element.classList.add('loading');
}
//Removes any loading style
function UIunload(element){
    element.classList.remove('btn-primary');
    element.classList.remove('loading');
}
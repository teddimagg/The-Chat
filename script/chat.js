//Global chatdata variable
let chatdata = [];

//Refrence and socket on firebasae live database
let chat = firebase.database().ref().child('chat');
chat.on('value', snap => {
    chatdata = snap.val();
    updateChat();
});

function updateChat(){
    if(chatdata){
        //Fetches messageboard from dom an initializes it
        const messageboard = document.querySelector('.messageboard');
        messageboard.innerHTML = "";

        //Inject message element for every messege in live database
        chatdata.forEach(single => {
            let message = document.createElement('ul');
                message.classList.add('menu');
                message.classList.add('message');
                message.innerHTML = `
                    <li class="menu-item">
                      <div class="tile tile-centered">
                        <div class="tile-icon">
                          <img src="https://picturepan2.github.io/spectre/img/avatar-4.png" class="avatar">
                        </div>
                        <div class="tile-content">
                          ${single.author}
                        </div>
                        <b>${single.time} | ${single.date}</b>
                      </div>
                    </li>
                    <li class="divider"></li>
                    <p>${single.subject}</p>
                `;
            //Prepending onto messageboard (Backwards FILO)
            messageboard.prepend(message);
        });
    }
}

function createMessage(event){
    event.preventDefault();
    //If connection has already been established
    if(chat && event.target.message.value && firebase.auth().currentUser){
        //Spreading chatdata array on a temporary array and the new message at the end
        //** Keeping it unessecarily complicated for future purposes **//
        let newdata = [...chatdata, {
            'author': firebase.auth().currentUser.displayName,
            'date': new moment().format('DD.MM.YYYY'),
            'time': new moment().format('HH:mm'),
            'subject': event.target.message.value
        }];

        //Slicing the maximum messageboardsize from the collection
        newdata = newdata.slice((newdata.length > 20) ? newdata.length - 20 : 0, newdata.length);
        //Updating database from ref
        chat.set(newdata);

        //UI
        event.target.message.classList.remove('is-error');
        event.target.message.value = "";
    } else {
        //UI
        event.target.message.classList.add('is-error');
    }

}
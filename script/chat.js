let chatdata = [];

let chat = firebase.database().ref().child('chat');
chat.on('value', snap => {
    console.log('updating chat');
    updateChat(snap.val());
});

function updateChat(snap){
    if(chatdata){
        const messageboard = document.querySelector('.messageboard');
        for(i = chatdata.length; i < snap.length; i++){
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
                          ${snap[i].author}
                        </div>
                        <b>${snap[i].time} | ${snap[i].date}</b>
                      </div>
                    </li>
                    <li class="divider"></li>
                    <p>${snap[i].subject}</p>
                `;
            messageboard.prepend(message);
        }
        chatdata = snap;
    }
}

function createMessage(event){
    event.preventDefault();
    //If connection has already been established
    if(chat && event.target.message.value && firebase.auth().currentUser){
        let newdata = [...chatdata, {
            'author': firebase.auth().currentUser.displayName,
            'date': new moment().format('DD.MM.YYYY'),
            'time': new moment().format('HH:mm'),
            'subject': event.target.message.value
        }];
        newdata = newdata.slice(newdata.length - 20, newdata.length);
        chat.set(newdata);

        event.target.message.classList.remove('is-error');
        event.target.message.value = "";
    } else {
        event.target.message.classList.add('is-error');
    }

}
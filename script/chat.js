let chatdata = [];

const chat = firebase.database().ref().child('chat');
chat.on('value', snap => {
    updateChat(snap.val());
});

function updateChat(snap){
    if(chatdata.length < snap.length){
        console.log('print');
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
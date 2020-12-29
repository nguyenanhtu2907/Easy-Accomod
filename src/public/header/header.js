document.addEventListener('mouseup', function (e) {
    var price = document.querySelector('.notification');
    if (price && !price.contains(e.target)) {
        document.querySelector('.notification .show-noti').classList.add('none')
        Array.from(document.querySelectorAll('.show-noti .fa-circle')).forEach(noti => {
            if (!noti.classList.contains('hidden')) {
                noti.classList.add('hidden')
            }
        })
    }
});
document.addEventListener('mouseup', function (e) {
    var price = document.querySelector('.account');
    if (price && !price.contains(e.target)) {
        document.querySelector('.account .show-info-option').classList.add('none')
    }
});
function showList(e, element) {
    if (document.querySelector(element).classList.contains('none')) {
        document.querySelector(element).classList.remove('none');
    } else {
        document.querySelector(element).classList.add('none');
        Array.from(document.querySelectorAll(element + ' .fa-circle')).forEach(noti => {
            if (!noti.classList.contains('hidden')) {
                noti.classList.add('hidden')
            }
        })
    }
    if (e.target.classList.contains('alerted')) {
        e.target.classList.remove('alerted')
    }
}
function toggleChatWindow(e) {
    document.querySelector('#message-window').classList.toggle('big-chat')
    document.querySelector('#message-window').classList.toggle('small-chat')
    document.querySelector('#message-window .title-window').classList.toggle('none')
    document.querySelector('#message-window .body-window').classList.toggle('none')
    document.querySelector('#message-window .title-window .fa-comments').classList.remove('alerted')
    refreshWindowChat();
}


function refreshWindowChat() {
    var idOwner = document.querySelector('.show-info-option>ul>li>a').href.slice(30);
    fetch('/account/get-info/' + idOwner)
        .then(owner => owner.json())
        .then(owner => {
            let html = '';
            owner.messages.forEach(message => {
                html += `
                <div class="small-message ${message.author == 'owner' ? 'owner-message' : ''}">
                    <span>${message.message}</span>
                </div>
            `
            })
            document.querySelector('.chat-window').innerHTML = html;
            document.querySelector('#message-window .body-window .chat-window').scrollTop = document.querySelector('#message-window .body-window .chat-window').scrollHeight;

        })
}

function getEnterWindowChat(e) {
    let chatArea = document.querySelector('.chat-window');
    let value = e.target.value;
    if (e.key == 'Enter' && value.trim()) {
        chatArea.innerHTML += `
        <div class="small-message owner-message"><span>${value}</span></div>
        `
        chatArea.scrollTop = chatArea.scrollHeight;
        submitMessageToDB(value, 'toAdmin')
        chatArea.parentNode.querySelector('.input-window input').value = '';
    }
}
function submitMessageWindowChat(e) {
    let chatArea = document.querySelector('.chat-window');
    let value = chatArea.parentNode.querySelector('.input-window input').value;
    if (value.trim()) {
        document.querySelector('.chat-window').innerHTML += `
            <div class="small-message owner-message"><span>${value}</span></div>
            `
        chatArea.scrollTop = chatArea.scrollHeight;
        submitMessageToDB(value, 'toAdmin')
    }
    chatArea.parentNode.querySelector('.input-window input').value = '';
}

var socket = io('http://localhost:3000');

function submitMessageToDB(value, to) {
    var ownerID = '';
    var type = '';
    if (document.querySelectorAll('#info-chat li span')[0]) {
        ownerID = document.querySelectorAll('#info-chat li span')[0].innerText;
        type = 'admin';
    } else {
        ownerID = document.querySelector('.show-info-option>ul>li>a').href.slice(30);
        type = 'owner'
    }

    var ownerFullname = document.querySelector('.info-account span b').innerText;

    let data = {
        owner: {
            id: ownerID,
            fullname: ownerFullname,
        },
        content: {
            author: type,
            message: value,
        }
    }
    fetch('/account/submit-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            //real-time socket.io
        })
        .catch(() => { })

    setTimeout(()=>{
        if(to == 'toOwner'){
            socket.emit(`messageToOwner`, ownerID)
            refreshListChat()
        }else{
            socket.emit(`messageToAdmin`, ownerID)
        }
    }, 100)
}

socket.on(`${document.querySelector('.show-info-option>ul>li>a').href.slice(30)}toOwner`, data => {
    if(document.querySelector('#message-window').classList.contains('big-chat')){
        refreshWindowChat()
    }else{
        document.querySelector('#message-window .title-window .fa-comments').classList.add('alerted')
    }
})


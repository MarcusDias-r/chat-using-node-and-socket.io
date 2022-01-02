const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");


socket.emit("select_room", {
    username,
    room,
})

document.getElementById("message_input").addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        const message = event.target.value; // Conteúdo do input text

        const data = {
            room, 
            message,
            username,
        }

        socket.emit("message", data);

        event.target.value = ""
    }  
});

socket.on("message", (data) => {
    createMessage(data)
})

function createMessage(data) {
    const messageDiv = document.getElementById("message_area");
    
    messageDiv.innerHTML += `
        <div class="message-box">
          <div class="user-data">
            <div class="photo-frame"></div>
            <div class="username" id="username">${data.username}</div>
          </div>
          <div class="message" id="message">
            ${data.text}
          </div>
        </div>
    `
}

document.getElementById("logout").addEventListener("click", (event) => window.location.href = "/");


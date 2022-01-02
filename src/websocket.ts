import { io } from "./http";

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}

interface Message {
    room: string;
    text: string;
    username: string;
    created_at: Date;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on("connection", (socket) => {
  
  // Entrada de um usuário à uma sala.
  socket.on("select_room", (data) => {

    socket.join(data.room); // Cria um vinculo entre o usuário e a sala

    const userInRoom = users.find((user) => user.username === data.username);

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        socket_id: socket.id,
        username: data.username,
        room: data.room,
      });
    }
    console.log(users);
    
  });

  // Envio de mensagem
  socket.on("message", (data) => {

    const message: Message = { 
        room: data.room,
        username: data.username,
        text: data.message,
        created_at: new Date()
    };

    messages.push(message);

    console.log(message);
    
    // Envia mensagem para usuários que deram join na respectiva sala
    io.to(data.room).emit("message", message);
  })



});

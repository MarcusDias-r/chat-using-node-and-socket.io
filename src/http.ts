import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname , "..", "/public/views"));
app.engine("html", require('ejs').renderFile)
app.set("view engine", "html");

// routes

app.get("/", function(req, res) { 
    res.render("index.html")
})

app.get("/chat", function(req, res) { 
    res.render("chat.html")
})

export { serverHttp, io };
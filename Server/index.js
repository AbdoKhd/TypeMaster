const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const {Server} = require('socket.io');

app.use(cors({origin: '*'}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const roomOccupancy = {};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) =>{
        socket.join(data);
        if (!roomOccupancy[data]) {
            roomOccupancy[data] = 1;
        } else {
            roomOccupancy[data]++;
        }

        console.log(roomOccupancy, "users in rooms BE")
        io.to(data).emit('room_occupancy', { occupancy: roomOccupancy[data] });

        socket.on('disconnect', () => {
            roomOccupancy[data]--;
            io.to(data).emit('room_occupancy', { occupancy: roomOccupancy[data] });
        });

    })

    socket.on("percentage", (data) => {
        socket.to(data.roomNb).emit("receive_percentage", data);
    })
})

server.listen(3003, () => {
    console.log("Server is running")
})

port = process.env.APP_PORT;

const currentDirectory = __dirname;
const buildDirectory = path.join(currentDirectory, 'build');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(cors({origin: '*'}));

// imports routes
const auth = require('./routes/auth');

const reg = require('./routes/reg');

const res = require('./routes/res')

const texts = require('./routes/texts');

app.use(express.static(buildDirectory));

app.get('/', (req, res)=>{
    res.send({message: 'Ok from the server side'});
});

// routes
app.use('/auth', auth);

app.use('/reg' , reg);

app.use('/res' , res);

app.use('/texts' , texts);

  

app.listen(port, ()=>{
    console.log(`my app is running on ${port}`);
})


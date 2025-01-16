import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import cors from "cors"
import ejs from "ejs";
import {v4 as uuid} from "uuid"

const app = express();
const port = 3000;
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
// app.set('views', './views');


const io = new Server(server);


io.on('connection' , socket=>{
  console.log("user connected successfully : " , socket.id );


  socket.on("join-room" , (roomId , userId)=>{
    console.log("join-room" , roomId , userId);

    socket.join(roomId)
    // socket.to(roomId).broadcast.emit("user-connected" , userId); //support ver4.
    // socket.broadcast.emit("user-connected" , userId)
    // io.to(roomId).emit("user-connected" , userId);
    
    socket.to(roomId).emit("user-connected", userId);


  })




  socket.on('disconnect'  , ()=>{
    console.log("user disconnected  " , socket.id );
  })
})




app.get('/', (req, res) => {
 
    const id = uuid();
     res.redirect(`/${id}`);

  });

  app.get('/:room', (req, res) => {
 
    res.render('index' , { rooID : req.params.room});
  });
  


  
  
server.listen(port, () => {
    console.log('server running at http://localhost:3000');
});


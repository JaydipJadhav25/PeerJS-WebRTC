console.log("rooom :" , roomId);


const socket = io("/");
const mypeer  = new Peer(undefined , {
    host: "/",
    port : "3001"
});


//ref o element
const videoGrid = document.getElementById("video-grid");


//create ele 
const myvideo = document.createElement('video');
myvideo.muted = true; //set muted
//get myvideo
navigator.mediaDevices.getUserMedia({
    video : true ,
    audio : true
}).then(stream =>{
    //stream load then call 
    // console.log("stream : " , stream);
     addVideoStream(myvideo , stream); //call
    


    mypeer.on("call" , call=>{
        call.answer(stream);
        
        const video = document.createElement('video');
        video.muted = true;
        call.on('stream',uservideoCall =>{
            addVideoStream(video , uservideoCall);

        })
     })




 socket.on("user-connected", (userId) => {
    alert("new user joined");
    //send to strem new user
    //send on userId , and send my strem
    createToNewUser(userId , stream);

});
 
})




// console.log("mypeer : " , mypeer);

mypeer.on('open' , id=>{

socket.emit("join-room" , roomId , id); //id of user connected peer server

})
// socket.emit("join-room" , roomId , 10);

// socket.on("user-connected", (userId) => {
//     console.log("User connected:", userId);
//     alert("User connected:", userId)
// });


function createToNewUser(userId, stream) {
    // Add event on peer to send stream to new connected user
    console.log("create to new user call....", userId , stream);

    const call = mypeer.call(userId, stream);


    const video = document.createElement('video');
    video.muted = true;

    // Handle event
    call.on('stream', uservideostream => {
        console.log("uservideo stream: ", uservideostream);

        addVideoStream(video, uservideostream);

        console.log("done............");
    });


    call.on('close' , ()=>{
        video.remove();
    })
}



function addVideoStream(video , stream){

    video.srcObject = stream
    video.addEventListener('loadedmetadata' , ()=>{
        video.play();
    });
    videoGrid.append(video);
    // videoGrid.append(video);
    
}
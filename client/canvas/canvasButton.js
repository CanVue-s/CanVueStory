//need it to save canvas
//const User = require('./../../server/models/userModel');

//Create socket instance
const socket = io();

//Triggered off Clear Canvas button click
function clearCanvas() {
    let canvas = document.getElementsByClassName('whiteboard')[0];
    let context = canvas.getContext('2d');

    //Clears the canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Emits 'cleared' to server.js (line 13)
    socket.emit('cleared', {
        Darrick: 'Is the Best!',
    });
}

function saveCanvas() {
    let canvas = document.getElementsByClassName('whiteboard')[0];
    let fullQuality = canvas.toDataURL();
    //fullQuality is the link that has the canvas
    //need to do post request

    //User.findOneAndUpdate({user: "user1"}, {canvas: fullQuality});
    console.log('i got updated!')
}

//Accepts mass emit from line 14 of server.js to clear out it's context
socket.on('clearCanvas', function (data) {
    let canvas = document.getElementsByClassName('whiteboard')[0];
    let context = canvas.getContext('2d');

    //Clears the canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);
});
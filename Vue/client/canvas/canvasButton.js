const URL = 'http://localhost:3000';

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
    let canvasURL = canvas.toDataURL();
    //post request to '/createCanvas' so that we create a new Canvas DB entry
    $.ajax({
        url: URL + '/createCanvas',
        type: "POST",
        data: JSON.stringify({
            roomNum: 1, //number is placeholder... need to be dynamic
            dateCreated: new Date(),
            canvas: canvasURL
        }),
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            console.log('i am post request for canvas!')
        }
    });
}

//no usage for this function yet... no button exist to trigger this.
function getCanvas() {
    $.ajax({
        url: URL + '/getCanvas',
        type: 'GET',
        datatype: 'json',
        success: function(data) {
            console.log("i am a canvas from DB", data);
        }
    })
}

//Accepts mass emit from line 14 of server.js to clear out it's context
socket.on('clearCanvas', function (data) {
    let canvas = document.getElementsByClassName('whiteboard')[0];
    let context = canvas.getContext('2d');

    //Clears the canvas content
    context.clearRect(0, 0, canvas.width, canvas.height);
});


var colors = new Vue({
  el: '#whiteboard',
  data: {
    title: "Transcript",
    colors: [
      {
        color: black
      },
      {
        color: red
      },
      {
        color: green
      },
      {
        color: blue
      },
      {
        color: yellow
      },
      {
        color: white
      }
    ]
  },
  methods: {
    clearCanvas: function() {
        let canvas = document.getElementsByClassName('whiteboard')[0];
        let context = canvas.getContext('2d');

        //Clears the canvas content
        context.clearRect(0, 0, canvas.width, canvas.height);

        socket.emit('cleared', {
            Darrick: 'Is the Best!',
        });

        socket.on('clearCanvas', function (data) {
            let canvas = document.getElementsByClassName('whiteboard')[0];
            let context = canvas.getContext('2d');

            //Clears the canvas content
            context.clearRect(0, 0, canvas.width, canvas.height);
        });
    },

    saveCanvas: function() {
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
    },

    //no usage for this function yet... no button exist to trigger this.
    getCanvas: function() {
        $.ajax({
            url: URL + '/getCanvas',
            type: 'GET',
            datatype: 'json',
            success: function(data) {
                console.log("i am a canvas from DB", data);
            }
        })
    }
  }
})

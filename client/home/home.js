$(document).ready(function () {

  window.setInterval(() => {
    $.ajax({
      url: `http://localhost:3000/allRooms`,
      type: "GET",
    }).then((results) => {
      let keys = Object.keys(results);

      $('#rooms').empty()

      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] !== "") {
          $('#rooms').append(`<div class='link-div well'><a class="eachRoom">Room: ${keys[i]} Users: ${results[keys[i]]}</a></div>`)
        }
      }
    })
  }, 500)

  // let rooms = [];
  // // updates the rooms and num of users in them
  // setInterval(() => {
  // }, 500)

  // dynamically creates a new room
  $('#create-room').submit((event) => {
    event.preventDefault();

    // $('#input-value').val();

    $.ajax({
      url: `http://localhost:3000/rooms/${$(this).text()}`,
      type: "PUT",
      data: JSON.stringify({
        username: localStorage.username,
        roomNum: $('#input-value').val()
      }),
      dataType: "json",
      contentType: "application/json",
      success: function (room) {
        console.log("successfully joined", room.rooms)
      }
    })

    let roomName = $('#create-room input').val();
    $('#rooms').append(`<div class='link-div well'><a class="eachRoom">${roomName}</a></div>`)
    $('#create-room input').val('');
  })

  $('body').on('click', 'a.eachRoom', function () {
    localStorage.room = $(this).text();

    $.ajax({
      url: `http://localhost:3000/rooms/${$(this).text()}`,
      type: "PUT",
      data: JSON.stringify({
        username: localStorage.username,
        roomNum: $(this).text()
      }),
      dataType: "json",
      contentType: "application/json",
      success: function (room) {
        console.log("successfully joined", room.rooms)
      }
    })

    location.href = `http://localhost:3000/rooms/${$(this).text()}`
  });
});
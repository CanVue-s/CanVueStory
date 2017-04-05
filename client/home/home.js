$(document).ready(function () {

  // setInterval(() => {
  //   $('#room1').text('Room 1:  ' + localStorage.room1.toString() + ' Users');
  //   $('#room1').text('Room 1:  ' + localStorage.room2.toString() + ' Users');
  //   $('#room1').text('Room 1:  ' + localStorage.room3.toString() + ' Users');
  // }, 500)

  // dynamically creates a new room
  $('#create-room').submit((event) => {
    event.preventDefault();
    let roomName = $('#create-room input').val();
    $('#rooms').append(`<div class='link-div well'><a class="eachRoom">${roomName}</a></div>`)
    $('#create-room input').val('');
  })

  $('body').on('click', 'a.eachRoom', function() {
    localStorage.room = $(this).text();
    location.href = `http://localhost:3000/rooms/${$(this).text()}`
  });
});
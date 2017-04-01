// const URL = 'http://ec2-52-89-83-246.us-west-2.compute.amazonaws.com:3000';
const URL = 'http://localhost:3000';

function sendObj(user, number, notes) {
  var obj = {
    user: user,
    number: number,
    notes: notes
  }
  return JSON.stringify(obj);
}

function createRoom() {
  let roomNumber = $('#rooms').children().length + 1;
  $.ajax({
    url: URL + '/create',
    type: "POST",
    data: sendObj('tracker'+roomNumber.toString(), '1', ''),
    dataType: "json",
    contentType: "application/json"
  });
  $.ajax({
    url: URL + '/create',
    type: "POST",
    data: sendObj('user1', roomNumber, ''),
    dataType: "json",
    contentType: "application/json"
  });
  let roomUrl = URL + "/rooms/room" + roomNumber.toString();
  let $roomLinks = $('<a id="room'+roomNumber.toString()+'" target="_blank" href='+roomUrl+'><div class="link-div well">Room '+roomNumber.toString()+' - 1 User</div></a>');
  $roomLinks.appendTo($('#rooms'));
  //document.location.href = roomUrl;
  window.open(roomUrl);
}

function createUser(roomNumber, userNumber) {
  let number = userNumber + 1;
  $.ajax({
    url: URL + '/create',
    type: "POST",
    data: sendObj('user' + number.toString(), roomNumber, ''),
    dataType: "json",
    contentType: "application/json"
  });
  $.ajax({
    url: URL + 'notes/tracker' + roomNumber,
    type: "PUT",
    data: sendObj('tracker' + roomNumber, number.toString, ''),
    dataType: "json",
    contentType: "application/json"
  });
  $('#room'+roomNumber.toString()+'').text('Room '+roomNumber.toString()+' - '+ number + ' User');
}

$(document).ready(function () {

  $('#create-room').on('submit', function (event) {
    event.preventDefault();
    createRoom();
  });

  $('#rooms').on('click', 'a', function (event) {
    let room = event.target.innerHTML.slice(5,6);
    let user = event.target.innerHTML.slice(9,10);
    let roomUrl = URL + "/rooms/room" + room;
    createUser(parseInt(room), parseInt(user));
    // document.location.href = roomUrl;
  })
});
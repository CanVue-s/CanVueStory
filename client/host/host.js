const URL = 'http://localhost:3000';

function sendObj(username, notes) {
  var obj = {
    username: username,
    notes: {
      roomNum: 1, //hard coded, but should be dynamic
      dateCreated: new Date(),
      note: notes
    }
  }
  return JSON.stringify(obj);
}

$(document).ready(function () {
  let user = window.location.pathname.slice(12);
  let notesUrl = URL + '/notes/' + username;

  $('#save').on('click', function (event) {
    let notes = $('#notes').val();
    $.ajax({
      url: URL + '/notes/' + username,
      type: "PUT",
      data: sendObj(username, notes),
      dataType: "json",
      contentType: "application/json"
    });
    $('#saveDate').text('Saved at ' + new Date());

  });

  $('#leave').on('click', function (event) {
    window.open(notesUrl);
  });
});
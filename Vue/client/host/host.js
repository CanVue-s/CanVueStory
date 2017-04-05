const URL = 'http://localhost:3000';

function sendObj(user, notes) {
  var obj = {
    user: user,
    notes: notes
  }
  return JSON.stringify(obj);
}

$(document).ready(function () {
  let user = window.location.pathname.slice(12);
  let notesUrl = URL + '/notes/' + user;

  $('#save').on('click', function (event) {
    let notes = $('#notes').val();
    $.ajax({
      url: URL + '/notes/' + user,
      type: "PUT",
      data: sendObj(user, notes),
      dataType: "json",
      contentType: "application/json"
    });
    $('#saveDate').text('Saved at ' + new Date());
    
  });

  $('#leave').on('click', function (event) {
    window.open(notesUrl);
  });
});
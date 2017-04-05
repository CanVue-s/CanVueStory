const URL = 'http://localhost:3000';

//calculate time of the creation
function currentDate() {
    let timestamp = new Date().getTime();
    let todate = new Date(timestamp).getDate();
    let tomonth = new Date(timestamp).getMonth()+1;
    let toyear = new Date(timestamp).getFullYear();
    let original_date = tomonth+''+todate+''+toyear;
    return original_date
}

function sendObj(username, notes) {
  var obj = {
    username: username,
    notes: {
      roomNum: "string", //hard coded, but should be dynamic
      dateCreated: currentDate(),
      note: notes
    }
  }
  return JSON.stringify(obj);
}

$(document).ready(function () {

  $('#save').on('click', function (event) {
    let notes = $('#notes').val();
    $.ajax({
      url: URL + '/notes',
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
const render = function (list) {
  $('#kudos').empty();
  for (let i = 0; i < list.length; i++) {
    $('#kudos').append(
      `<div class="card mb-3 kudo id: ${list[i]._id} card border-primary">
    
       <h3 class="tofrom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       To: ${list[i].to}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       From: ${list[i].from}</h3>


       <h1 class="title">${list[i].title}</h1>

       <div class="card-body">

       <h4 class="body">${list[i].body}</h4>
       </div>
       </div>`
    );

  }

}

const getKudos = function () {
  $.get(`/api/kudos/`).then(function (data) { render(data) });
}

const getusers = function () {
  $.get(`/api/users/`)
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        $('#kudo-from')
          .append(`<option value='${data[i]._id}'>${data[i].firstname}</option>`)

        $('#kudo-to')
          .append(`<option value='${data[i]._id}'>${data[i].firstname}</option>`)
      }
    });
}





const postKudo = function (event) {
  event.preventDefault();
  $('#messages').empty();
  if ($('#kudo-from').val() && $('#kudo-to').val()) {

    const kudo = {
      title: $('#kudo-title').val().trim(),
      body: $('#kudo-body').val().trim(),
      from: $('#kudo-from :selected').text(),
      to: $("#kudo-to :selected").text()
    }
    $.post('/api/kudos', kudo)
      .then(function (data) {
        console.log(kudo)
        $('#kudo-title').val('');
        $('#kudo-body').val('');
        $('#kudo-from').val('');
        $('#kudo-to').val('');
        $('.modal').modal('hide');
        getKudos();
      }).fail(function (err) {
        $('#messages').append(`<div class='alert alert-danger'>There was an error with your submission. Please try again.</div>`)
      })
  } else {
    $('#messages').append(`<div class='alert alert-danger'>Make sure to select a user from both dropdowns.</div>`)
  }
}




getKudos();
getusers();


$(document).on('click', '#send-kudo', postKudo);
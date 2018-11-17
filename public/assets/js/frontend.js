
$(function () {

  // Function for creating a new list row for Recipes
  const kudos = function (dataList) {
    console.log(dataList);
    const kudos = $(`#kudos`);
    kudos.data('kudos', dataList);
    kudos.append(`<h5>${dataList.title}</h5>`);
    kudos.append(`<h6>From: ${dataList.firstname}</h6>`);
    kudos.append(`<h6>To: ${dataList.firstname}</h6> `);
    kudos.append(`<p>${dataList.body}</p>`);
    return kudos;

  }

  const render = function () {
    $.get('/api/kudos', function (data) {
      renderkudos(data);
      nameInput.val('');
    });
  }
  const renderkudos = function (data) {
    const rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      kudos.push(kudos(data[i]));
    }
    dataList.append(kudos)

  }

  render();

})

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
      from: $('#kudo-from').val(),
      to: $('#kudo-to').val()
    }

    $.post('/api/kudos', kudo)
      .then(function (data) {
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
    $('#messages').append(`<div class='alert alert-danger'>Please select both a sender and receiver</div>`)
  }
}

// getKudos();
getusers();

$(document).on('click', '#send-kudo', postKudo);
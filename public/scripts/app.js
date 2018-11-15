$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
      $("<div>").text(user.email).appendTo($("body"));
    }
  });

// TOAD: determine ajax request to server;
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(alert("DOCUMENT ON READY, THIS HAPPENS ON APP.JS LINE 17"));

});

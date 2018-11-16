// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

$(document).ready(function () {
  $('.startbtn').on('click', function() {
    $('.start').slideUp();
    $('.createEvent').slideDown();
  });

  $('.btn').on('click', function(event) {
    event.preventDefault();
    const $form = $('.createEvent');
    $.ajax({
      type: 'POST',
      url: '/events',
      data: $form.serialize(),
      success: function () {
        $form.slideUp();
        $('.details').slideDown();
      }
    });
  });

  $('.fa-user-tie').on('click', function () {
    $('.fa-user-tie').css('color', 'white');
    $(this).css('color', 'red');
  });

  $('.fa-user-friends').on('click', function () {
    $('.fa-user-friends').css('color', 'white');
    $(this).css('color', 'red');
  });

  $('.fa-network-wired').on('click', function () {
    $('.fa-network-wired').css('color', 'white');
    $(this).css('color', 'red');
  });

  $('.dtbtn').on('click', function (event) {
    event.preventDefault();
    const $form = $('.dtform');
    $.ajax({
      type: 'POST',
      url: '/events/create',
      data: $form.serialize(),
      success: function (result) {
        window.location = "http://localhost:8080/events/" + result.eventUrl;
      }
    });

  });
});


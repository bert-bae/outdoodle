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
      }
    });
  });
});

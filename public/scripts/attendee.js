$(document).ready(function () {
  $('.user-register').slideDown();
  //write an if statement so if the user has already enter there name and email they don't see this form, otherwise slidedown;
  $('.user-register-form').on('submit', function (event) {
    event.preventDefault(event);

  $.ajax({
        type: 'POST',
        url: '/events/:id/userinfo',
        data: $('.user-register-form').serialize(),
        success: function (result) {

        }
      });

  });

});

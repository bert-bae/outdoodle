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

function resetIconsColor(){
    $('.fa-user-friends').css('color', 'white');
    $('.fa-network-wired').css('color', 'white');
    $('.fa-user-tie').css('color', 'white');
    return

}


  $('.fa-user-tie').on('click', function () {
    resetIconsColor();
    $(this).css('color', 'red');
    $('input.category').val("3");
    console.log($('input.category').val());
  });

  $('.fa-user-friends').on('click', function () {
    resetIconsColor();
    $(this).css('color', 'red');
    $('input.category').val("1");
    console.log($('input.category').val());
  });

  $('.fa-network-wired').on('click', function () {
    resetIconsColor();
    $(this).css('color', 'red');
    $('input.category').val("2");
    console.log($('input.category').val());
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


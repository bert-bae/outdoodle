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

  var $stdt = $('#stdt');
  $('#stdt').change(function () {
    console.log($stdt.val().toISOString.subString(0, 10));
    $('#enddt').attr('min', $stdt.val().toISOString.subString(0, 10));
  });

  $('.startbtn').on('click', function() {
    $('.start').slideUp();
    $('.createEvent').slideDown();
  });

  $('.btn').on('click', function(event) {
    event.preventDefault();
    const $form = $('.createEvent');
    const $name = $('input.name');
    const $email = $('input.email');

    if($name.val() === "" || $email.val() === "") {
      console.log('eroooorrrr');
      $('#error').slideDown();
    } else {
      $('#error').slideUp();
      // alert($form.serialize());
      $.ajax({
        type: 'POST',
        url: '/events',
        data: $form.serialize(),
        success: function () {
          console.log('form.serialize', $form.serialize());
          $form.slideUp();
          $('.details').slideDown();
        }
      });
    }
});


  function resetIconsColor(){
      $('.fa-user-friends').css('color', 'white');
      $('.fa-network-wired').css('color', 'white');
      $('.fa-user-tie').css('color', 'white');
      return;
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
  });

  $('.fa-network-wired').on('click', function () {
    resetIconsColor();
    $(this).css('color', 'red');
    $('input.category').val("2");
    console.log($('input.category').val());
  });

  $('.dtform').on('submit', function (event) {
    event.preventDefault(event);
    const $form = $('.dtform');
    const $errorx1 = $('input.evtnameinput');
    const $errorx2 = $('input.evtlocationinput');
    const $errorx3 = $('textarea.description');
    const $errorx6 = $('#stdt');
    const $errorx4 = $('#enddt');
    const $errorx5 = $('input.category');
    if ($errorx1.val() === "" || $errorx2.val() === "" || $errorx3.val() === "" || $errorx6.val() === "" || $errorx4.val() === "" || $errorx5.val() === "" ) {
      console.log('category needs an input');
      $('.error2').slideDown();
      console.log($('input.end_date').val());
    } else {
      $('.error2').slideUp();
    $.ajax({
      type: 'POST',
      url: '/events/create',
      data: $form.serialize(),
      success: function (result) {
        window.location = "http://localhost:8080/events/" + result.eventUrl + '/edit';
      }
    });
    }
  });


});


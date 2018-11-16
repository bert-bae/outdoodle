
$(document).ready(function () {
  $('.infobtn').on('click', function () {
    $('.specifics').slideDown();
  });
$('.addslot').on('click', function(event) {
  event.preventDefault();
  alert('Yes...soon');
  var $slot1 = $('<input>I am timeslot input!</input>');
  $slot1.addClass('timeslotHR');
  $slot1.css({
    'width': '50px'
  });
  $('.slotdiv').append($slot);
    $.ajax({
      type: 'POST',
      url: '/:id/timeslots',
      data: $form.serialize(),
      success: function () {
        alert('WHAT YO IM RECEIVIN SHIT YO??!!??');
      }
    });
  });
});

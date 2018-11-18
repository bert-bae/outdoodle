
// renders the number of time slots per event
$(document).ready(function () {

  const renderTimeSlots = (result) => {
    const $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').html('4:30 - 7:30');
      $('.row').append($timeslot);

    $timeslot;
    $('.row').append($timeslot);

  };

  const numberOfLoops = (num) => {
    for (var i = 0; i < num; i++) {
      renderTimeSlots();
    }
  };

  numberOfLoops();

});

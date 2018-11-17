
$(document).ready(function () {
  $('.setslots').on('click', function () {
    $('.setslotsdiv').slideToggle();
  });




  $('.setslotsdiv').on('submit', 'form', function (event) {
    event.preventDefault(event);
    var $slotdata = $('form');
    var $slotdiv = $('<div></div>');
    var $date = $('<input></input>').attr({
      type: 'date'
    });
    var $hr = $('<input></input>').attr({
      type: 'number',
      name: 'slothr',
      placeholder: 'hr'
    }).css('width', '50px');
    var $min = $('<input></input>').attr({
      type: 'number',
      name: 'slotmin',
      placeholder: 'min'
    }).css('width', '50px');
    var $hr2 = $('<input></input>').attr({
      type: 'number',
      name: 'slothr2',
      placeholder: 'hr'
    }).css('width', '50px');
    var $min2 = $('<input></input>').attr({
      type: 'number',
      name: 'slotmin2',
      placeholder: 'min'
    }).css('width', '50px');
    // alert($('.slotform').serialize());

     $.ajax({
      type: 'POST',
      url: '/:id/edit/timeslots',
      data: $slotdata.serialize(),
      success: function (result) {

      }
    });

    $('.slotform').remove();

    var $slotform = $('<form></form>').attr({
      method: 'post',
      action: '/:id/timeslots',
      class: 'slotform'
    });
    var $slotbtn = $('<button>Submit</button>').attr({id: 'submit'});
    $($slotdiv).append('From when to when?', $date, $hr, $min, ' - ', $hr2, $min2);
    $($slotform).append($slotdiv, '<br>', '<br>', $slotbtn);
    $($slotdiv).addClass('slotdiv');
    $('.setslotsdiv').prepend($slotform);

    var $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').html('4:30 - 7:30');
    $('.row').append($timeslot);





  });
});


$(document).ready(function () {
  $('.setslots').on('click', function () {
    $('.setslotsdiv').slideToggle();
  });




  $('.setslotsdiv').on('submit', 'form', function (event) {
    event.preventDefault(event);

    var $slotdiv = $('<div></div>');
    var $date = $('<input></input>').attr({
      type: 'date'
    });
    var $hr = $('<input></input>').attr({
      type: 'number',
      name: 'slothr'
    }).css('width', '50px');
    var $min = $('<input></input>').attr({
      type: 'number',
      name: 'slotmin'
    }).css('width', '50px');
    var $hr2 = $('<input></input>').attr({
      type: 'number',
      name: 'slothr2'
    }).css('width', '50px');
    var $min2 = $('<input></input>').attr({
      type: 'number',
      name: 'slotmin2'
    }).css('width', '50px');
    alert($('.slotform').serialize());
    $('.slotform').remove();

    var $slotform = $('<form></form>').attr({
      method: 'post',
      action: '/:id/timeslots',
      class: 'slotform'
    });
    var $slotbtn = $('<button>Submit</button>');
    $($slotdiv).append('From when to when?', $date, $hr, $min, ' - ', $hr2, $min2);
    $($slotform).append($slotdiv, '<br>', '<br>', $slotbtn);
    $($slotdiv).addClass('slotdiv');
    $('.setslotsdiv').prepend($slotform);





  });
});

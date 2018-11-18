
$(document).ready(function () {
  $('.setslots').on('click', function () {
    $('.setslotsdiv').slideToggle();
  });

  $('.setslotsdiv').on('submit', 'form', function (event) {
    event.preventDefault(event);
    var $slotdata = $('form');
    var $slotdiv = $('<div></div>');
    var $date = $('<input></input>').attr({
      name: 'slotdate',
      type: 'date'
    });
    var $hr = $('<input></input>').attr({
      type: 'time',
      name: 'slothr',
      value: '12:00',
      step: '900',
      min: '0'
    });
    var $hr2 = $('<input></input>').attr({
     type: 'time',
     name: 'slothr2',
     value: '12:00',
     step: '900',
     min: '0'
    });

     $.ajax({
      type: 'POST',
      url: '/events/:id/edit',
      data: $slotdata.serialize(),
      success: function (result) {
        console.log("test");
      }
    });

    $('.slotform').remove();

    var $slotform = $('<form></form>').attr({
      method: 'post',
      action: '/events/:id/edit',
      class: 'slotform'
    });
    var $slotbtn = $('<button>Submit</button>').attr({id: 'submit'});
    $($slotdiv).append('From when to when?', $date, $hr, ' - ', $hr2);
    $($slotform).append($slotdiv, '<br>', '<br>', $slotbtn);
    $($slotdiv).addClass('slotdiv');
    $('.setslotsdiv').prepend($slotform);

    var $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').html('4:30 - 7:30');
    $('.row').append($timeslot);





  });
});

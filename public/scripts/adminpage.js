
$(document).ready(function () {
  var $min = $('#minmax').attr('min');
  var $max = $('#minmax').attr('max');

var i = 0;
  $('.setslots').on('click', function () {
    $('.setslotsdiv').slideToggle();
  });

// $('.slotdel').on('submit', function (event) {
//   event.preventDefault(event);
// });




  $('.setslotsdiv').on('submit', '.slotform', function (event) {
    event.preventDefault(event);
    var $slotdata = $('form');
    var $slotdiv = $('<div></div>');
    var $date = $('<input></input>').attr({
      name: 'slotdate',
      type: 'date',
      min: $min,
      max: $max
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

      }
    });

    $('.slotform').remove();

    var $slotform = $('<form></form>').attr({
      method: 'post',
      action: '/events/:id/edit/',
      class: 'slotform'
    });
    var $slotbtn = $('<button>Submit</button>').attr({id: 'submit'});
    $($slotdiv).append('<b>From when to when?</b> ', $date, ' ', $hr, ' - ', $hr2);
    $($slotform).append($slotdiv, '<br>', '<br>', $slotbtn);
    $($slotdiv).addClass('slotdiv');
    $('.setslotsdiv').prepend($slotform);
    // i++;
    var $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').html('4:30 - 7:30').attr({
      name: i,
      'data-votes': 0
    });
    $('.row').append($timeslot);
    var $slotdelform = $('<form></form>').attr({
      method: 'POST',
      action: '/events/:id/edit/deletetime'
    }).addClass('slotdel');
    var $slotdelbtn = $('<button>Delete</button>');
    $slotdelform.append($slotdelbtn);
    $timeslot.append($slotdelform);

  $('.purpi').on('submit', function (event) {
    event.preventDefault(event);
    $(this).attr('data-votes', '1');
    // alert($(this).attr('data-votes'));
      $(this).remove();
      // alert($(this).attr('name'));
      $.ajax({
        type: 'POST',
        url: '/events/:id/edit/deletetime',
        data: $(this).attr('name'),
        success: function (result) {
          i--;
          alert('holy moly');
        }
      });
  });
  });


});

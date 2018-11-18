
$(document).ready(function () {
  var $min = $('#minmax').attr('min');
  var $max = $('#minmax').attr('max');

var i = 0;
  $('.setslots').on('click', function () {
    $('.setslotsdiv').slideToggle();
  });

// deletes the time slot (admin access)

  $('form.slotdel').on('click', function (event) {
// alert("damn")
    event.preventDefault(event);
    // $(this).closest('div.col-sm').remove();
    $.ajax({
      type: 'POST',
      url: '/events/:id/edit/deletetime',
      data: $(this).serialize(),
      success: function (result) {
        $('div.delete').filter(function(){
            return $(this).attr('data-votetimeid') === result.voteid.toString();
        }).remove();
      }
    });
  });

// increments the vote
  $('.vote').on('click', function (event) {
    event.preventDefault(event);
    $.ajax({
      type: 'POST',
      url: '/events/:id/vote',
      data: $(this).serialize(),
      success: function (result) {
        console.log(result);
      }
    });
  });

  $('.setslotsdiv').on('submit', '.slotform', function (event) {
    event.preventDefault(event);
    const $slotdata = $('form');
    const $slotdiv = $('<div></div>');
    const $date = $('<input></input>').attr({
      name: 'slotdate',
      type: 'date',
      min: $min,
      max: $max,
      value: $min
    });
    const $hr = $('<input></input>').attr({
      type: 'time',
      name: 'slothr',
      value: '12:00',
      step: '900',
      min: '0'
    });
    const $hr2 = $('<input></input>').attr({
      type: 'time',
      name: 'slothr2',
      value: '12:00',
      step: '900',
      min: '0'
    });
    const $slotform = $('<form></form>').attr({
      method: 'post',
      action: '/events/:id/edit/',
      class: 'slotform'
    });
<<<<<<< HEAD
    var $slotbtn = $('<button>Submit</button>').attr({id: 'submit'});
    var $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').addClass('uslot').html($('input[name=slotdate]').val() + '<br>' + $("input[name=slothr]").val() + ' - ' + $('input[name=slothr2').val()).attr({
      name: i,
      'data-votes': 0
    });
    var $slotdelform = $('<form></form>').attr({
      method: 'POST',
      action: '/events/:id/edit/deletetime'
    }).addClass('slotdel');
    var $slotdelbtn = $('<button>Delete</button>');
=======
    const $slotbtn = $('<button>Submit</button>').attr({id: 'submit'});
>>>>>>> 8875c1f5b36b25531d319c08bef9ade0188080c8

    $.ajax({
      type: 'POST',
      url: '/events/:id/edit',
      data: $slotdata.serialize(),
      success: function (result) {
<<<<<<< HEAD
        console.log('IM GETTING DATA');
        // $timeslot.addClass();
=======
        const $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').html('4:30 - 7:30').attr({
          name: i,
          'data-votes': 0,
          'data-triggered': 'false'
        });
        const $slotdelform = $('<form></form>').attr({
          method: 'POST',
          action: '/events/:id/edit/deletetime'
        }).addClass('slotdel');
        const $slotdelbtn = $('<button>Delete</button>');

        $('.row').append($timeslot);
        $slotdelform.append($slotdelbtn);
        $timeslot.append($slotdelform);
>>>>>>> 8875c1f5b36b25531d319c08bef9ade0188080c8
      }
    });

    $('.slotform').remove();
    $($slotdiv).append('<h2>Pick potential event dates and times.</h2> ', $date, ' ', $hr, ' - ', $hr2);
    $($slotform).append($slotdiv, '<br>', $slotbtn);
    $($slotdiv).addClass('slotdiv');
    $('.setslotsdiv').prepend($slotform);
    i++;
  });
});

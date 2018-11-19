const loopTimeSlots = () => {
  let votes = $('.voteyes').toArray();
  let parsed = [];
  for (let i = 0; i < votes.length; i++) {
    parsed.push({voteid: votes[i].dataset.votetimeid, votecount: votes[i].dataset.votes});
  }
  return parsed;
};

$(document).ready(function () {
//make handler for confirm
  $('.confirm-form').on('submit', function (event) {
    event.preventDefault(event);
    var $confirm = $(this);
    $.ajax({
      type: 'POST',
      url: '/events/:id/confirm',
      data: $confirm.serialize(),
      success: function (result) {
        window.location = `http://localhost:8080/events/${result.redirect}/confirm`;
      }
    });
  });


  var $min = $('#minmax').attr('min');
  var $max = $('#minmax').attr('max');

  //confirms chosen timeslot

var i = 0;
  $('.setslots').on('click', function () {
    $('.setslotsdiv').slideToggle();
  });

// deletes the time slot (admin access)
  $('form.slotdel').on('click', function (event) {
    event.preventDefault(event);
    // $(this).closest('div.col-sm').remove();
    $.ajax({
      type: 'POST',
      //add actual id where :id is currently
      url: '/events/:id/edit/deletetime',
      data: $(this).serialize(),
      success: function (result) {
        $('div.delete').filter(function(){
          return $(this).attr('data-votetimeid') === result.voteid.toString();
        }).remove();
      }
    });
  });

// trigger the voted yes class and data-triggered attribute on the dom element
  $('div.vote').on('click', function (event) {
    event.preventDefault(event);
    let match = 'true';
    if ($(this).attr('data-triggered') === "true") {
      match = "false";
    }
    $(this).toggleClass('voteyes');
    $(this).attr('data-triggered', match);
  });


  $('.user-register-form').on('submit', function (event) {
    event.preventDefault(event);
     $.ajax({
      type: 'POST',
      url: '/events/:id/vote',
      data: {
        userdata: $(this).serializeArray(),
        votes: loopTimeSlots(),
      },
      success: function (result) {
        window.location = `http://localhost:8080/events/${result.redirect}`;
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

    const $slotbtn = $('<button>Submit</button>').attr({id: 'submit'});

   $.ajax({
     type: 'POST',
     url: '/events/:id/edit',
     data: $slotdata.serialize(),
     success: function (result) {
       console.log("This is the result on the ajax end: ", result.data);
       const $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').attr({
         'class': `col-sm uslot purpi name${i} vote delete`,
         'data-votetimeid': result.data.id,
         'data-votes': 0,
         'data-triggered': 'false'
       });
       const $slotdelform = $('<form></form>').attr({
         method: 'POST',
         action: '/events/:id/edit/deletetime'
       }).addClass('slotdel').on('click', function (event) {
          event.preventDefault(event);

          $.ajax({
            type: 'POST',
            url: '/events/:id/edit/deletetime',
            data: $(this).serialize(),
            success: function (result) {
              $('div.delete').filter(function(){
                  return $(this).attr('data-votetimeid') === result.voteid.toString();
              }).remove();
              const $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').attr({
                'class': `col-sm uslot purpi name${i} vote delete`,
                'data-votetimeid': result.data.id,
                'data-votes': 0,
                'data-triggered': 'false'
              });
              const $slotdelform = $('<form></form>').attr({
                method: 'post',
                action: '/events/:id/edit/deletetime',
                class: 'slotdel',
              });
            }
          });
        });

       const $slotdelbtn = $('<button class="timeslot-del">Delete</button>');
       const $date = $(`<p>${result.data.date}</p>`);
       const $input = $(`<input type="text" name="voteid" value="${result.data.id}" style="display:none">`);
       const $time = $(`<p>${result.data.proposed_start_time} - ${result.data.proposed_end_time}</p>`);
       const $votes = $('<p>Number of votes:  0</p>');
       const $confirmform = $('<form class="confirm-form" method="POST" action=""><button>Confirm</button></form>');

       $('.row').append($timeslot);
       $timeslot.append($date);
       $timeslot.append($time);
       $timeslot.append($votes);
       $slotdelform.append($input);
       $slotdelform.append($slotdelbtn);
       $timeslot.append($confirmform);
       $timeslot.append($('<br>')).append($slotdelform);
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

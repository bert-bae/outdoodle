$(document).ready(function () {

  const renderTimeSlots = (result) => {

    var $timeslot = $('<div></div>').addClass('col-sm').addClass('purpi').html('4:30 - 7:30');
      $('.row').append($timeslot);
  };
    result.forEach()
});


let createTweetElement = (data) => {

    let user = data.user;
    let content = data.content;
    let dateCreated;

    const pluralizeText = () => {
      let time = ((Date.now() - data.created_at) / 86400000).toFixed(0);

      if (time > 1 ) {
        dateCreated = time + " days ago.";
      }
      if (time === 1) {
        dateCreated = time + " day.";
      }
      if (time < 1) {
        dateCreated = "Less than 1 day.";
      }
    };
    pluralizeText();

    const createCommentHeader = () => {
      let commentHeader =
      $('<div>').addClass('comment-header').append(
        $('<img>').attr('src', user.avatars.regular),
        $('<h2>').text(user.name),
        $('<p>').text(user.handle)
      );
      return commentHeader;
    };
    const createTextContainer = () => {
      let textContainer = $('<div>').addClass('text-container').append($('<p>').text(content.text));
      return textContainer;
    };
    const createCommentFooter = () => {
      console.log(data.userid);
      let commentFooter =
      $('<div>').addClass('comment-footer').append(
        $('<p>').text(dateCreated),
        $('<span>').addClass("fa-layers fa-fw").attr('data-userid', data.userid).append(
          $('<i>').addClass("fab fa-font-awesome-flag")
        ),
        $('<span>').addClass("fa-layers fa-fw").attr('data-userid', data.userid).append(
          $('<i>').addClass("fas fa-retweet")
        ),
        $('<span>').addClass("fa-layers fa-fw").attr('data-userid', data.userid).append(
          $('<i>').addClass("fas fa-heart"),
          $('<span>').addClass("fa-layers-counter fa-heart")
        )
      );
      return commentFooter;
    };

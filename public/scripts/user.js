$(document).ready(function () {
  alert('im loaded yo!');
  $('.purpi').on('click', function () {
    $(this).toggleClass('clicked');
  });
});

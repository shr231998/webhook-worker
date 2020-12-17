$(document).ready(function() {
  $('button.floatmenu').click(function() {
    return $('.menu__wrapper').toggleClass('is__open'), !1
  })
  $(window).resize(function() {
    $('#nav_menu').hasClass('is__open') &&
      !$("button[class='floatmenu']").is(':visible') &&
      $('#nav_menu').removeClass('is__open')
  })
  $('#year').text(new Date().getFullYear())
})

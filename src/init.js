$(document).ready(() => {
  $('.modal').modal();
  $('.tabs').tabs();
  $('select').formSelect();
  $('#slide-out0').sidenav();
  $('#slide-out1').sidenav();
  $('#slide-out2').sidenav({ edge: 'right' });
  $('.dropdown-trigger').dropdown();
  $('.collapsible').collapsible();
});

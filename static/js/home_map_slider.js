$(function() {
  /*** Create Slider Labels Table ***/
  var tableHTML = '<table id="slider_labels_table"><tr>';
  var today = new Date();
  var month = today.getMonth();
  var year = today.getFullYear();

  /* TODO : fill in this list
  - change month labels indexing below
  - add CSS styling to table cells
  - add CSS styling to slider
  - maybe use cols / colgroups to control width of table cells
  */
  var MONTH_LABELS = ['January', 'February', '...'];

  for (var i=6; i>=0; i--) {
    var cur_month = new Date(year, month-i, 1).getMonth();
    tableHTML += "<td>" + MONTH_LABELS[some number] + "</td>";
  }
  tableHTML += "</tr></table>"
  document.getElementById("slider_labels").innerHTML = tableHTML;

  /*** Create Actual Slider ***/
  $( "#slider_range" ).slider({
    range: true,
    min: 1,
    max: 7,
    values: [ 5, 7 ],
    slide: function( event, ui ) {
      $( "#amount" ).text( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).text( $( "#slider_range" ).slider( "values", 0 ) +
    " - " + $( "#slider_range" ).slider( "values", 1 ) );
});
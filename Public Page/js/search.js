$(document).ready(function() {

      function inputSearch() {

             var link = "";

             $('#search-submit').click(function(event) {

                       event.preventDefault();

                       var queryString = $('#search-input').val();

                       // Make sure this location matches your site structure

                       var location = "" + queryString;

                       link = location;

                       $('#search-input').attr("value", '');

                       window.location.href = link;

                       return;

             });

      }

      inputSearch();

               

      $('#search-input').keypress(function(key) {

             if($(this).is(":focus") && (key.which == 13)) {

                       $('#search-submit').click();

             }

      });

});
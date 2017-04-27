/* ------------------------------------------------------ */
// Gets location categories  from rest api
function get_location_categories( appendSelector ) {

    // Opens http request
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'http://towwwn.smamo.dk/wp-json/wp/v2/locations?per_page=100&page=1' );

    xhr.addEventListener( 'load', function( data ) {

        // Setup vars
        var resp = $.parseJSON( data.target.response );
        var categories = [];

        // Generates array of categories
        for (var ri = 0; ri < resp.length; ri++) {
            var resp_cats = resp[ri].categories;
            for (var rci = 0; rci < resp_cats.length; rci++) {
                if ( categories.indexOf( resp_cats[rci][0] ) == -1 ) {
                    categories.push( resp_cats[rci][0] );
                }
            }
        }

        // Generates response
        var final_resp = '<div class="category-container">';
        for ( var i = 0; i < categories.length; i++ ) {
            final_resp += '<div class="category">';
            final_resp += '<div class="category-title">'+categories[i]+'</div>';
            final_resp += '</div>';
        }

        final_resp += '</div>';

        // Appends response to specified selector
        $(appendSelector).append( final_resp );

    });

    // Sends the http request
    xhr.send();

}

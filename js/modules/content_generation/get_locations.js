/* ------------------------------------------------------ */
// Gets locations from rest api
function get_locations(getnum, appendSelector){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://towwwn.smamo.dk/wp-json/wp/v2/locations?per_page='+postsPerPage+'&page=1');
    xhr.addEventListener('load', function(data) {
        var getresponse = $.parseJSON( data.target.response );
    });

    xhr.send();
}

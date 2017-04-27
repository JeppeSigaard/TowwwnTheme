
// wew
if (typeof jQuery === "function") {
    var $ = jQuery;
    $(function() {

        /* ------------------------------------------------------ */
        // Gets locations from rest api
        // get_locations(100, '#locations')
        function get_locations(postsPerPage, appendSelector){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://towwwn.smamo.dk/wp-json/wp/v2/locations?per_page='+postsPerPage+'&page=1');
            xhr.addEventListener('load', function(data) {
                var getresponse = $.parseJSON( data.target.response );
                console.log(getresponse);

                for (var i = 0; i < getresponse.length; i++) {
                    var response = '<div class="location" id="location'+i+'">';
                    response    += '<div class="locationtitle"><h1>'+getresponse[i].name+'</h1></div>';
                    response    += '</div>'
                    $(appendSelector).append(response);
                }
            });

            xhr.send();
        }

        /* ------------------------------------------------------ */
        // Gets events from rest api
        get_events(100, 12, '#eventscontainer');
        function get_events(postsPerPage, getNum, appendSelector){

            // Sends xhr get request to rest api
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://towwwn.smamo.dk/wp-json/wp/v2/events?per_page='+postsPerPage+'&page=1');

            // CB Function
            xhr.addEventListener('load', function(data) {

                // Gets data
                var getresponse = $.parseJSON( data.target.response );
                var dates = [];
                for (var i = 0; i < getresponse.length; i++) {
                    getresponse[i].start_time.push(getresponse[i]);
                    dates.push(getresponse[i].start_time);
                }
                dates.sort();

                var counter = 0;
                for (var i = 0; i < dates.length; i++) {
                    var elem = dates[i][1];

                    // Formates start time
                    var start_time = new Date(dates[i][0]);
                    var start_time_formatted = start_time.getDate() + ' / '
                        + (start_time.getMonth()+1) + ' - '
                        + start_time.getFullYear();

                    if (start_time.getTime() < new Date().getTime()) { continue; }
                    if (counter >= getNum) { break; }
                    counter++;

                    // Formats name
                    var name = String(elem.name).substr(0, 25),
                        convert = false;
                    if (String(name) != String(elem.name)) { convert = true; }
                    var namechecker = name.split(' ');
                    for (var ri = 0; ri < namechecker.length; ri++) {
                        if (namechecker[ri].length > 12) {
                            namechecker[ri] = namechecker[ri].substr(0, 12) +
                                '-<br />' + namechecker[ri].substr(12, 10000);
                        }
                    }
                    name = namechecker.join(" ");
                    if (convert) { name += "..."; }

                    // Formats image
                    var imgurl = "";
                    if (elem.imgurl != "") {
                        imgurl = elem.imgurl;
                    } else {
                        imgurl = 'http://risovach.ru/upload/2013/05/mem/trollface-lol_18791868_orig_.jpg';
                    }

                    // Generates htmlew
                    var response = '<div class="event" id="event'+i+'">';
                    response += '<div class="imgcontainer" style="background-image: url('+imgurl+')"></div>';
                    response += '<div class="eventtext"><div class="title">'+name+'</div>';
                    response += '<div class="fulltitle">'+elem.name+'</div>';
                    response += '<div class="description">'+elem.description+'</div>';
                    response += '<div class="start_time">'+start_time_formatted+'</div>';
                    response += '<div class="eventlocation-container"><div class="eventblackbar"></div>';
                    response += '<div class="eventlocation">'+elem.parentname+'</div></div></div>';
                    response += '</div>';

                    // Appends html
                    console.log ( 'response: ' + response );
                    $(appendSelector).append(response);
                }
            });

            // Sends get request
            xhr.send();

        }

    });
}

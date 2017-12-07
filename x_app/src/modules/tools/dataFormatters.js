

// Data formatters
class DataFormatters {

    // Format Date
    static formatDate( timestr, includeHour, includeDay, includeDate, includeYear, semantic ) {
        if(typeof timestr === 'undefined') return '';

        // Fields
        var date = new Date(
                timestr.substr(0,4),        // YEAR
                timestr.substr(5,2) - 1,    // MONTH
                timestr.substr(8,2),        // DAY
                timestr.substr(11,2),       // HOUR
                timestr.substr(14,2)        // MINUTE
            ),
            semanticResult = false,
            response = '',
            now = new Date();

        // Semantic time formatting
        if (semantic === true){

            // Same day
            if(parseInt(date.getDate()) === parseInt(now.getDate()) && parseInt(date.getMonth()) === parseInt(now.getMonth())){
                var minutesTill = Math.floor((date - now) / 1000 / 60 );

                if(minutesTill <= 0) return 'Nu';

                else if(minutesTill < 60) return minutesTill + ' minut' + (minutesTill === 1 ? '': 'ter');

                /* Hours and minutes
                else {
                    let hrs = Math.floor(minutesTill / 60),
                        mins = minutesTill % 60,
                        ret = hrs + ' time';

                    if (hrs !== 1) ret += 'r';

                    ret += ' ' + mins + ' minut';

                    if(mins !== 1) ret += 'ter';

                    return ret;
                }
                */

                if(parseInt(date.getHours()) >= 18 ) response += 'I aften';
                else response += 'I dag';

                includeDay = false; includeDate = false; includeYear = false; includeHour = true;
            }

            // Tomorrow
            if(parseInt(date.getDate()) === parseInt(now.getDate()) +1 && parseInt(date.getMonth()) === parseInt(now.getMonth())){
                response += 'I morgen'; includeDay = false; includeDate = false; includeYear = false; includeHour = true; }
        }

        if (typeof includeDay === 'undefined' || includeDay ) {
            var days = [ 'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag' ];
            response+=days[date.getDay()]; }

        if(typeof includeDate === 'undefined' || includeDate){
            response+=' d. ' + parseInt(date.getDate())+' / '+parseInt((date.getMonth()+1));
        }

        if(typeof includeYear === 'undefined' || includeYear){
            response+=' - '+parseInt(date.getFullYear());
        }


        if (typeof includeHour === 'undefined' || includeHour ) {
            if (typeof includeDate === 'undefined' || includeDate){
                response += ' kl.';
            }

            if ( date.getMinutes() < 10 ) {
                response += ' '+(date.getHours())+'.0'+date.getMinutes();
            } else {
                response += ' '+(date.getHours())+'.'+date.getMinutes();
            }
        }

        return response;
    }

} module.exports = DataFormatters;



// Data formatters
class DataFormatters {

    // Format Date
    static formatDate( timestr, includeHour, includeDay, includeDate, includeYear, semantic ) {
        if(typeof timestr === 'undefined') return '';

        // Fields
        var date = new Date( timestr.substr(0, 16) ),
            semanticResult = false,
            response = '';

        // Semantic time formatting
        if (semantic === true){
            var now  = new Date();

            // Same day
            if(parseInt(date.getDate()) === parseInt(now.getDate()) && parseInt(date.getMonth()) === parseInt(now.getMonth())){
                var minutesTill = Math.floor((date - now) / 1000 / 60 ) - 60;
                if(minutesTill <= 0) return 'Nu';
                else if(minutesTill < 60) return minutesTill + ' minut' + (minutesTill === 1 ? '': 'ter');
                else return Math.floor(minutesTill / 60) + ' time' + (Math.floor(minutesTill / 60) === 1 ? '' : 'r');
            }

            // Tomorrow
            if(parseInt(date.getDate()) === parseInt(now.getDate()) +1 && parseInt(date.getMonth()) === parseInt(now.getMonth())){
                response += 'I morgen'; includeDay = false; ncludeDate = false; includeYear = false; includeHour = true; }
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


        if (typeof includeHour === 'undefined' || includeHour ) {1
            if ( date.getMinutes() < 10 ) {
                response += ' '+(date.getHours()-1)+'.0'+date.getMinutes();
            } else {
                response += ' '+(date.getHours()-1)+'.'+date.getMinutes();
            }
        }

        return response;
    }

} module.exports = DataFormatters;

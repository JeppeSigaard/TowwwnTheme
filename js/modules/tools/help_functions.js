
var HelpFunctions = {

    clearSelection : function(){

        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }

        } else if (document.selection) {  // IE?
            document.selection.empty();
        }

    },

    // Num of includes
    numOfIncludes: function( haystack, needle ) {
        var numOf = 0, indexOf = 0;
        while ( indexOf !== -1 ) { 
            indexOf = haystack.indexOf( needle, indexOf );
            if ( indexOf !== -1 ) { numOf++; indexOf++; }
        } return numOf;
    },
    
    // Nl2p
    nl2p: function( text ) {
        if(typeof text === 'undefined'|| null === text){return '';}
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    },

    // replacement chars
    ripRep : function(text){
        if(typeof text === 'undefined'|| null === text){return '';}
        return text.replace(/\uFFFD/g, '');
    },
 
    // Linkifier
    linkifier: function( text ) {
        
        if(typeof text === 'undefined'|| null === text){return '';}

        // URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        // URLs starting with www. (without // before it, or it'd re-link the ones done above)
        var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        // Change email addresses to mailto:: links
        var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
        var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
        
    }, 
    
    // Format date
    formatDate: function( timestr, includeHour, includeDay, includeDate, includeYear, semantic ) {

        if(typeof timestr === 'undefined'){return '';}

        var date = new Date( timestr.substr(0, 16) ),
            semanticResult = false,
            response = '';

        if (semantic === true){
            var now  = new Date();

            // Samme dag
            if(parseInt(date.getDate()) === parseInt(now.getDate()) && parseInt(date.getMonth()) === parseInt(now.getMonth())){

                var minutesTill = Math.floor((date - now) / 1000 / 60 ) - 60;

                // Nu
                if(minutesTill <= 0){
                    return 'Nu';
                }

                // Antal minutter til
                else if(minutesTill < 60){
                    return minutesTill + ' minut' + (minutesTill === 1 ? '': 'ter');
                }

                // Antal timer til
                else{
                    return Math.floor(minutesTill / 60) + ' time' + (Math.floor(minutesTill / 60) === 1 ? '' : 'r');
                }

            }

            // I morgen
            if(parseInt(date.getDate()) === parseInt(now.getDate()) +1 && parseInt(date.getMonth()) === parseInt(now.getMonth())){
                response += 'I morgen';
                includeDay = false;
                includeDate = false;
                includeYear = false;
                includeHour = true;
            }
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
    },
    
}; module.exports = HelpFunctions;

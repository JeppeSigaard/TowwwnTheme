
var HelpFunctions = {

    // Num of includes
    numOfIncludes: function( haystack, needle ) {
        var numOf = 0, indexOf = 0;
        while ( indexOf !== -1 ) { 
            indexOf = haystack.indexOf( needle, indexOf );
            if ( indexOf !== -1 ) { numOf++; indexOf++; }
        } 

        return numOf;
    },
    
    // Nl2p
    nl2p: function( text ) {
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    },
 
    // Linkifier
    linkifier: function( text ) {
        
        //URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        //URLs starting with www. (without // before it, or it'd re-link the ones done above)
        var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        //Change email addresses to mailto:: links
        var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
        var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
        
    }, 
    
    // Format date
    formatDate: function( timestr, hourly ) {
        var date = new Date( timestr.substr(0, 16) );
        var response = parseInt(date.getDate())+' / '+parseInt((date.getMonth()+1))+' - '+parseInt(date.getFullYear());
        if ( hourly ) {
            if ( date.getMinutes() < 10 ) {
                response += ' '+(date.getHours()+1)+':0'+date.getMinutes();
            } else {
                response += ' '+(date.getHours()+1)+':'+date.getMinutes();
            }
        }
            
        return response;
    }
    
}


// !NOT FINISHED! //
(( ) => { 
    
    // Object
    const underscorecookit = {
        set: ( dataobjectkey, key, value ) => { // std = hours
            let data = window._cookielib.getObject( dataobjectkey )['"'+key+'"'] = value, date = new Date(),
                expires = date.setTime( date.getTime()+30*24*60*60*1000 ).getTime();
            document.cookie = dataobjectkey+'='+JSON.stringify(data)+'; '+expires+'; path=/';
        },
        getObject: dataobjectkey => {
            let cookies = document.cookie.split(';'), resp;
            for ( let cookie of cookies ) { 
                let clean = cookie.split(' ').join('');
                if ( clean.includes( dataobjectkey ) ) {
                    clean = clean.split( dataobjectkey ).join('');
                    console.log( clean.slice( clean.indexOf('{'), clean.lastIndexOf('}') + 1 ) );
                    resp = JSON.parse( clean.slice( clean.indexOf('{'), clean.lastIndexOf('}')+1 ) ); break; }
            } return resp != null ? resp : false;
        },
        read: key => {
        },
    };
    
    // Sets cookit as object on window
    window._cookielib = underscorecookit;
    
})();


// Category data handler
class CategoryDataHandler {

    // Ctor
    constructor() { 
        this.featuredCategories = null; 
        this.allCategories = null;
    }

    // Get Featured Categroies
    getFeaturedCategories() {
        return new Promise((resolve, reject) => {

            // Opens new get request
            let request = new XMLHttpRequest();
            request.onload = function( response ) {

                // Sets featured category field and resolves
                let json = JSON.parse( response.target.response );
                this.featuredCategories = json.sort((a, b) => {
                    if ( a.location_count < b.location_count ) return 1;
                    if ( a.location_count > b.location_count ) return -1;
                    return 0;
                }); 

                if ( this.allCategories === null ) this.allCategories = this.featuredCategories;
                resolve( this.featuredCategories );

            }.bind(this);

            // Sends request
            request.open( 'GET', 'http://towwwn.dk/api/svendborg/categories?featured=1' );
            request.send();

        });
    }
    
    // Get all categories
    getAllCategories(include_empty) {
        return new Promise(( resolve, reject ) => {

            // Opens new get request
            let request = new XMLHttpRequest();
            request.onload = function( response ) {

                // Sets featured category field and resolves
                let json;
                if(!include_empty){
                    let fson = JSON.parse( response.target.response );
                        json = [];

                    for (let cat in fson){
                        if(fson[cat].location_count !== 0){
                           json.push(fson[cat]);
                        }
                    }
                }

                else{ json = JSON.parse( response.target.response ); }

                this.allCategories = json.sort((a, b) => {
                    if ( a.location_count < b.location_count ) return 1;
                    if ( a.location_count > b.location_count ) return -1;
                    return 0;
                }); resolve( this.allCategories );


            }.bind(this);

            // Sends request
            request.open( 'GET', 'http://towwwn.dk/api/svendborg/categories' );
            request.send();
            
        });
    }

} module.exports = CategoryDataHandler;

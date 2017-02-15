// Lcoation Category Module
var LocationCategoryModule = {
    
    // Fields
    settings: {
        ready: false,
        unsorted_location_categories: {},
        sorted_location_categories: [],
    },
    
    // Init
    init: function() {
        this.get_location_categories();  
    },
    
    // Get Location Categories
    get_location_categories: function() {
        
        // Generates object of location categories,
        // from the existing location array
        var locations = LocationModule.settings.locations;
        for ( var i = 0; i < locations.length; i++ ) {
            for ( var ci = 0; ci < locations[i].categories.length; ci++ ) {
                var category = locations[i].categories[ci];
                if ( typeof this.settings.unsorted_location_categories[category.category_name] === 'undefined' ) {
                    this.settings.unsorted_location_categories[category.category_name] = {
                        category_counter: 1,
                        category_name: category.category_name,
                        category_imgurl: category.category_imgurl,
                    };
                } else { this.settings.unsorted_location_categories[category.category_name].category_counter++; }
            }
        } 
        
        // Sorts categories after highest counter
        var buffer = [];
        for ( var key in this.settings.unsorted_location_categories ) {
            var isset = false;
            for ( var i = 0; i < buffer.length; i++ ) {
                if ( this.settings.unsorted_location_categories[key].category_counter > buffer[i].category_counter ) {
                    buffer.splice( i, 0, this.settings.unsorted_location_categories[key] );
                    isset = true; break;
                }
            }
            
            if ( !isset ) buffer.push( this.settings.unsorted_location_categories[key] );
        } this.settings.sorted_location_categories = buffer;
        
        // Annnnd its ready
        this.settings.ready = true;
        
    },
    
    // Render Location Categories
    render_location_categories: function( appendSelector ) {
        var response = '<div class="category-bar">Kategorier</div><div class="category-container">'; 
        
        // Loops through all categories and generates html
        for ( var i = 0; i < this.settings.sorted_location_categories.length; i++ ) {
             response += this.generate_category_html( this.settings.sorted_location_categories[i] ); }
        
        // Appends html
        $( appendSelector ).html( response+='</div>' );
    
    },
    
    // Generate location category html
    generate_category_html: function( category ) {
        
        // Generates html
        var response = '<div class="category" style="background-image:url('+category.category_imgurl+')">';
        response += '<div class="category-content-container">';
        response += '<div class="category-title">'+category.category_name+'</div>';
        response += '<div class="category-count">'+category.category_counter+'</div></div></div>';
        return response;
    
    },
    
}

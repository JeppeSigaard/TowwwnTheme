// Lcoation Category Module
var LocationCategoryModule = {
    
    // Fields
    settings: {
        ready: false,
        location_categories: [],
    },
    
    // Init
    init: function() {
        this.get_location_categories();  
    },
    
    // Get Location Categories
    get_location_categories: function() {
        
        $.get(rest_api + 'categories?featured=1',function(data){

            // Pushes & sorts the data
            for ( var i in data){ this.settings.location_categories.push(data[i]); }
            this.settings.location_categories.sort(function( a, b ) {
                if ( a.location_count < b.location_count ) return 1;
                if ( a.location_count > b.location_count ) return -1;
                return 0;
            });
            
            // Annnnd its ready
            this.settings.ready = true;
            this.render_location_categories( '#section2 .content' );

        }.bind(this));
    },

    // Render Location Categories
    render_location_categories: function( appendSelector ) {

        var response = '<div class="category-bar">Svendborg i udvalg<div class="sub-categories-title"></div></div>';
        response += '<div class="sub-category-outer"><div class="sub-category-inner">';
        response += '<div class="sub-category"><div class="elem-counter">16</div>Test Kategori 1</div>';
        response += '<div class="sub-category"><div class="elem-counter">12</div>Test Kategori 2</div>';
        response += '<div class="sub-category"><div class="elem-counter">11</div>Test Kategori 3</div>';
        response += '<div class="sub-category"><div class="elem-counter">11</div>Test Kategori 4</div>';
        response += '<div class="sub-category"><div class="elem-counter">4</div>Test Kategori 5</div>';
        response += '<div class="sub-category"><div class="elem-counter">1</div>Test Kategori 6</div>';
        response += '</div></div><div class="category-container">';
        
        // Loops through all categories and generates html
        for ( var i in this.settings.location_categories ) {
            if(this.settings.location_categories[i].location_count !== 0){
                response += this.generate_category_html( this.settings.location_categories[i] );
            }
        }
        
        // Appends html
        $( appendSelector ).html( response+='</div>' );
    
    },
    
    // Generate location category html
    generate_category_html: function( category ) {
        
        // Generates html
        var response = '<div class="category" data-image-src="'+category.category_imgurl+'" data-type="category" data-id="'+category.category_id+'" >';
        response += '<div class="category-content-container">';
        response += '<div class="category-title">'+category.category_name+'</div>';
        response += '<div class="category-count">'+category.location_count+'</div></div></div>';
        return response;
    
    },
    
}; module.exports = LocationCategoryModule;

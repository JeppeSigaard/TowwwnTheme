

// Sub categories
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      SubCategory = require( '../componentParts/subcategory.js' );

class SubCategories extends React.Component {
    
    // Ctor
    constructor() { 
        super(); 
        this.state = { };
    }
    
    // Component Will Update
    componentWillReceiveProps( nextProps, nextState ) {
        
        // Generates subcat jsx
        if ( nextProps.subCategories != null ) {
            let cats = [];
            for ( let subCat of nextProps.subCategories ) {
                cats.push( <SubCategory elem={ subCat } key={ 'subcategory-' + subCat.category_id } clickEvent={ this.props.clickEvent } /> );
            } this.setState({ 'jsxCats' : cats });
        }
        
    }
    
    // Render
    render() {
        return (
            <div className="sub-category-outer" style={{ 'height' : this.props.outerHeight }} >
                <div className="sub-category-inner">
                    { this.state.jsxCats != null &&
                        this.state.jsxCats
                    }
                </div>
            </div>
        );
    }
    
} module.exports = SubCategories;

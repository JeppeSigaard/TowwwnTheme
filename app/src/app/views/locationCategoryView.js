

// Location Category view
const React = require( 'react' ),
      LocationCategory = require( '../components/locationCategory.js' ),
      SubCategories = require( '../components/subcategories.js' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class LocationCategoryView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { subCatHeight : '0px' };
    }

    // Handle category click
    handleCategoryClick( e ) {

        e.preventDefault();
        Globals.setMainState({
            'currentLocationsCategory' : this.props.elem,
            'currentLocations' : null,
        });

        Globals.setMainState({ from : this.props.name });
        if ( _('body').hasClass('mobile') ) {
            Globals.viewHandler.changeMobileViewFocus(
                '#location-list-view',
                false, true
            );
        } else {
            Globals.viewHandler.changeViewFocus(
                'location-category-view',
                'location-list-view',
                false, true, false
            );
        }

        Globals.locationDataHandler.getCategorySpecificLocation( this.props.elem.category_id ).then(( resp ) => {
            Globals.setMainState({
                'currentLocations' : resp,
            });
        });

    }

    // Activate Sub Categories List
    toggleSubCategories() {
        let inner = document.getElementsByClassName( 'sub-category-inner' )[0];
        if ( this.state.subCatHeight !== '0px' ) this.setState({ 'subCatHeight' : '0px' });
        else this.setState({ 'subCatHeight' : inner.clientHeight + 'px' });
    }

    // Will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.categories != null ) {
            let jsxCategories = [];
            for ( let category of nextProps.categories ) {
                jsxCategories.push( <LocationCategory key={ 'category-'+category['category_id'] } elem={ category } name={ nextProps.name } clickEvent={ this.handleCategoryClick } /> );
            } this.setState({ 'jsxCategories' : jsxCategories });
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-category-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <div className="category-bar">
                                Steder
                                <div className="sub-categories-title" onClick={ this.toggleSubCategories.bind(this) } ></div>
                            </div>
                            <SubCategories subCategories={ this.props.allCategories } outerHeight={ this.state.subCatHeight } clickEvent={ this.handleCategoryClick } />

                            <div className="category-container">
                                { this.state.jsxCategories != null &&
                                  this.state.jsxCategories }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationCategoryView;

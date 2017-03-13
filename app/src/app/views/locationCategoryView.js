

// Location Category view
const React = require( 'react' ),
      SubCategories = require( '../components/subcategories.js' );

class LocationCategoryView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { subCatHeight : '0px' };
    }

    // Activate Sub Categories List
    toggleSubCategories() {
        let inner = document.getElementsByClassName( 'sub-category-inner' )[0];
        if ( this.state.subCatHeight !== '0px' ) this.setState({ 'subCatHeight' : '0px' });
        else this.setState({ 'subCatHeight' : inner.clientHeight + 'px' });
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-category-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <div className="category-bar">
                                Svendborg i udvalg
                                <div className="sub-categories-title" onClick={ this.toggleSubCategories.bind(this) } ></div>
                            </div>
                            <SubCategories subCategories={ this.props.allCategories } outerHeight={ this.state.subCatHeight } />
                            <div className="category-container">
                                { typeof this.props.categories !== 'undefined' &&
                                  this.props.categories !== null &&
                                  this.props.categories }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationCategoryView;

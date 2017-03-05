

// Location Category view
const React = require( 'react' );
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

                            <div className="sub-category-outer" style={{ 'height' : this.state.subCatHeight }} >
                                <div className="sub-category-inner">
                                    <div className="sub-category"><div className="elem-counter">16</div>Test Kategori 1</div>
                                    <div className="sub-category"><div className="elem-counter">12</div>Test Kategori 2</div>
                                    <div className="sub-category"><div className="elem-counter">11</div>Test Kategori 3</div>
                                    <div className="sub-category"><div className="elem-counter">9</div>Test Kategori 4</div>
                                    <div className="sub-category"><div className="elem-counter">5</div>Test Kategori 5</div>
                                    <div className="sub-category"><div className="elem-counter">5</div>Test Kategori 6</div>
                                    <div className="sub-category"><div className="elem-counter">4</div>Test Kategori 7</div>
                                    <div className="sub-category"><div className="elem-counter">2</div>Test Kategori 8</div>
                                    <div className="sub-category"><div className="elem-counter">1</div>Test Kategori 9</div>
                                </div>
                            </div>

                            <div className="category-container">

                                {/* Renders categories */}
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

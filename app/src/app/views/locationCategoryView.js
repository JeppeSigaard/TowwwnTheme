

// Location Category view
const React = require( 'react' );
class LocationCategoryView extends React.Component {

    // Ctor
    constructor() { super(); }

    // Render
    render() {
        return (
            <section className="container-section" id="location-category-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
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



// Sub Category
const React = require( 'react' );
class SubCategory extends React.Component {
    
    // Ctor
    constructor() { super(); }
    
    // Render
    render() {
        return (
            <div className="sub-category">
                <div className="elem-counter">
                    { this.props.elem.location_count }
                </div>
                { this.props.elem.category_name }
            </div>
        );
    }
    
} module.exports = SubCategory;
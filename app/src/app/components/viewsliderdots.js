

// View Slider Dots
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' );

class ViewSliderDots extends React.Component {
    
    // Constructor
    constructor() { 
        super();
        this.state = {
            dots: [],
        };
    }
    
    // Component will receive props
    componentWillReceiveProps() { 
        
        // Fields
        let currentView = _('.content-container-inner > .active'),
            dotsRight = 0, dotsLeft = 0, 
            lastLeft = null, lastRight = null,
            keepLooping = true;
        
        if ( currentView == null ) return;
        lastLeft = currentView;
        lastRight = currentView;
        
        // Checks dots left
        while( keepLooping ) {
            let relations = Globals.relations[ lastLeft.attr( 'id' ) ];
            if ( relations.left != null && relations.left != '' && relations.canleft ) {
                dotsLeft++; lastLeft = _( '#'+relations.left ); 
            } else { keepLooping = false; }
        } keepLooping = true;
        
        // Checks dots right
        while( keepLooping ) {
            let relations = Globals.relations[ lastRight.attr( 'id' ) ];
            if ( relations.right != null && relations.right != '' && relations.canright ) {
                dotsRight++; lastRight = _( '#'+relations.right ); 
            } else { keepLooping = false; }
        }
        
        // Generates dots jsx
        while ( this.state.dots.length > 0 ) this.state.dots.pop();
        
        // Left dots
        for ( let iter = 0; iter < dotsLeft; iter++ ){
            this.state.dots.push(
                <div className="viewslider-dot viewslider-dot-left" key={ "viewsliderdot-left-"+iter } ></div>
            );
        }
        
        // Active dot
        this.state.dots.push(
            <div className="viewslider-dot viewslider-dot-active" key="viewsliderdot-active" ></div>
        );
        
        // Right dots
        for ( let iter = 0; iter < dotsRight; iter++ ){
            this.state.dots.push(
                <div className="viewslider-dot viewslider-dot-right" key={ "viewsliderdot-right-"+iter } ></div>
            );
        }
        
    }
    
    // Render
    render() {
        return (
            <div className="viewsliderdots">
                <div className="viewsliderdots-inner">
                    { this.state.dots != null && this.state.dots.length > 0 && this.state.dots }
                </div>
            </div>
        );
    }
    
} module.exports = ViewSliderDots;
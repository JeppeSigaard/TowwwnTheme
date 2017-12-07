

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
            hidden : true,
        };

        this.animateTimeout = null;
    }

    // Component will receive props
    componentWillReceiveProps(props) {

        if(this.animateTimeout != null) clearTimeout(this.animateTimeout);
        this.setState({hidden : false});
        this.animateTimeout = setTimeout(function(){this.setState({hidden : true});}.bind(this), 1200);

        // Fields
        let currentView = _('.content-container-inner > .active'),
            dotsRight = 0, dotsLeft = 0,
            lastLeft = null, lastRight = null,
            keepLooping = true;

        if ( currentView == null || !currentView ) return;
        lastLeft = currentView;
        lastRight = currentView;



        // Checks dots left
        while( keepLooping ) {
            let relations = Globals.relations[ lastLeft.attr( 'id' ) ];
            if ( relations != null && relations.left != null && relations.left != '' && relations.canleft ) {
                dotsLeft++; lastLeft = _( '#'+relations.left );
            } else { keepLooping = false; }
        } keepLooping = true;

        // Checks dots right
        while( keepLooping ) {
            let relations = Globals.relations[ lastRight.attr( 'id' ) ];
            if ( relations != null && relations.right != null && relations.right != '' && relations.canright ) {
                dotsRight++; lastRight = _( '#'+relations.right );
            } else { keepLooping = false; }
        }

        // Generates dots jsx
        while ( this.state.dots.length > 0 ) this.state.dots.pop();

        // Left dots
        for ( let iter = 0; iter < dotsLeft; iter++ ){
            this.state.dots.push(
                <div className="viewsliderdot viewsliderdot-left" key={ "viewsliderdot-left-"+iter } ></div>
            );
        }

        // Active dot
        this.state.dots.push(
            <div className="viewsliderdot viewsliderdot-active" key="viewsliderdot-active" ></div>
        );

        // Right dots
        for ( let iter = 0; iter < dotsRight; iter++ ){
            this.state.dots.push(
                <div className="viewsliderdot viewsliderdot-right" key={ "viewsliderdot-right-"+iter } ></div>
            );
        }

    }

    // Render
    render() {

        let className = 'viewsliderdots';
        if(this.state.hidden){className += ' hidden';}

        return (
            <div className={className}>
                { this.state.dots != null && this.state.dots.length > 0 && this.state.dots }
            </div>
        );
    }

} module.exports = ViewSliderDots;

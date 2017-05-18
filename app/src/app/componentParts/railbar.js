
// Rail bar
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class Railbar extends React.Component {

    // Ctor
    constructor() {

        super();

        // Add Event listeners
        this.mouseupfunct = this.handleMouseUp.bind(this);
        this.mousemovefunct = this.handleMouseMove.bind(this);
    }

    // Mouse Down event (mirror touch start)
    handleMouseDown(e){

        document.addEventListener('mouseup', this.mouseupfunct);
        document.addEventListener('mousemove', this.mousemovefunct);

        if(e.button != 2){
            e.preventDefault();
            this.handleTouchStart( e );
        }
    }

    // Mouse move event (mirror touch move)
    handleMouseMove(e){
        if(this.state.moving) this.handleTouchMove(e);
    }

    // Mouse up event (mirror touch end)
    handleMouseUp(e){

        // Remove Event Listeners
        document.removeEventListener('mouseup', this.mouseupfunct);
        document.removeEventListener('mousemove', this.mousemovefunct);

        if(this.state.moving){
            this.setState({moving : false});
            this.handleTouchEnd( e );
        }
    }

    // Movement begins
    handleTouchStart(e){

        this.setState({ moving : true, clicked : true });

        // Set x
        let x = ('touchstart' == e.type) ? e.touches[0].clientX : e.pageX;

        this.setState({x : Math.round(x), maxDelta : _('#' + this.props.name).width() - _('#' + this.props.name + '-inner').width()});
    }

    // Movement goes on
    handleTouchMove(e){
        if(this.debounceMove) return;

        const moveBuffer = 8;
        this.debounceMove = true;

        _('#' + this.props.name).addClass('moving');

        let x = ('touchmove' == e.type) ? e.touches[0].clientX : e.pageX,
            deltaX = Math.round(x) - this.state.x + this.state.translateX;

        this.setState({moveX : Math.round(x)});

        // Don't go below zero
        if (deltaX > 0) deltaX = 0 + (deltaX / moveBuffer);

        // Don't go above length
        if (deltaX <= this.state.maxDelta) deltaX = this.state.maxDelta - ((this.state.maxDelta - deltaX) / moveBuffer);

        if((Math.round(x) - this.state.x) > 5 || (Math.round(x) - this.state.x) < -5){

            this.setState({ clicked : false });
            Globals.navigationBlocker = true;

            _('#' + this.props.name + '-inner').css({
                '-webkit-transform' : 'translateX('+deltaX+'px',
                '-moz-transform' : 'translateX('+deltaX+'px',
                '-o-transform' : 'translateX('+deltaX+'px',
                '-ms-transform' : 'translateX('+deltaX+'px',
                'transform': 'translateX('+deltaX+'px'
            });

        }

        this.debounceMove = false;

    }

    // Movement ends
    handleTouchEnd(e){

        _('#' + this.props.name).removeClass('moving');

        if(this.state.clicked) return;

        let deltaX = Math.round(this.state.moveX - this.state.x + this.state.translateX);

        // Snap to rails if snap
        if (this.props.snap != null && this.props.snap) {
            this.setState({translateX : deltaX, mobing : false}); this.snapToIndex();
        }

        // Add a bit if no snap
        else {
            if(deltaX <= this.state.translateX - 5) deltaX -= 20;
            if(deltaX >= this.state.translateX + 5) deltaX += 20;

            // Don't go below zero
            if (deltaX > 0) deltaX = 0;

            // Don't go above length
            if (deltaX <= this.state.maxDelta) deltaX = this.state.maxDelta;

            this.setState({translateX : deltaX, moving : false}); this.snapToIndex(false);
        }

        setTimeout(function(){
            Globals.navigationBlocker = false;
        },100);
    }

    // Snap to index (integer, next, prev, or null)
    snapToIndex(i){

        let deltaX = 0,
            rails = _('#' + this.props.name + '-inner').get()[0].children, arr = [];
            for (var rail of rails){
                arr.push(0 - _(rail).state.domnode.offsetLeft);
            }

        let indexArr = arr.map(function(k) { return Math.abs(k - this.state.translateX) }.bind(this)),
            closestRail = arr[ indexArr.indexOf( Math.min.apply(Math, indexArr) ) ],
            prevRail = arr[arr.indexOf(closestRail) - 1],
            nextRail = arr[arr.indexOf(closestRail) + 1];

        // If null, set to closest
        if (i == null) deltaX = closestRail + this.state.marginLeft;

        // If next, set to the one after closest
        else if(i == 'next') deltaX = (nextRail != null) ? nextRail + this.state.marginLeft : closestRail + this.state.marginLeft;

        // If prev, set to the one before closest
        else if(i == 'prev') deltaX = (prevRail != null) ? prevRail + this.state.marginLeft : closestRail + this.state.marginLeft;

        // If index is set, return index
        else if(Number.isInteger(i)) deltaX = rails[i] + this.state.marginLeft;

        // If snap is false, set delta to translateX
        else if(i == false){deltaX = this.state.translateX;}

        // Don't go below zero + fallback
        if (deltaX == null || deltaX > this.state.marginLeft) deltaX = this.state.marginLeft;

        // Don't go above length
        if (deltaX <= this.state.maxDelta) deltaX = this.state.maxDelta;

        _('#' + this.props.name + '-inner').css({
            '-webkit-transform' : 'translateX('+deltaX+'px',
            '-moz-transform' : 'translateX('+deltaX+'px',
            '-o-transform' : 'translateX('+deltaX+'px',
            '-ms-transform' : 'translateX('+deltaX+'px',
            'transform': 'translateX('+deltaX+'px'
        });

        this.setState({translateX : deltaX});
    }

    // Click on buttons
    handleButtonPrevClick(){this.snapToIndex('prev');}
    handleButtonNextClick(){this.snapToIndex('next');}

    componentDidMount(){

        Globals.navigationBlocker = false;

        const firstChild = _('#' + this.props.name + '-inner >*:first-child');
        if(firstChild != null){
            const styles = window.getComputedStyle(firstChild.get(0)),
                margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']),
                marginLeft = parseFloat(styles['marginLeft']),
                height = Math.ceil(firstChild.height() + margin);

            _('#' + this.props.name).css({'height' : height + 'px'});
            this.setState({marginLeft : marginLeft});
        }

        if (this.props.name == null) throw "Please specify name for this rail bar";

        this.debounceMove = false;

        // Set initial state
        this.setState({
            moving : false,
            clicked : false,
            x : 0,
            translateX : 0,
            maxDelta : _('#' + this.props.name).width() - _('#' + this.props.name + '-inner').width()
        });
    }

    // Render
    render() {
        if(this.props.name != null){return (
            <div className={'rail-bar ' + this.props.name} name={this.props.name} id={this.props.name} >
                <div className="rail-bar-inner" id={ this.props.name + '-inner' }
                    onMouseDown = { this.handleMouseDown.bind(this) }
                    onTouchStart = { this.handleTouchStart.bind(this) }
                    onTouchMove = { this.handleTouchMove.bind(this) }
                    onTouchEnd = { this.handleTouchEnd.bind(this) } >
                    {this.props.children}
                </div>
                { this.props.buttons != false && <div className="rail-bar-button-left" onClick={this.handleButtonPrevClick.bind(this)}><svg viewBox="0 0 20 20"><use xlinkHref="#chevron-left"></use></svg></div> }
                { this.props.buttons != false && <div className="rail-bar-button-right" onClick={this.handleButtonNextClick.bind(this)}><svg viewBox="0 0 20 20"><use xlinkHref="#chevron-right"></use></svg></div> }
            </div>
    );}

    else return null;
    }


} module.exports = Railbar;

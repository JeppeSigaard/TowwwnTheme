

// View Slider
const _ = require( './underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' )

class ViewSlider {

    // Constructor
    constructor() {

        // Memebers
        this.swiping = false;
        this.canMove = true;
        this.canLeft = false;
        this.canRight = false;

        // Event Handlers
        _(window).on('touchstart', this.onTouchStart.bind(this));
        _(window).on('touchmove', this.onTouchMove.bind(this));
        _(window).on('touchend', this.onTouchEnd.bind(this));

    }

    // Handlers
    // Touch Start
    onTouchStart(e) {

        // Sets basic fields
        this.currentView = _('.content-container-inner > .active').addClass('notrans').attr('id');
        this.start = {
            x : e.touches[0].clientX,
            y : e.touches[0].clientY,
        };

        // Positions views
        this.relations = Globals.relations[this.currentView];
        if ( this.relations != null ) {
            if ( this.relations.left != null && this.relations.canleft ) {
                this.canLeft = true;
                let elem = _('#'+this.relations.left);
                elem.addClass('notrans');
                elem.css({ 'left' : '-100%' });
            }

            if ( this.relations.right != null && this.relations.canright ) {
                this.canRight = true;
                let elem = _('#'+this.relations.right);
                elem.addClass('notrans');
                elem.css({ 'left' : '100%' });
            }
        }

    }

    // Touch Move
    onTouchMove(e) {

        // Sets a few new fields
        let deltax = e.touches[0].clientX - this.start.x,
            deltay = e.touches[0].clientY - this.start.y,
            threshold = .85, sw = _(window).width();

        this.cos = Math.cos( Math.atan2( deltay, deltax ) );
        this.distance = Math.sqrt( deltax * deltax + deltay * deltay );

        // Checks if should move
        if ( (( Math.abs( this.distance ) >= 30 && Math.abs( this.cos ) >= threshold )
              || this.swiping )
              && this.canMove ) {

            this.swiping = true;
            let bleft = this.canLeft ? sw : 0,
                bright = this.canRight ? -sw : 0;
            if ( this.distance * this.cos <= bleft &&
                 this.distance * this.cos >= bright ) {
                let ntrans = ( ( this.distance * this.cos ) / sw ) * 100;
                _('#'+this.currentView).css({ left : ntrans+'%' });
                if ( this.canLeft ) _('#'+this.relations.left).css({ left : ( -100 + ntrans )+'%' });
                if ( this.canRight ) _('#'+this.relations.right).css({ left : ( 100 + ntrans )+'%' });
            }

        } else if ( Math.abs( this.distance ) >= 30 ) {
            this.canMove = false;
        }

    }

    // Touch End
    onTouchEnd(e) {
        if ( this.distance < 30 ) return;

        _('#'+this.currentView).removeClass('notrans');
        if ( this.canLeft && _('#'+this.relations.left) !== false ) _('#'+this.relations.left).removeClass('notrans');
        if ( this.canRight && _('#'+this.relations.right) !== false ) _('#'+this.relations.right).removeClass('notrans');

        // Snaps views
        if ( this.distance * this.cos <= -( _(window).width() / 3 * 1 ) && this.canRight ) {

            // Snap right
            _('#'+this.currentView).removeClass('notrans').removeClass('active').css({ left: '-100%' });
            _('#'+this.relations.right).removeClass('notrans').addClass('active').css({ left: '0' });
            Globals.viewHandler.mobileFocusedView = _('#'+this.relations.right).get();

            Globals.setMainState({ currentMobileView : _('#'+this.relations.right) });

        } else if ( this.distance * this.cos >= _(window).width() / 3 * 1 && this.canLeft ) {

            // Snap left
            _('#'+this.currentView).removeClass('notrans').removeClass('active').css({ left: '100%' });
            _('#'+this.relations.left).removeClass('notrans').addClass('active').css({ left: '0' });
            Globals.viewHandler.mobileFocusedView = _('#'+this.relations.left).get();

            setTimeout(() => {
                _('#'+this.currentView).addClass('notrans').css({ left: '-100%' });
                setTimeout(() => { _('#'+this.currentView).removeClass('notrans'); }, 40);
            }, parseFloat( window.getComputedStyle( _('#'+this.currentView).get(0) ).transitionDuration ) * 1000);

            Globals.setMainState({ currentMobileView : _('#'+this.relations.left) });

        } else {

            // Snap middle
            if ( _('#'+this.currentView) !== false )
                _('#'+this.currentView).removeClass('notrans').css({ left: '0' });

            if ( this.canLeft && _('#'+this.relations.left) !== false )
                _('#'+this.relations.left).removeClass('notrans').css({ left: '-100%' });

            if ( this.canRight && _('#'+this.relations.right) !== false )
                _('#'+this.relations.right).removeClass('notrans').css({ left: '100%' });

            if ( this.canRight && _('#'+this.relations.right) !== false ) {
                setTimeout(() => {
                    _('#'+this.relations.right).addClass('notrans').css({ left: '-100%' });
                    _('#'+this.relations.right).get(0).offsetHeight;
                    _('#'+this.relations.right).removeClass('notrans');
                }, parseFloat( window.getComputedStyle( _('#'+this.relations.right).get(0) ).transitionDuration ) * 1000);
            }

        }

        // Resets fields
        this.swiping = false;
        this.canMove = true;
        this.canLeft = false;
        this.canRight = false;
        this.cos = 0;
        this.distance = 0;

    }

} module.exports = ViewSlider;

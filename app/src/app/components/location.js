

// Location
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class Location extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = {};
    }

    // Check if hearted
    checkIfHearted() {
        if ( this.props.elem == null || this.unmounted ) return;
        if ( Globals.user.state.hearts.locations.includes( this.props.elem.id ) ) {
            this.setState({ hearted : true });
        } else { this.setState({ hearted : false }); }
    }

    // Handle Click
    handleClick( e ) {
        e.preventDefault();
        Globals.setMainState({
            'singleLocation' : this.props.elem,
        });

        Globals.history.push(this.props.elem);

        Globals.setMainState({ from : this.props.name });
        if ( _('body').hasClass('mobile') ) {
            Globals.viewHandler.changeMobileViewFocus(
                '#location-single-view',
                false, true
            ); return;
        }

        if ( this.props.name === 'search-results-view' ) {
            Globals.viewHandler.changeViewFocus(
                '#search-results-view',
                '#location-single-view',
                false, true, false, true
            );
        } else {
            Globals.viewHandler.changeViewFocus(
                '#location-single-view',
                '#location-list-view',
                false, true, false
            );
        }

    }

    // Component did mount
    componentDidMount() {
        this.unmounted = false;
        this.checkIfHearted();
        Globals.hooks.add('ls-hearted', this.checkIfHearted.bind(this));
        Globals.hooks.add('onlogin', this.checkIfHearted.bind(this));
        Globals.hooks.add('category-change', this.checkIfHearted.bind(this));
    }

    // Component will unmount
    componentWillUnmount() {
        this.unmounted = true;
        Globals.hooks.remove('ls-hearted', this.checkIfHearted.bind(this));
        Globals.hooks.remove('onlogin', this.checkIfHearted.bind(this));
        Globals.hooks.remove('category-change', this.checkIfHearted.bind(this));
    }

    // Render
    render() {
        let elem = this.props.elem;
        if ( elem != null ) {
            return (
                <a href={ app_data.main_path + '/location/' + elem.slug }  className="location-container" onClick={ this.handleClick.bind(this) } >
                    <span className="location-picture" style={{ 'backgroundImage' : 'url(' + elem.picture + ')' }} ></span>
                    <span className="location-description">
                        <h2 className="location-title">
                            { this.state.hearted &&
                                <svg className="heart anim" viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-heart"></use>
                                </svg>
                            } { elem.name }
                        </h2>
                        <p className="location-about">{ elem.about }</p>
                    </span>
                </a>
            );
        } else return <a className="location-container"></a>
    }

} module.exports = Location;

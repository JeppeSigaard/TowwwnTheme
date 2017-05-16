


// User view
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class UserView extends React.Component {

    // Constructor
    constructor() {
        super();
        this.closeViewState = {};
    }

    // On close
    onClose() { /* STUFF */ }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( Globals.lastViewState != null ) {
            this.closeviewstate = {
                leftview : Globals.lastViewState[0],
                rightview : Globals.lastViewState[1],
                fromLeft : true,
                fromRight : false,
                mobile : {
                    view: '#'+nextProps.from,
                    fromLeft: true,
                    fromRight: false
                }
            }
        }
    }

    // Handle View Click
    handleViewClick() {
        if ( Globals.user != null && !Globals.user.loggedIn ) {
            Globals.fb.login().then(() => {
                Globals.viewHandler.changeViewFocus(
                    Globals.lastViewState[0],
                    Globals.lastViewState[1],
                    true, false, false, true
                );
            });
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="user-view" >
                <ViewTopBar standard={ true } darken={ true } title={ ( Globals.user != null && Globals.user.state.loggedIn ) ? 'Bruger oplysninger:' : 'Log ind: ' } onClose={ this.onClose.bind(this) } closeviewstate={ this.closeviewstate != null && this.closeviewstate } name={ 'user-view' } />

                <div className="scroll-container" onClick={ this.handleViewClick.bind(this) } >
                    <div className="content">
                        <svg className="heart-icon" viewBox="0 0 32 32">
                            <use xlinkHref="#icon-heart"></use>
                        </svg>

                        <div className="login-btn">
                            <h2>Du har fundet en funktion, der kræver at du er logget ind</h2>
                            <h1>Så log ind med facebook!</h1>
                            <h3>Klik i det blå område for at acceptere</h3>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = UserView;

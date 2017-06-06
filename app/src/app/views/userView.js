


// User view
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Loader = require( '../componentParts/loader.js' );

class UserView extends React.Component {

    // Constructor
    constructor() {
        super();
        this.closeViewState = {};
        this.state = {
            notLoggedIn : true,
            loggingIn : false,
            loggedIn : false,
        };

        Globals.hooks.add('acceptedFb', () => {
            this.setState({ 'notLoggedIn' : false });
            this.setState({ 'loggingIn' : true });
        });

        Globals.hooks.add('onlogin', () => {
            this.setState({ 'loggingIn' : false });
            this.setState({ 'loggedIn' : true });
        });

        Globals.hooks.add('onlogout', () => {
            this.setState({ 'loggedIn' : false });
            this.setState({ 'notLoggedIn' : true });
        });
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
                setTimeout(() => {
                    Globals.viewHandler.changeViewFocus(
                        Globals.lastViewState[0],
                        Globals.lastViewState[1],
                        true, false, false, true
                    );
                }, 2 * 1000);
            });
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="user-view" >
                {/*<ViewTopBar standard={ true } darken={ true } title={ ( Globals.user != null && Globals.user.state.loggedIn ) ? 'Bruger oplysninger:' : 'Log ind: ' } onClose={ this.onClose.bind(this) } closeviewstate={ this.closeviewstate != null && this.closeviewstate } name={ 'user-view' } />*/}

                <div className="scroll-container" onClick={ this.handleViewClick.bind(this) } >
                    <div className="content">
                        <svg className="heart-icon" viewBox="0 0 32 32">
                            <use xlinkHref="#icon-heart"></use>
                        </svg>

                        { this.state.notLoggedIn &&
                            <div className="notloggedin">
                                <div className="title">Hjerter er nyttige</div>
                                <div className="subtitle">Dine hjerter kan være med til at give dig et bedre overblik - og dit login indeholder alle dem du har brug for. Log ind for at tildele hjerter.</div>
                                <div className="login-btn">Log ind med Facebook</div>
                                <div className="notification">I denne version af Towwwn kan du logge ind med Facebook. Hvis du ikke har en Facebook-konto, må du vente lidt endnu for at få et Towwwn-login.</div>
                            </div>
                        }

                        { this.state.loggingIn &&
                            <div className="loggingIn">
                                <div className="title">Et øjeblik</div>
                                <div className="loader"><Loader /></div>
                                <div className="notification">Vi opretter en bruger til dig i vores system</div>
                            </div>
                        }

                        { this.state.loggedIn &&
                            <div className="loggedIn">
                                <div className="title">Succes</div>
                                <div className="notification">Nu kan du begynde at bruge dine hjerter</div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        );
    }

} module.exports = UserView;

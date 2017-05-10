


// Search View
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),

      // TMP
      SearchDataHandler = require( '../../modules/handlers/dataHandlers/searchDataHandler.js' );

class SearchView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { };
    }

    // On key down
    onkeydown( e ) {
        if ( e.keyCode === 13 ) {
            Globals.setMainState({ searchResult: null });
            let search = new SearchDataHandler();
            search.getSearchResults( _( '#search-bar' ).get(0).value ).then(( resp ) => {
                Globals.setMainState({ searchResult: resp });
            });

            Globals.viewHandler.changeViewFocus(
                '#search-view',
                '#search-results-view',
                true, false, false, true
            );
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="search-view">
                <div className="content">
                    <div className="search-nav-container">
                        <div className="nav-locations">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-location">
                                </use>
                            </svg>
                        </div>
                        <div className="nav-events bookmark-mode">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-event"></use>
                            </svg>
                        </div>
                    </div>

                    <div className="search-bar-container">
                        <input type="text" id="search-bar" onKeyDown={ this.onkeydown.bind(this) } placeholder="Søg"></input>

                        <svg className="search-icon" viewBox="0 0 32 32">
                            <use xlinkHref="#icon-search"></use>
                        </svg>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = SearchView;

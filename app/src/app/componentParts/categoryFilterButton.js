// Category Filter button
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );
class Loader extends React.Component {

    // Ctor
    constructor() {
        super();
    }

    setMainState(){
        setTimeout(function(){

            // Set category globals from props
            if(this.props.locations != null){
                Globals.setMainState({ 'currentLocations' : this.props.locations });
            }

            // Set category globals from state
            else if(this.state.locations != null){
                Globals.setMainState({ 'currentLocations' : this.state.locations });
            }

            // Set category globals from call
            else if(this.props.elem != null){
                Globals.setMainState({ 'currentLocations' : null, });
                Globals.locationDataHandler.getCategorySpecificLocation( this.props.elem.category_id ).then(( resp ) => {
                    Globals.setMainState({ 'currentLocations' : resp, });
                    this.setState({locations : resp});
                });
            }


        }.bind(this), 50);
    }

    handleClick( e ){
        if(Globals.navigationBlocker) return;

        // Set bookmark
        _('.category-filter-button').removeClass('bookmark-mode');
        e.target.classList.add('bookmark-mode');

        // push to history
        if( this.props.elem != null &&
            this.props.elem.slug != null &&
            this.props.elem.category_name != null &&
            this.props.elem.type != null
          ) Globals.history.push(this.props.elem);


        Globals.setMainState('currentLocations', null, function(){
            this.setMainState();
        }.bind(this));
    }

    componentDidMount(){

        if(this.props.elem && this.props.elem.locations) this.setState({locations : this.props.elem.locations});
        else this.setState({locations : null});
    }

    // Render
    render() {

        let className = 'rail-bar-menu-button filter-button category-filter-button';
        if(this.props.active != null && this.props.active) className += ' bookmark-mode';
        if(this.props.icon != null && this.props.name != null) className += ' icon-term';

        return (
            <div onClick={this.handleClick.bind(this)} className={className}>
                {this.props.name != null && <span className="button-term">{this.props.name}</span>}
                {this.props.count != null && <i className="button-count">{this.props.count}</i> }
                { ( this.props.icon != null && this.props.viewBox !=null ) &&
                    <svg viewBox={this.props.viewBox}><use xlinkHref={this.props.icon}></use></svg>
                }
            </div>
        );
    }
} module.exports = Loader;

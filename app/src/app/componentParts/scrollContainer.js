// Loader
const React = require( 'react' ),
      iscroll = require('../../modules/plugins/iscroll-probe.js'),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class ScrollContainer extends React.Component {

    // Ctor
    constructor() {
        super();
        this.id = null;
        this.iscroll = null;
    }

    // Handle resize
    handleResize(){
        if(this.iscroll != null) this.iscroll.refresh();

    }

    // Handle Scroll
    handleScroll(){
        if(this.props.onScroll != null && typeof this.props.onScroll === 'function') this.props.onScroll();
        this.lazyLoad.triggerload();
    }

    // Component Will Mount
    componentWillMount(){
        this.id = (this.props.name != null) ? this.props.name : 'scrollC-' + new Date().getTime();
    }

    // Component Did Mount
    componentDidMount(){
        this.iscroll = new iscroll('#' + this.id,{
            mouseWheel: true,
            preventDefault: false,
            scrollbars: false,
            probeType: 2,
        });

        this.iscroll.on('scroll', this.handleScroll.bind(this));
        this.iscroll.on('scrollEnd', this.handleScroll.bind(this));
        this.lazyLoad = new LazyLoadHandler( '#' + this.id);
    }

    // Component did update
    componentDidUpdate(){
        if(this.iscroll != null) this.iscroll.refresh();
        this.lazyLoad.triggerload();
        _(window).on('resize', this.handleScroll.bind(this));
    }

    // Render
    render() {
        return (
            <div className="scroll-container" id={this.id}>
                <div className="scroll-container-inner">
                     {this.props.children != null && this.props.children}
                </div>
            </div>
        );
    }
} module.exports = ScrollContainer;


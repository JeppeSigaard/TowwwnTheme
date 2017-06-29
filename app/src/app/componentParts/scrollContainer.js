// Loader
const React = require( 'react' ),
      iscroll = require('../../modules/plugins/iscroll-probe.js'),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' );

class ScrollContainer extends React.Component {

    // Ctor
    constructor() {
        super();
        this.id = null;
        this.iscroll = null;

        // Collapse threshold
        this.collapse = 20;

        // Expand threshold
        this.expand = 10;

        this.scrollBuffer = 0;
        this.settingHeader = false;
        this.lastScrollTop = 0;
        this.collapsed = false;
        this.lastProps = null;
    }

    // Scroll Refresh
    scrollRefresh(){
        if (this.refresh != null) clearTimeout(this.refresh);
        this.refresh = setTimeout(function(){
            if(this.iscroll != null) this.iscroll.refresh();
            this.collapsed = false;
        }.bind(this), 100);
    }

    // Handle resize
    handleResize(){
        this.scrollRefresh();
    }

    // Handle Scroll
    handleScroll(){

        // fire scroll event from props
        if(this.props.onScroll != null && typeof this.props.onScroll === 'function') this.props.onScroll();

        // trigger lazy loader
        this.lazyLoad.triggerload();

        // Set header if in props
        if (this.settingHeader) return;
        if (this.props.header == null && this.props.in == null) return;
        this.settingHeader = true;

        const st = (this.iscroll != null ) ? 0 - this.iscroll.y : _('#' + this.id).get()[0].scrollTop;

        // Going down
        if (st > this.lastScrollTop) {

            if(this.scrollBuffer > this.collapse && st > 100){
                Globals.hooks.trigger('collapse-header', {header : this.props.in, collapse : true});
                this.collapsed = true;
            }

            if (this.collapsed) this.scrollBuffer = 0;
            else this.scrollBuffer += st - this.lastScrollTop;
        }

        // Going up
        else if(st < this.lastScrollTop) {

            if(this.scrollBuffer > this.expand || st < 20){
                Globals.hooks.trigger('collapse-header', {header : this.props.in, collapse : false});
                this.collapsed = false;
            }

            if (!this.collapsed) this.scrollBuffer = 0;
            else this.scrollBuffer += this.lastScrollTop - st;
        }

        this.lastScrollTop = st;

        this.settingHeader = false;
    }

    // Component Will Mount
    componentWillMount(){
        this.id = (this.props.name != null) ? this.props.name : 'scrollC-' + new Date().getTime();
    }

    // Component Did Mount
    componentDidMount(){
        if(_('body').hasClass('mobile')){

            this.iscroll = new iscroll('#' + this.id,{
                mouseWheel: true,
                preventDefault : false,
                scrollbars: false,
                probeType: 2,
                bounce: false
            });

            this.iscroll.on('scroll', this.handleScroll.bind(this));
            this.iscroll.on('scrollEnd', this.handleScroll.bind(this));

        }

        else{

            _('#' + this.id).css({overflow: 'auto'});
            _('#' + this.id).on('scroll',this.handleScroll.bind(this));
        }


        this.lazyLoad = new LazyLoadHandler( '#' + this.id);
        _(window).on('resize', this.handleResize.bind(this));
    }

    // Component will receive props
    componentWillReceiveProps(props){
        if (props.scrollTo != null){
            if (this.iscroll != null) this.iscroll.scrollTo(0,props.scrollTo);
            else {  _('#' + this.id).get()[0].scrollTop = 0; }
            this.collapsed = false;
        }
    }

    // Component did update
    componentDidUpdate(v){
        this.scrollRefresh();
        this.lazyLoad.triggerload();
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


var syncScroll = {

    // Fields
    settings : {
        canFixedScroll : true,
        container : null,
        elem : null,
        inner : null,
        containerHeight : 0,
        highestElem : null,
        lastScrollTop : 0,
        ready : false,
        canPosition: true,
    },

    // Init
    init: function(parentSelector, elementSelector, vars) {
        this.wrapElems(parentSelector, elementSelector, function(){
            this.rescaleContainer();
            this.bindUIActions(parentSelector, elementSelector, vars);
        }.bind(this));
    },

    // Bind UI Actions
    bindUIActions: function(parentSelector, elementSelector, vars) {

        $(document).on('scroll',function(){
            this.onScroll();
        }.bind(this));


        /*
        setInterval(function(){
            this.onScroll();
        }.bind(this), (1000 / 60));
        */
        $(window).on('resize',function(){
            if(this.settings.canFixedScroll){
                this.rescaleContainer();
                this.setHorizontalPosition();
            }
        }.bind(this));
        this.ready = true;
    },

    // Initially wrap scroll elements
    wrapElems : function(parentSelector, elementSelector, cb){

        this.settings.container = parentSelector;
        this.settings.elem = $('.sync-outer');
        this.settings.inner = $('.sync-outer .sync-inner');

        if(typeof cb === 'function'){
            cb();
        }
    },

    // Set horizontal positions
    setHorizontalPosition : function(elem){
        if(typeof elem !== 'undefined'){
            if(elem.hasClass('fixed')){
                elem.css({
                    'left' : elem.parent().offset().left,
                    'width' : elem.parent().width(),
                });
            }
           else{elem.removeAttr('style');}
        }

        if(this.settings.elem !== null){
            this.settings.elem.each(function(){
                if($(this).hasClass('fixed')){
                    $(this).css({
                        'left' : $(this).parent().offset().left,
                        'width' : $(this).parent().width(),
                    });
                }
               else{$(this).removeAttr('style');}
            });
        }
    },

    // Check if element is within the horizontal scroll erea
    isInView : function(elem){
        return elem.offset().left >= 0 && elem.offset().left < $(window).innerWidth() - 200;
    },

    // rescale container
    rescaleContainer : function(cb){

        if(this.settings.container !== null){
            var heighHeight = ($('.high').length) ? $('.high').innerHeight() : 0 ;

            $('.sync-outer.high').removeClass('high');
            this.settings.containerHeight = 0;
            var highestElem = null;

            $('.sync-outer .sync-inner').each(function(){
                var elem = $(this);
                if (elem.innerHeight() > syncScroll.settings.containerHeight){

                    if(syncScroll.isInView(elem)){
                        syncScroll.settings.containerHeight = elem.innerHeight();
                        highestElem = elem;
                    }
                }
            });

            this.settings.container.css('height', this.settings.containerHeight);
            highestElem.parent('.sync-outer').removeClass('fixed absolute top').addClass('high');
        }

        if(typeof cb === 'function'){
            cb();
        }
    },

    // Scroll event handler
    onScroll : function(){

        // Run if script ready and new cycle is allowed
        if (this.ready && this.settings.canPosition && this.settings.canFixedScroll){

            // dissalow new cycle (until completion) i.e prevent spassing, lul
            this.settings.canPosition = false;

            // vars
            var ct = this.settings.container.offset().top,
                ch = this.settings.container.innerHeight(),
                st = $(window).scrollTop(),
                wh = $(window).height(),
                diff = st - this.settings.lastScrollTop,
                forceRepaint = false;


            // if(diff === 0){this.settings.canPosition = true; return;}

            // Above sync scroll area (syncs should either be high or top)
            if(ct >= st + 60){
            }


            // Below sync scroll area (syncs should either be high or bottom)
            else if(ct + ch <= st + wh){
            }


            // In sync scroll area
            else{
                this.settings.elem.each(function(){
                    var elem = $(this);

                    // set fixed scrollTop accordingly
                    if(elem.hasClass('fixed')){
                        var scrollAmount = elem.scrollTop() + diff;
                        elem.scrollTop(scrollAmount);
                        syncScroll.setHorizontalPosition($(this));
                    }
                });
            }

            // Try to repaint when needed (prolly not working)
            if(forceRepaint){
                this.settings.container.css({transform: 'translateZ(1)'}).css({transform: 'none'});
            }

            // Prepare last scroll top for new cycle
            this.settings.lastScrollTop = st;

            // allow new cycle
            this.settings.canPosition = true;
        }
    },

    lockView : function(){

        this.settings.canFixedScroll = false;

        $('body').addClass('no-scroll').css({height:'100%',overflow:'hidden'});
        if(null !== this.settings.container){
            this.settings.container.css({
                height : $(window).innerHeight - this.settings.container.offset().top,
                overflow : 'hidden',
            });
        }

        $('.sync-outer').each(function(){
            var innerScroll = $(this).scrollTop();
            $(this).removeAttr('style').css({
                position : 'absolute',
                width: '100%',
                //top : $(this).offset().top - $(this).parent().offset().top - innerScroll,
                top : $(this).offset().top - $(this).parent().offset().top,
                left : '0',
            });
        });
    },

    releaseView : function(){
        let EventCalenderModule = require( './../layoutLayer/eventCalenderLayout.js' );

        this.settings.canFixedScroll = true;
        $('.sync-outer').removeAttr('style');
        $('body').removeClass('no-scroll').removeAttr('style');
        
        this.setHorizontalPosition();

        this.onScroll();
        EventCalenderModule.setEventCalendarWidth();
        this.rescaleContainer(function(){
            var goTopSide = false;

            if($(window).width <= 640){
                goTopSide = true;
            }

            syncScroll.settings.elem.each(function(){
                if(syncScroll.isInView($(this)) && !$(this).is('.high')){
                    goTopSide = false;
                }

                if(syncScroll.isInView($(this)) && $(this).find('.bookmark-mode').length && goTopSide){
                    $('html,body').delay(200).animate({scrollTop : $(this).find('.bookmark-mode').parent('.event').offset().top - 70},200);
                    goTopSide = false;
                }
            });

            if(goTopSide === true){
                $('html,body').animate({scrollTop : syncScroll.settings.container.offset().top - 60}, 0);
            }
        });
    }
}; module.exports = syncScroll;







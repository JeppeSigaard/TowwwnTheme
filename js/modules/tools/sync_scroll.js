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
        $(window).on('scroll',function(){
            if(this.settings.canFixedScroll){
                this.onScroll();
            }
        }.bind(this));

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
        return elem.offset().left >= 0 && elem.offset().left < $(window).innerWidth();
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
        if (this.ready){
            var ct = this.settings.container.offset().top,
                ch = this.settings.container.innerHeight(),
                st = $(window).scrollTop(),
                wh = $(window).height(),
                diff = st - this.settings.lastScrollTop;

            this.settings.elem.each(function(){
                var elem = $(this);

                // Over sync scroll område
                if(ct >= st + 60){
                    if(elem.hasClass('high')){ elem.removeClass('fixed top bottom'); }
                    else if(!elem.hasClass('top')){
                        elem.addClass('top').removeClass('bottom fixed').removeAttr('style').hide().show();
                    }
                }


                // Under sync scroll område
                else if(ct + ch <= st + wh){
                    if(elem.hasClass('high')){ elem.removeClass('fixed top bottom'); }
                    else if(!elem.hasClass('bottom')){
                        elem.addClass('bottom').removeClass('top fixed').removeAttr('style').hide().show();
                    }
                }


                // I sync scroll område
                else{
                    if(elem.hasClass('high')){elem.removeClass('fixed top bottom');}
                    else if(elem.hasClass('bottom')){
                        elem.addClass('fixed').removeClass('bottom');
                        elem.scrollTop(50000000000000000);
                    }
                    else if(elem.hasClass('top')){
                        elem.addClass('fixed').removeClass('top');
                        elem.scrollTop('0');
                    }
                    else{
                        var scrollAmount = elem.scrollTop() + diff;
                        if(!elem.hasClass('fixed')){
                            elem.hide().addClass('fixed').show();
                        }
                        elem.scrollTop(scrollAmount);
                        syncScroll.setHorizontalPosition(elem);
                    }
                }
            });
            this.settings.lastScrollTop = st;
        }
    },

    lockView : function(){
        $('body').addClass('no-scroll').css({height:'100%',overflow:'hidden'});
        if(null !== this.settings.container){
            this.settings.container.css({
                height : $(window).innerHeight - this.settings.container.offset().top,
                overflow : 'hidden',
            });

        }

        this.settings.canFixedScroll = false;
        $('.sync-outer').each(function(){
            var innerScroll = $(this).scrollTop();
            $(this).removeAttr('style').css({
                position : 'absolute',
                width: '100%',
                top : $(this).offset().top - $(this).parent().offset().top - innerScroll,
                left : '0',
            });
        });
    },

    releaseView : function(){
        var siteHeight = $(document).innerHeight();
        this.settings.canFixedScroll = true;
        $('.sync-outer').removeAttr('style');
        $('body').removeClass('no-scroll').removeAttr('style');
        this.rescaleContainer();
        
        // siteHeight -= $(document).innerHeight();
        // $(window).scrollTop( $('.high').offset().top - $(window).scrollTop()
        //                     + $('#site-header').outerHeight() - siteHeight );
        
        this.setHorizontalPosition();
    }
}







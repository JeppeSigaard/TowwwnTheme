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
        syncScroll.wrapElems(parentSelector, elementSelector, function(){
            syncScroll.rescaleContainer();
            syncScroll.bindUIActions(parentSelector, elementSelector, vars);
        });
    },

    // Bind UI Actions
    bindUIActions: function(parentSelector, elementSelector, vars) {

        this.ready = true;
        //syncScroll.onScroll();
        $(window).on('scroll',function(){
            if(syncScroll.settings.canFixedScroll){
                syncScroll.onScroll();
            }
        });

        $(window).on('resize',function(){
            if(syncScroll.settings.canFixedScroll){
                syncScroll.rescaleContainer();
                syncScroll.setHorizontalPosition();
            }
        });
    },

    // Initially wrap scroll elements
    wrapElems : function(parentSelector, elementSelector, cb){

        syncScroll.settings.container = parentSelector;
        syncScroll.settings.elem = $('.sync-outer');
        syncScroll.settings.inner = $('.sync-outer .sync-inner');

        if(typeof cb === 'function'){
            cb();
        }
    },

    // Set horizontal positions
    setHorizontalPosition : function(){

       syncScroll.settings.elem.each(function(){
            if($(this).hasClass('fixed')){
                $(this).css({
                    'left' : $(this).parent().offset().left,
                    'width' : $(this).parent().width(),
                });
            }
           else{$(this).removeAttr('style');}
        });
    },

    // Check if element is within the horizontal scroll erea
    isInView : function(elem){
        return elem.offset().left >= 0 && elem.offset().left < $(window).innerWidth();
    },

    // rescale container
    rescaleContainer : function(){
        $('.sync-outer.high').removeClass('high');
        syncScroll.settings.containerHeight = 0;
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

        syncScroll.settings.container.css('height', syncScroll.settings.containerHeight);
        highestElem.parent('.sync-outer').removeClass('fixed').addClass('high');
    },

    // Align to top
    topAlign : function(elem){

        if(elem.find('.sync-inner').innerHeight() >= syncScroll.settings.containerHeight){
            $(window).scrollTop(syncScroll.settings.container.offset().top);
        }

        else if(syncScroll.settings.canFixedScroll){
            syncScroll.settings.canFixedScroll = false;

            var st = $(window).scrollTop(),
                ch = syncScroll.settings.containerHeight,
                ih = elem.find('.inner').innerHeight(),
                sb = Math.floor(ch - (st + ih));


            if(sb < 0){
                syncScroll.settings.elem.addClass('fixed').removeClass('bottom');
                syncScroll.setHorizontalPosition();
                $(window).scrollTop(st + sb);
            }

            elem.find('.sync-outer').scrollTop('0');

            syncScroll.settings.lastScrollTop = st;
            syncScroll.settings.canFixedScroll = true;
        }
    },

    // Scroll event handler
    onScroll : function(){
        if (this.ready){
            syncScroll.settings.elem.each(function(){
                if($(this).hasClass('high')){
                    $(this).removeClass('fixed top bottom');
                }

            });

            var container = syncScroll.settings.container,
                st = $(window).scrollTop(),
                diff = st - syncScroll.settings.lastScrollTop;

            // Over sync scroll område
            if(syncScroll.settings.container.offset().top >= $(window).scrollTop() + 60){
                syncScroll.settings.elem.each(function(){
                    if(!$(this).hasClass('high')){
                        $(this).addClass('top').removeClass('bottom fixed').removeAttr('style');
                    }
                });
            }


            // Under sync scroll område
            else if(container.offset().top + container.innerHeight() <= $(window).scrollTop() + $(window).innerHeight()){
                syncScroll.settings.elem.each(function(){
                    if(!$(this).hasClass('high')){
                        $(this).addClass('bottom').removeClass('top fixed').removeAttr('style');
                    }

                });
            }


            // I sync scroll område
            else{

                syncScroll.settings.elem.each(function(){

                    var fancyScrollAmount = $(this).scrollTop() + diff;

                    if($(this).hasClass('high')){}

                    else if($(this).hasClass('bottom')){
                        $(this).addClass('fixed').removeClass('bottom');
                        $(this).scrollTop(50000000000000000);
                    }

                    else if($(this).hasClass('top')){
                        $(this).addClass('fixed').removeClass('top');
                        $(this).scrollTop('0');
                    }

                    else{
                        $(this).addClass('fixed')
                        $(this).scrollTop(fancyScrollAmount);
                    }
                });

                syncScroll.setHorizontalPosition();
            }

            syncScroll.settings.lastScrollTop = st;
        }
    },

    lockView : function(){

        $('body').addClass('no-scroll').css({height:'100%',overflow:'hidden'});

        if(null !== syncScroll.settings.container){
            syncScroll.settings.container.css({
                height : $(window).innerHeight - syncScroll.settings.container.offset().top,
                overflow : 'hidden',
            });

        }

        syncScroll.settings.canFixedScroll = false;
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
        syncScroll.settings.canFixedScroll = true;

        $('.sync-outer').removeAttr('style');
        $('body').removeClass('no-scroll').removeAttr('style');

        syncScroll.rescaleContainer();
        syncScroll.setHorizontalPosition();
    }
}


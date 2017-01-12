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
        syncScroll.onScroll();
        $(window).on('scroll',function(){
            if(syncScroll.settings.canFixedScroll){
                syncScroll.onScroll();
            }
        });

        $(window).on('resize',function(){
            syncScroll.rescaleContainer();
            syncScroll.setHorizontalPosition();
        });
    },

    // Initially wrap scroll elements
    wrapElems : function(parentSelector, elementSelector, cb){

        parentSelector.addClass('sync-scroll-container');

        $(elementSelector).each(function(){
            $(this).addClass('sync-scroll-outer').wrapInner('<div class="sync-scroll"><div class="sync-scroll-inner"></div></div>');
        });

        syncScroll.settings.container = parentSelector;
        syncScroll.settings.elem = $('.sync-scroll');
        syncScroll.settings.inner = $('.sync-scroll .sync-scroll-inner');

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

    // rescale container
    rescaleContainer : function(h){
        if(typeof h !== 'undefined'){
            syncScroll.settings.containerHeight = h;
        }

        else{

            syncScroll.settings.inner.each(function(){
                if ($(this).innerHeight() > syncScroll.settings.containerHeight){
                    syncScroll.settings.containerHeight = $(this).innerHeight();
                }
            });
        }

        syncScroll.settings.container.css('height', syncScroll.settings.containerHeight);
    },

    // Align to top
    topAlign : function(elem){

        if(elem.find('.sync-scroll-inner').innerHeight() >= syncScroll.settings.containerHeight){
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

            elem.find('.sync-scroll').scrollTop('0');

            syncScroll.settings.lastScrollTop = st;
            syncScroll.settings.canFixedScroll = true;
        }
    },

    // Scroll event handler
    onScroll : function(){

        var container = syncScroll.settings.container,
            st = $(window).scrollTop(),
			diff = st - syncScroll.settings.lastScrollTop;

        // Over sync scroll område
        if(syncScroll.settings.container.offset().top >= $(window).scrollTop()){
            syncScroll.settings.elem.addClass('top').removeClass('bottom fixed').removeAttr('style');
        }


        // Under sync scroll område
        else if(container.offset().top + container.innerHeight() <= $(window).scrollTop() + $(window).innerHeight()){
            syncScroll.settings.elem.addClass('bottom').removeClass('top fixed').removeAttr('style');
        }


        // I sync scroll område
        else{

            syncScroll.settings.elem.each(function(){

                var fancyScrollAmount = $(this).scrollTop() + diff;

                if($(this).hasClass('bottom')){
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
    },

}

jQuery.fn.extend({
    scrollSync : function(elementSelector){
        syncScroll.init(this,elementSelector);
    },
});

$(window).load(function(){
    $('#scroll-container').scrollSync('.main-content, .sidebar-1, .sidebar-2');
});


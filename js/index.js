// @koala-prepend 'modules/tools/help_functions.js';
// @koala-prepend 'modules/tools/month_picker.js';
// @koala-prepend 'modules/tools/sync_scroll.js';
// @koala-prepend 'modules/contentLayer/eventContent.js';
// @koala-prepend 'modules/contentLayer/locationContent.js';
// @koala-prepend 'modules/contentLayer/locationCategoryContent.js';
// @koala-prepend 'modules/view_handler.js';
// @koala-prepend 'modules/layoutLayer/headerLayout.js';
// @koala-prepend 'modules/layoutLayer/frontpageLayout.js';
// @koala-prepend 'modules/layoutLayer/eventCalenderLayout.js';
// @koala-prepend 'modules/layoutLayer/eventSingleLayout.js';
// @koala-prepend 'modules/controllers/viewController.js';
// @koala-prepend 'modules/controllers/imageController.js';
// @koala-prepend 'modules/search.js';

$(function() {
    
    $('a').click(function(e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault();
        }
    });

    $(window).on('click', function() {
        $(window).trigger('resize');
        setTimeout(function() {
            syncScroll.rescaleContainer();
        }, 200);
    });

    $(document).on('click', '[data-link]', function(){
        if ( $(this).attr('data-link-type') === 'redirect' ) {
            window.location.href = $(this).attr('data-link');
        } else {
            window.open( $(this).attr('data-link') );
        }
    });

    HeaderModule.init();
    ImageController.init();
    ViewHandler.init();
    ViewControllerModule.init();
    EventCalenderModule.init();

    var onContentLoad = function( tmp ) {
        FrontPageModule.init( tmp );
        SearchModule.init();
        EventSingleModule.init();
        syncScroll.init($('#page-content'), '.container-section');

        setTimeout(function() {
            syncScroll.rescaleContainer();
        }, 150);
    }

    if('app' === template){
        EventContentModule.init(function( tmp ) {
            onContentLoad( tmp );
        });
    }

    else{
        SearchModule.init();
        syncScroll.init($('#page-content'), '.container-section');
        setTimeout(function() {
            syncScroll.rescaleContainer();
        }, 150);
    }


    $('.sub-page-menu').on('click','a',function(){

        var href = $(this).attr('href'),
            li = $(this).parents('.menu-item-has-children'),
            a = li.children('a').first(),
            prehref = a.attr('href');

        if ($(href).length){
            //$('html,body').animate({scrollTop : $(href).offset().top - 80},900);
            setTimeout(function(){
                var st = $('body').scrollTop() - 80;
                $('body').scrollTop(st);
            },10);
        }

        else if ($('a[name="'+href.replace('#','')+'"]').length){
            //$('html,body').animate({scrollTop : $('a[name="'+href.replace('#','')+'"]').offset().top - 80},900);
            setTimeout(function(){
                var st = $('body').scrollTop() - 80;
                $('body').scrollTop(st);
            },10);

        }

        else{
            window.location.href = prehref + href;
        }
    });
});

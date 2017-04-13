
// React
import React from 'react';
import ReactDOM from 'react-dom';

// Tools
require( './modules/tools/fixed-sticky.js' );
require( './modules/tools/month_picker.js' );
require( './modules/tools/swiper.js' );

let HelpFunctions = require( './modules/tools/help_functions.js' );
let historyModule = require( './modules/tools/history.js' );
let syncScroll = require( './modules/tools/sync_scroll.js' );

// Content Layer
let EventContentModule = require( './modules/contentLayer/eventContent.js' );
let LocationModule = require( './modules/contentLayer/locationContent.js' );
let LocationCategoryModule = require( './modules/contentLayer/locationCategoryContent.js' );

// Layout layer
let EventCalenderModule = require( './modules/layoutLayer/eventCalenderLayout.js' );
let EventSingleModule = require( './modules/layoutLayer/eventSingleLayout.js' );
let FrontPageModule = require( './modules/layoutLayer/frontpageLayout.js' );
let HeaderModule = require( './modules/layoutLayer/headerLayout.js' );
let LocationListModule = require( './modules/layoutLayer/locationListLayout.js' );
let LocationSingleViewModule = require( './modules/layoutLayer/locationSingleLayout.js' );
// require( './modules/layoutLayer/mobileViewLayout.js' );
// require( './modules/layoutLayer/viewController.js' );

// Handlers
let navigationHandler = require( './modules/handlers/navigation_handler.js' );
let ImageController = require( './modules/handlers/imageController.js' );

// Other
let ViewHandler = require( './modules/view_handler.js' );
let SearchModule = require( './modules/search.js' );
let cookie = require( './modules/cookie.js' );

// Main entry point
$(function() {
    
    $(document).on('click','a', function(e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault();
        }
    });


    $(document).on('click', '[data-link]', function(){
        if ( $(this).attr('data-link-type') === 'redirect' ) {
            window.location.href = $(this).attr('data-link');
        } else {
            window.open( $(this).attr('data-link') );
        }
    });

    // TMP

    var mouseDownX = null, mouseDownY = null;
    $(document).on( 'mousedown', function( e ) {
        e.preventDefault();
        mouseDownX = e.pageX;
        mouseDownY = e.pageY;
    });

    $(document).on( 'mouseup', function( e ) {
        var distanceX = Math.abs( e.pageX - mouseDownX );
        var distanceY = Math.abs( e.pageY - mouseDownY );
        var distance = Math.sqrt( distanceX * distanceX + distanceY * distanceY );

        if ( distance >= 30 ) {
            e.preventDefault();
        }
    });

    // TMP END

    HeaderModule.init();
    ImageController.init();
    ViewHandler.init();
    //ViewControllerModule.init();
    EventCalenderModule.init();
    navigationHandler.init();

    LocationModule.init( function() {
        LocationCategoryModule.init();
        //LocationCategoryModule.render_location_categories( '#section2 .content' );
        LocationListModule.init();
        LocationSingleViewModule.init();
    });

    var onContentLoad = function( tmp ) {
        FrontPageModule.init( tmp );
        SearchModule.init();
        EventSingleModule.init();
        syncScroll.init($('#page-content'), '.container-section');
    }

    if('app' === template){
        EventContentModule.init(function( tmp ) {
            onContentLoad( tmp );
            cookie.init();
        });
    }

    else{
        SearchModule.init();
        syncScroll.init($('#page-content'), '.container-section');
        cookie.init();
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

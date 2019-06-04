import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor(){
        this.lazyLoadImages = $('.lazyload');
        this.siteHeader = $('.site-header');
        this.triggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();
        this.headerLinks = $('.primaryNav a'); 
        this.pageSections = $('.page-section');
        this.createPageSectionWaypoint();
        this.addSmoothScroll();
        this.refreshWaypoints();
    }

        /*  
            fix for lazyload package disrupting waypoints triggering
            refreshes all waypoints in browsers memory, including those
            from other modules 
        */ 

    refreshWaypoints(){    
        this.lazyLoadImages.on('load', () => {
            Waypoint.refreshAll();  
        })
    }

    addSmoothScroll(){
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint(){
        let mainObject = this;
        new Waypoint({
            element: this.triggerElement[0],
            handler: function(direction){
                if (direction === 'down'){
                    mainObject.siteHeader.addClass('site-header--dark');
                } else {
                    mainObject.siteHeader.removeClass('site-header--dark');
                    mainObject.headerLinks.removeClass('current-link');
                }
            }
        });
    }

    createPageSectionWaypoint(){
        let mainObject = this;
        this.pageSections.each(function(){
            let currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function(direction){
                    if(direction == 'down'){
                        let matchingLink = currentPageSection.getAttribute('data-matchingLink');
                        mainObject.headerLinks.removeClass('current-link');
                        $(matchingLink).addClass('current-link'); 
                    }
                },
                offset: '18%'
            });
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if(direction == 'up'){
                        let matchingLink = currentPageSection.getAttribute('data-matchingLink');
                        mainObject.headerLinks.removeClass('current-link');
                        $(matchingLink).addClass('current-link'); 
                    }
                },
                offset: '-40%'
            });
        })
    }
};

export default StickyHeader;
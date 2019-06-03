import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor(){
        this.siteHeader = $('.site-header');
        this.triggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();
        this.headerLinks = $('.primaryNav a'); 
        this.pageSections = $('.page-section, .large-hero');
        this.createPageSectionWaypoint();
        this.addSmoothScroll();
    }

    addSmoothScroll(){
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint(){
        let mainObject = this;
        new Waypoint({
            element: this.triggerElement[0],
            handler: (direction) => {
                if (direction === 'down'){
                    mainObject.siteHeader.addClass('site-header--dark');
                } else {
                    mainObject.siteHeader.removeClass('site-header--dark');
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
                handler: (direction) => {
                    if(direction === 'down'){
                        let matchingLink = currentPageSection.getAttribute('data-matchingLink');
                        mainObject.headerLinks.removeClass('current-link');
                        $(matchingLink).addClass('current-link'); 
                    }
                },
                offset: '20%'
            });
            new Waypoint({
                element: currentPageSection,
                handler: (direction) => {
                    if(direction === 'up'){
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
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(items, offset) {
    this.itemsToReveal = items;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item');
  }

  createWaypoints() {
    let mainObject = this;
    this.itemsToReveal.each(function() {
      let currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: () => {
          $(currentItem).addClass('reveal-item--visible');
        },
        offset: mainObject.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;
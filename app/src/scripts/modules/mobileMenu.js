import $ from 'jquery'; 

class MobileMenu {
  constructor(){
    this.siteHeader = $('.site-header');
    this.menuIcon = $('.site-header__menuIcon');
    this.menuContent = $('.site-header__menuContent');
    this.events();
  }

  events(){
    this.menuIcon.click(this.toggle.bind(this));
  }

  toggle(){
    this.menuContent.toggleClass('site-header__menuContent--visible');
    this.siteHeader.toggleClass('site-header--expand');
    this.menuIcon.toggleClass('site-header__menuIcon--close')
  }
}
export default MobileMenu;

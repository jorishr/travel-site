import $ from 'jquery';
import MobileMenu from './modules/mobileMenu';
import RevealOnScroll from './modules/revealOnScroll';
import StickyHeader from './modules/stickyHeader';

const mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.cards'), '60%');
const stickyHeader = new StickyHeader();
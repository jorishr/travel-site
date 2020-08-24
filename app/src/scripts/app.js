import $ from 'jquery';
import MobileMenu from './modules/mobileMenu';
import RevealOnScroll from './modules/revealOnScroll';
import StickyHeader from './modules/stickyHeader';
import Modal from './modules/modal';
import React from 'react';
import ReactDom from 'react-dom';
import ReactSection from './modules/reactSection';

ReactDom.render(<ReactSection />, document.querySelector('#react-section'));

const mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.cards'), '60%');
const stickyHeader = new StickyHeader();
const modal = new Modal();
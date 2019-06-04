import $ from 'jquery';

class Modal {
    constructor(){
        this.modalBtn = $('.modalBtn'); 
        this.modal = $('.modal');
        this.modalCloseBtn = $('.modal__closeBtn');
        this.events();
    };

    events(){
        // click modalBtn
        this.modalBtn.click(this.openModal.bind(this));
        // click modal__close
        this.modalCloseBtn.click(this.closeModal.bind(this));
        // escape key
        $(document).keyup(this.keyPressHandler.bind(this));
    };

    keyPressHandler(e){
        if(e.keyCode == 27){    // escape key
            this.closeModal();
        }
    };

    openModal(){
        this.modal.addClass('modal--visible');
        return false;   // avoids scrolling back up to top
    };

    closeModal(){
        this.modal.removeClass('modal--visible');
    };

}

export default Modal;
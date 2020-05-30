import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isSmallScreen } from '../constants/app.constant';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class UIService {

  private closeResult: string;

  constructor(private modalService: NgbModal) {

  }

  container_or_fluid() {
    if (isSmallScreen) return "container-fluid"
    return "container"
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  auto_size_text_area() {
    // auto hieght for ttextareas
    (function ($) {
      $('.textarea').each(function () {
      }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
      $('.textarea').each(function () {
      }).on("blur", function () {
        this.style.height = 'auto';
      });
      $('.textarea').each(function () {
      }).on("focus", function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });

    })(jQuery);

  }

  upload_button() {

    const inputs = document.getElementsByClassName("target_input");
    const buttons = document.getElementsByClassName("button_upload");


    if (buttons.length == inputs.length) {
      var pairs = [];

      for (var i = 0; i < buttons.length; i++) {
        pairs.push(
          {
            button: buttons[i],
            input: inputs[i],
          }
        )
      }

      pairs.forEach(pair => {
        pair.button.addEventListener('click', function () {
          var ele = pair.input as HTMLElement;
          ele.click();
        })
      })
    }


  }

  dismissAll() {
    this.modalService.dismissAll();
         }

}

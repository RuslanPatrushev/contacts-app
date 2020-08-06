import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agree-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  confirm() {
    this.activeModal.close(true);
  }

  closeModal() {
    this.activeModal.close();
  }
}

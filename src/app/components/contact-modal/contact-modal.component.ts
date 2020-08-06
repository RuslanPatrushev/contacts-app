import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Contact} from '../../models/contact.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {ruLocale} from 'ngx-bootstrap/locale';
import {USER_ID} from '../../constant/local-storage';

defineLocale('ru', ruLocale);


@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit, OnDestroy {
  @Input() contact: Contact;
  contactForm: FormGroup;
  locale = 'ru';

  constructor(
    private activeModal: NgbActiveModal,
    private localeDataService: BsLocaleService
  ) {
    this.localeDataService.use(this.locale);

  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(this.contact ? this.contact.name : '', [Validators.required]),
      phone: new FormControl(this.contact ? this.contact.phone : '', [Validators.required]),
      date: new FormControl(this.contact ? new Date(this.contact.date) : new Date())
    });
  }

  confirm() {
    const newContact = this.contactForm.value;
    newContact.id = this.contact?.id;
    newContact.userId = localStorage.getItem(USER_ID);
    this.activeModal.close(newContact);
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnDestroy() {
    localStorage.removeItem(USER_ID);
  }
}

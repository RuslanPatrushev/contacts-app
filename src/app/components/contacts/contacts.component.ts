import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContactModalComponent} from '../contact-modal/contact-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Contact} from '../../models/contact.model';
import {ContactsApiService} from '../../services/contacts-api.service';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-personal-area',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit, AfterViewInit {
  filteredContacts: Contact[];
  contacts: Contact[];
  sortName: string;
  sortAsc = -1;
  @ViewChild('input') inputSearch: ElementRef;

  constructor(private modalService: NgbModal, private contactsApiService: ContactsApiService) {
  }

  ngOnInit() {
    this.getContacts();
  }

  ngAfterViewInit() {
    this.search();
  }

  getContacts() {
    this.contactsApiService.getContacts().subscribe(
      (data) => {
        if (data) {
          this.filteredContacts = data;
          this.contacts = data;
        }
      });
  }

  search() {
    fromEvent(this.inputSearch.nativeElement, 'input')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filteredContacts = this.contacts.filter(
          contact => contact.name.toLowerCase().includes(this.inputSearch.nativeElement.value.toLowerCase())
        );
      });
  }

  sort(value: string) {
    if (this.sortName !== value) {
      this.sortAsc = -1;
    } else {
      this.sortAsc *= -1;
    }
    this.sortName = value;
    this.filteredContacts.sort((a, b) => 0 - (a[value] > b[value] ? this.sortAsc : -1 * this.sortAsc));
  }

  deleteContact(contact: Contact) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true});
    modalRef.result.then((result: boolean) => {
      if (result) {
        this.contactsApiService.deleteContact(contact.id).subscribe(() => {
          this.getContacts();
        });
      }
    }).catch(() => {
    });
  }

  openModal(contact?: Contact) {
    const modalRef = this.modalService.open(ContactModalComponent, {centered: true});
    modalRef.componentInstance.contact = contact;
    modalRef.result.then((result: Contact) => {
      if (result) {
        if (contact) {
          this.contactsApiService.editContact(result).subscribe(() => this.getContacts());
        } else {
          result.id = null;
          this.contactsApiService.addContact(result).subscribe(() => this.getContacts());
        }
      }
    }).catch(() => {
    });
  }

}

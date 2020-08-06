import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';
import {USER_ID} from '../constant/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {
  private API_PATH = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.API_PATH}/contacts?userId=${localStorage.getItem(USER_ID)}`);
  }

  addContact(body: Contact) {
    return this.http.post<Contact>(`${this.API_PATH}/contacts`, body);
  }

  editContact(body: Contact) {
    return this.http.put(`${this.API_PATH}/contacts/${body.id}`,
      body,
    );
  }

  deleteContact(id: number) {
    console.log('пришел');
    return this.http.delete(`${this.API_PATH}/contacts/${id}`);
  }
}

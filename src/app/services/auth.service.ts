import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_PATH = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  authentication(query: User): Observable<User> {
    return this.http
      .get<User[]>(`${this.API_PATH}`)
      .pipe(
        map(users => users.find(user => (user.login === query.login && user.password === query.password)))
      );
  }
}

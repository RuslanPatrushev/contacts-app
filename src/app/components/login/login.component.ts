import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {USER_ID} from '../../constant/local-storage';

@Component({
  selector: 'app-user-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(private http: AuthService, private router: Router) {
  }

  ngOnInit() {
    localStorage.removeItem(USER_ID);
    this.userForm = new FormGroup({
      userLogin: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required])
    });
  }

  auth() {
    const user = new User(this.userForm.value.userLogin, this.userForm.value.userPassword);
    this.http.authentication(user).subscribe(
      (data) => {
        if (data) {
          this.router.navigate(['contacts']);
          localStorage.setItem(USER_ID, JSON.stringify(data.id));
        } else {
          this.userForm.setErrors({invalid: true});
        }
      },
      () => this.userForm.setErrors({invalid: true})
    );
  }
}

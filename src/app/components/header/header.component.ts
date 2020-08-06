import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {USER_ID} from '../../constant/local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  checkLogin() {
    return !!localStorage.getItem(USER_ID);
  }

  exit() {
    localStorage.removeItem(USER_ID);
    this.router.navigate(['login']);
  }

}

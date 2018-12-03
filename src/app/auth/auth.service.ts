import { Subject } from "rxjs/Subject";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnInit {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.user = null;
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return !(this.user === null || this.user === undefined);
  }

  private authSuccessfully(){
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}

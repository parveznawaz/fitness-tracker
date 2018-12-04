import { Subject } from "rxjs/Subject";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService implements OnInit {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth){}

  ngOnInit(): void {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email,authData.password)
      .then(result=>{
        this.authSuccessfully();
        console.log(result)
      })
      .catch(error=>{
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email,authData.password)
      .then(result=>{
        this.authSuccessfully();
        console.log(result)
      })
      .catch(error=>{
        console.log(error);
      });    
  }

  logout() {
    this.isAuthenticated = true;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully(){
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}

import { Subject } from "rxjs/Subject";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService implements OnInit {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private traininigService: TrainingService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }else{
        this.traininigService.cancelSubscriptions();    
        this.isAuthenticated = true;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email,authData.password)
      .then()
      .catch(error=>{
        this.snackBar.open(error.message, null, 
          {
            duration: 3000
          })
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email,authData.password);
  }

  logout() {
    this.afAuth.auth.signOut();    
  }

  isAuth() {
    return this.isAuthenticated;
  }

}

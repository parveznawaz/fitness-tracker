import { Subject } from "rxjs/Subject";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.sevice';

@Injectable()
export class AuthService implements OnInit {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private traininigService: TrainingService,
    private uiService : UIService
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
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email,authData.password)
      .then(result=>{
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error=>{
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email,authData.password)
      .then(result=>{
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error=>{
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();    
  }

  isAuth() {
    return this.isAuthenticated;
  }

}

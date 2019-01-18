import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getIdentity():any{
  	let identity = JSON.parse(localStorage.getItem('identity_user'));

  	if (identity) {
  		return identity;
  	}else{
  		return null;
  	}
  }

  getToken():any{
    let token = localStorage.getItem('token');

    if (token) {
      return token;
    }else{
      return null;
    }
  }  

  logOut(){
  	localStorage.removeItem('identity_user');
  	localStorage.clear();
  }

}

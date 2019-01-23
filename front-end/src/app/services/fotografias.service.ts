import { Injectable } from '@angular/core';
import { Global } from './global'
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class FotografiasService {
	private url: string;
  	
  	constructor(
  		private _http: HttpClient
  	){
  		this.url = Global.url;
  	}

    getFotografiasById(id:number):any{
      return this._http.get(this.url + 'fotografia/'+ id).toPromise().then(res=>res);
    }

  	getFotografias():any{
  		return this._http.get(this.url + 'fotografias').toPromise().then(res=>res);
  	}

    getAllFotografias(token:string):any{
      let headers:HttpHeaders = new HttpHeaders({'Authorization':token});
      return this._http.get(this.url + 'all-fotografias', {headers:headers}).toPromise().then(res=>res);
    }

    saveFotografias(fotografia:any, token:string):any{
      let headers:HttpHeaders = new HttpHeaders({'Authorization':token});
      return this._http.post(this.url + 'fotografia', fotografia, {headers:headers}).toPromise().then(res=>res);
    }

    updateFotografias(id:number, fotografia:any, token:string):any{
      let headers:HttpHeaders = new HttpHeaders({'Authorization':token});
      return this._http.put(this.url + 'fotografia/' + id, fotografia, {headers:headers}).toPromise().then(res=>res);
    }
}
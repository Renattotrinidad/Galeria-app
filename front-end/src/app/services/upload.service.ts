import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
	private url:string;

  constructor(
  	private _http:HttpClient
  	) { 
  		this.url = Global.url;}

  upload(url:string, files:Array<File>,token:string):any{
      return new Promise((resolve, reject)=>{
        var formData:any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i < files.length; i++){
          formData.append('foto', files[i], files[i].name);
        }

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);

        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4){
              if (xhr.status == 200){
                  resolve(JSON.parse(xhr.response));
              }else{
                  reject(JSON.parse(xhr.response));
            }
          }
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FotografiasService } from '../../services/fotografias.service';
import { AuthService } from '../../services/auth.service';
import { Global } from '../../services/global';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-nueva-fotografia',
  templateUrl: './nueva-fotografia.component.html',
  styleUrls: ['./nueva-fotografia.component.css']
})
export class NuevaFotografiaComponent implements OnInit {
	public fotografia:any={};
	public token:string;
	public identity:any;
	public url:string;
  public filesToUpload:Array<File>;
  public image_selected:string;

  constructor(
  	private _serviceFotografias:FotografiasService,
  	private _auth:AuthService,
  	private _route:Router,
    private _upload:UploadService
  	) {
  		this.token = this._auth.getToken();
  		this.identity = this._auth.getIdentity();
  		this.url = Global.url;
  	}

  ngOnInit() {
  }

  agregar(){
    this.fotografia.usuarioCreacion = this._auth.getIdentity().usuario;
    this._serviceFotografias.saveFotografias(this.fotografia, this.token)
        .then(response=>{

          if (this.filesToUpload){
            this._upload.upload(this.url + 'upload-foto/' + response.fotografia.id, this.filesToUpload, this.token)
                .then(fotografias=>{
                  this._route.navigate(['/admin/list']);
                })
                .catch(err=>{
                  this._route.navigate(['/admin/list']);
                  console.log(err);
                });
          }

        })
        .catch(err=>{
          console.log(err);
        });
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload=fileInput.target.files.length>0?<Array<File>>fileInput.target.files:null;
    this.image_selected=this.filesToUpload?fileInput.target.files[0].name:'';
  }


}

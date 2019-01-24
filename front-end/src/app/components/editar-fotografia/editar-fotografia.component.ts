import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Route } from '@angular/router';
import { FotografiasService } from '../../services/fotografias.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-editar-fotografia',
  templateUrl: './editar-fotografia.component.html',
  styleUrls: ['./editar-fotografia.component.css']
})
export class EditarFotografiaComponent implements OnInit {
	public fotografia:any=[];
	public image_selected:string;
  public token:string;
  public url:string;
  public filesToUpload:Array<File>;
  public image_select:string;

  constructor(
  	private _route:ActivatedRoute,
  	private _serviceFotografias:FotografiasService,
    private _auth:AuthService,
    private _upload:UploadService,
    private _router:Router
    

  	) {
      this.token = this._auth.getToken();
      this.url = Global.url;
     }

  ngOnInit() {
  	this.getFotografia();
  }

  getFotografia(){
  	this._route.params.forEach((params:Params)=>{
  		this._serviceFotografias.getFotografiasById(params['id'])
		.then(response=>{
			this.fotografia = response.fotografia;
			this.image_selected = response.fotografia.imagen;
		})
		.catch(err=>{
			console.log(err);
		});
  	});
  }

  editar(){
    this._serviceFotografias.updateFotografias(this.fotografia.id, this.fotografia, this.token)
        .then(response=>{

          if (this.filesToUpload){
            this._upload.upload(this.url + 'upload-foto/' + response.fotografia.id, this.filesToUpload, this.token)
                .then(fotografias=>{
                  this._router.navigate(['/admin/list']);
                })
                .catch(err=>{
                  this._router.navigate(['/admin/list']);
                  console.log(err);
                });
          }else{
            this._router.navigate(['/admin/list']);
          }

        })
        .catch(err=>{
          console.log(err);
        });
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload=fileInput.target.files.length>0?<Array<File>>fileInput.target.files:null;
    this.image_select=this.filesToUpload?fileInput.target.files[0].name:'';
  }  

}

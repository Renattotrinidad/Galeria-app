import { Component, OnInit } from '@angular/core';
import { FotografiasService } from '../../services/fotografias.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	public token:string;
	public fotografias:any[];

  constructor(
  	private _serviceFotografias:FotografiasService,
  	private _auth:AuthService
  ) { 
  	this._auth.getToken();
  }

  ngOnInit() {
  	this.getFotografiasAdmin();
  }

  getFotografiasAdmin(){
  	this._serviceFotografias.getAllFotografias(this.token)
  	.then(response=>{
  		/*this.fotografias = response.fotografias;
      	console.log(this.fotografias);
  	})
  	.catch(error=>{
  		console.log(error);*/
      console.log(response);
  	});
  }

}

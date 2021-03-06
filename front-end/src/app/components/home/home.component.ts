import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Params } from '@angular/router';
import { Animations } from '../../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [Animations]
})

export class HomeComponent implements OnInit {
	public fotografias:any[];
  public url:string;
  public seleccion:any={};
  public verMas:boolean=false;
  public fotoActual:number=0;
  public direccion:string;
  public showThumbs:boolean=false;

  constructor(
    private _serviceFotografias: FotografiasService,
    private _route:ActivatedRoute

   ){
      this.url = Global.url;
    }

  ngOnInit() {
  	this.getFotografias();
  }

  getFotografias(){
  	this._serviceFotografias.getFotografias()
  	.then(response=>{
  		this.fotografias = response.fotografias;
      this._route.params.forEach((params:Params)=>{
        let num = params['num'];
        this.seleccion.fotografia = this.fotografias.find(result=>{
          return result.numero == num;
        });
        if (!this.seleccion.fotografia) {
          this.seleccion.fotografia = this.fotografias[0];
        }
        let next = this.fotografias.indexOf(this.seleccion.fotografia) + 1;
        let prev = this.fotografias.indexOf(this.seleccion.fotografia) - 1;

        this.seleccion.siguiente = next<this.fotografias.length?this.fotografias[next].numero:null;
        this.seleccion.anterior = prev>=0?this.fotografias[prev].numero:null;

        this.moverFotografia(this.seleccion.fotografia);
      });
  	})
  	.catch(error=>{
  		console.log(error);
  	});
  }

  moverFotografia(fotografia:any){
    if (fotografia.numero > this.fotoActual) {
      this.direccion="right";
    }else if (fotografia.numero < this.fotoActual) {
      this.direccion="left";
    }

    this.fotoActual = fotografia.numero;
  }
}

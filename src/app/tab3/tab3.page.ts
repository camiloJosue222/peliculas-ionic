import { ApplicationRef, Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

import { PushService } from '../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle []=[];
  generos: Genre []=[];
  favoritoGenero: any[]=[];

  mensajes: OSNotificationPayload[] = [];
  userId = '';

  constructor( private dataLocal : DataLocalService,
               private modalCtrl : ModalController,
               private movieService : MoviesService,
               public pushService : PushService,
               private applicationRef: ApplicationRef
               ) {}

   ngOnInit(){
    this.pushService.pushListener.subscribe( noti => {
      this.mensajes.unshift( noti );
      this.applicationRef.tick();
    })
  }

  async ionViewWillEnter(){
   this.peliculas = await this.dataLocal.cargarFavoritos();
   this.generos = await this.movieService.cargarGeneros();
   this.pelisPorGenero( this.generos, this.peliculas);
   this.mensajes = await this.pushService.getMensajes();
  //  event.target.complete();
   }

  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritoGenero = [];
    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli=>{
          return peli.genres.find(genre => genre.id === genero.id );
        })
      });
    });
    console.log(this.favoritoGenero);
    // this.modalCtrl.dismiss();
  }

  async borrarMensajes(){
    await this.pushService.borrarMensajes();
    this.mensajes = [];
  }

}

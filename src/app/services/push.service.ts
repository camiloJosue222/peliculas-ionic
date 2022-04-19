import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class PushService {



  mensajes: OSNotificationPayload []=[
    // {
    //   title: 'Titulo de la push',
    //   body: 'Este es el body',
    //   date: new Date()
    // }
  ];

  userId: string;

  pushListener = new EventEmitter<OSNotificationPayload>();
  alert: any;

  constructor(private oneSignal: OneSignal,
              private storage:Storage) {
                this.storage.create();
  this.cargarMensajes();              
               }

  async getMensajes(){
    await this.cargarMensajes();
    //operador express, vayan separados y se los trate como objetos nuevos.
    return [...this.mensajes];
  }               

  configuracionInicial(){
    this.oneSignal.startInit('fb17445a-db4f-4ccd-99b5-56b658fa0a37','532101596778');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe( data => {
      console.log('Notificacion recibida', data);
      // let msg = data.payload.body;
      // let title = data.payload.title;
      // this.showNotificacion(title,msg);
       this.notificacionRecibida(data);
    // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe( async (data) => {
      console.log('Notificacion abierta', data);
      // let msg = data.notification.payload.body;
      // let title = data.notification.payload.title;
      // this.showNotificacion(title,msg);
      await this.notificacionRecibida(data.notification);
    // do something when a notification is opened
    });

    this.oneSignal.getIds().then(info =>{
      this.userId = info.userId;
    });

    this.oneSignal.endInit();
  }

  showNotificacion(title, msg){
    this.alert.create({
      header: title,
      message: msg,
      buttons: [{
        text:"OK"
      }]
    }).then((ele)=>{
      ele.present();
    })
  }


   async notificacionRecibida(noti: OSNotification){
      
      await this.cargarMensajes();

      const payload = noti.payload;
      const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID);

      if( existePush ){
        return;
      }
      //si no existe lo inserto primero en mi arreglo

      //yo recibo la notificacion
      this.mensajes.unshift( payload);
      this.pushListener.emit( payload );
      await this.guardarMensajes();
    }

    guardarMensajes(){
      this.storage.set('mensajes',this.mensajes);
    }


    async cargarMensajes(){
      this.mensajes = await this.storage.get('mensajes') || [];
      return this.mensajes;
    }

    async borrarMensajes(){
      await this.storage.clear();
      this.mensajes = [];
      this.guardarMensajes();
    }

}

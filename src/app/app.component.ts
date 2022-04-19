import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushService } from './services/push.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar} from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private platform: Platform, 
               private splashScreen : SplashScreen,
               private statusbar : StatusBar,
               private pushService : PushService) 
               {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(()=>{
      this.statusbar.styleDefault();
      this.splashScreen.hide();
      this.pushService.configuracionInicial();
    });
  }
}

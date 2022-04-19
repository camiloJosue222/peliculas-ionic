import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar} from '@ionic-native/status-bar/ngx'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            HttpClientModule,
            IonicStorageModule.forRoot(),
            AppRoutingModule,
            ServiceWorkerModule.register('ngsw-worker.js', {
              enabled: environment.production,
              // Register the ServiceWorker as soon as the app is stable
              // or after 30 seconds (whichever comes first).
              registrationStrategy: 'registerWhenStable:30000'
            })],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal
    ,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

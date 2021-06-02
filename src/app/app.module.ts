import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxMixpanelModule } from 'ngx-mixpanel';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMixpanelModule
    .withOptions({
      token: 'e1e19aad60aea607df64b9f1983221cb',
        }),
        AppRoutingModule
        // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

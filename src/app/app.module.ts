import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppAuthModule} from './app-auth.module';
import { MainPageComponent } from './component/page/main-page/main-page.component';
import { ParticlesComponent } from './component/block/particles/particles.component';
import { PhotoGridComponent } from './component/block/photo-grid/photo-grid.component';
import { NameComponent } from './component/block/name/name.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ParticlesComponent,
    PhotoGridComponent,
    NameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

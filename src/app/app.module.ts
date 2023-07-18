import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CesiumDirective } from './cesium.directive';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumDirective,
    MapComponent
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

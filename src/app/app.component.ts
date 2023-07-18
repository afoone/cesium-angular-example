import { Component } from '@angular/core';
import { CesiumService } from './service/cesium.service';
import { Terrain, Viewer, createOsmBuildingsAsync } from 'cesium';
import * as Cesium from 'cesium';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<div><sita-map></sita-map></div>',
})
export class AppComponent {
  constructor(private cesiumService: CesiumService) {
    // should suscribe only if true and only once
    this.cesiumService.initialized
      .pipe(
        filter((v) => v),
        take(1),
        map(() => this.cesiumService.viewer)
      )
      .subscribe((viewer) => {
        console.log('AppComponent', { viewer });
        setTimeout(() => {
          viewer?.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              139.767052,
              35.681167,
              1000
            ),
          });
        }, 1000);
      });
  }
}

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
        // setTimeout(() => {
        //   viewer?.camera.flyTo({
        //     destination: Cesium.Cartesian3.fromDegrees(
        //       -0.33552442477884303,
        //       39.46515555109091,
        //       800
        //     ),
        //   });
        // }, 1000);
        // cesiumService.createPoint(
        //   39.46515555109091,
        //   -0.33552442477884303,100
        // )
        const flightRoute = [
          { lon: -0.375, lat: 39.469, alt: 100 }, // Valencia (Spain)
          { lon: -3.702, lat: 40.416, alt: 1000 }, // Madrid
          { lon: -21.942, lat: 64.146, alt: 10000 }, // Reykjavik
          { lon: -74.006, lat: 40.712, alt: 100 }, // New York
          // Add more points as needed
        ];
        cesiumService.drawRoute(flightRoute);
      });
  }
}

// ,

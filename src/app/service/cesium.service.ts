import { Injectable } from '@angular/core';
import { Terrain, Viewer, createOsmBuildingsAsync } from 'cesium';
import * as Cesium from 'cesium';
import { BehaviorSubject } from 'rxjs';
import { Route } from '../model/RoutePoint';

@Injectable({
  providedIn: 'root',
})
export class CesiumService {
  initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  viewer: Viewer | undefined;

  constructor() {}

  /**
   * Create a new Blank Cesium Viewer
   */
  createBlankViewer(element: Element): Viewer {
    this.viewer = new Viewer(element);
    this.initialized.next(true);
    return this.viewer;
  }

  /**
   * Create a new Cesium Viewer with a world terrain and osm buildings
   */
  async createViewerWithWorldTerrain(element: any): Promise<Viewer> {
    const _viewer = new Viewer(element, {
      terrain: Terrain.fromWorldTerrain(),
    });


    const osmBuildings = await createOsmBuildingsAsync();
    _viewer.scene.primitives.add(osmBuildings);
    this.viewer = _viewer;
    this.initialized.next(true);

    return this.viewer;
  }

  /**
   * Create a point entity on the map and goto it
   * @param lat Latitude
   * @param lon Longitude
   * @param height Height
   */
  createPoint(lat: number, lon: number, height: number): void {
    console.log('createPoint', {
      lat,
      lon,
      height,
    });
    const point = this.viewer?.entities.add({
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3,
      },
    });
    point && this.viewer?.zoomTo(point);
  }

  drawRoute(flightRoute: Route) {
    console.log('drawRoute', {
      flightRoute,
    });
    // Flatten and convert coordinates to Cartesian3 using Cesium
    const flatCoordinates = flightRoute.flatMap((point) =>
      Cesium.Cartesian3.fromDegreesArrayHeights([
        point.lon,
        point.lat,
        point.alt,
      ])
    );

    // Create a Polyline to draw the flight route
    const polyline = this.viewer?.entities.add({
      polyline: {
        positions: flatCoordinates,
        width: 5,
        material: Cesium.Color.BLUE,
      },
    });

    polyline && this.viewer?.zoomTo(polyline);
  }
}

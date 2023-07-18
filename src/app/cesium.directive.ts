import { Directive, ElementRef, OnInit } from '@angular/core';
import { Viewer, Terrain, createOsmBuildingsAsync } from 'cesium';
import { CesiumService } from './service/cesium.service';

@Directive({
  selector: '[appCesium]',
})
export class CesiumDirective implements OnInit {
  constructor(private el: ElementRef, private cesiumService: CesiumService) {}

  ngOnInit(): void {
    // const viewer = this.createBlankViewer();
    console.log('CesiumDirective', { el: this.el });
    this.cesiumService.createViewerWithWorldTerrain(this.el.nativeElement).then((_viewer) => {
      this.cesiumService.viewer = _viewer;
    });
  }


}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment';


import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = 'assets/release-butler.png';
  angularVersion:string;

  constructor() {
   this.angularVersion = environment.versions.angular;
  }

  ngOnInit() {}
}

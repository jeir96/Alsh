import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavService } from './nav.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems: INavData[];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private navService:NavService) {
    this.navService.navItems_Subject.subscribe(
      data=>
      {
        this.navItems = data;
      }
    )
  }
}

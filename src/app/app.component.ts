import { Component } from '@angular/core';
import { NgxMixpanelService } from 'ngx-mixpanel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private mixPanelService: NgxMixpanelService)
  {
    // this.mixPanelService.login('user@test.com');
    // this.mixPanelService.logout();
    // this.mixPanelService.eventRegister('My evento', {detalles: 'Es un evento personalizado' })
  }

  title = 'ngx-mixpanel-alpha';
}

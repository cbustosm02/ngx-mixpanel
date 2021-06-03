import { AfterViewInit, Component } from '@angular/core';
import { NgxMixpanelService } from 'ngx-mixpanel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ngx-mixpanel-alpha';
  constructor(private mixPanelService: NgxMixpanelService) {
    // this.mixPanelService.login('user@test.com');
    // this.mixPanelService.logout();
    // this.mixPanelService.eventRegister('My evento', {detalles: 'Es un evento personalizado' })
  }

  ngAfterViewInit() {
    this.mixPanelService.login('cesar.bustos@pragma.com.co');
  }

  setOrganizations() {

    let o = ['Org1']


      this.mixPanelService.registerGroups('organizations',o);
  }
  ejecutar(evento) {
alert('Un evento')
  }

}

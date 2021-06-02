import { Directive, ElementRef, HostListener, Inject, Injectable, InjectionToken, Input, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { NgxMixpanelService } from './ngx-mixpanel.service';

// interface MixPanelEvent {
//   evento: string;
//   propiedades: any;
// }


export const token = new InjectionToken<string>('token');

@Directive({
  selector: '[mixPanelEvent]',

})
export class NgxMixpanelDirective {
  @Input() mixPanelEvent = '';
  @Input() mixPanelProp = {};
  @Input() mixPaneluserEmail = '';
  private path = '';

  constructor(private el: ElementRef, 
    @Inject(token) private TOKEN: string,
    private mixpanelService: NgxMixpanelService
    ) {
      // el.nativeElement.style.backgroundColor = 'yellow';
      // console.log("Click elento")
      // const t = this.el.nativeElement as HTMLElement
      // t.setAttribute('style','background-color: red !important')



    console.log('Mix panel iniciado: ', TOKEN);
    mixpanel.init(TOKEN);
  }


  @HostListener('click', ['$event'])
  onClick(item) {

    // console.log('Evento click', item.view.location.pathname, item)
    this.path = item.view.location.pathname;

    switch (this.mixPanelEvent) {
      case 'login':
        this.login();
        break;

      case 'logout':
        this.logout();
        break;

      default:
        this.eventRegister();
        break;
    }

  }

  /**
   * Register events in Mixpanel.
   */
  eventRegister() {

    if (this.mixPanelEvent) {
      let p = this.mixPanelProp ? this.mixPanelProp : {};
      this.mixpanelService.eventRegister(this.mixPanelEvent, this.path, p)
    } else {
      console.error('No se puede registrar evento: undefined');
      
    }

  }

  /**
   * Register login event in Mixpanel.
   */
  login() {
      this.mixpanelService.login(this.mixPaneluserEmail)
  }

  /**
   * Register logout event in Mixpanel.
   *
   */
  logout() {
    this.mixpanelService.logout();
  }




   

}

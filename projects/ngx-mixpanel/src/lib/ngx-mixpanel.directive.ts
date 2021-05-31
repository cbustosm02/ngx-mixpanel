import { Directive, ElementRef, HostListener, Inject, Injectable, InjectionToken, Input, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';

interface MixPanelEvent {
  evento: string;
  propiedades: any;
}


export const token = new InjectionToken<string>('token');

@Directive({
  selector: '[mixPanelEvent]',

})
export class NgxMixpanelDirective {
  @Input() mixPanelEvent: MixPanelEvent = {evento: '',propiedades: {} };
  @Input() userEmail = '';

  constructor(private el: ElementRef, 
    @Inject(token) private TOKEN: string
    ) {
      // el.nativeElement.style.backgroundColor = 'yellow';
      // console.log("Click elento")
      // const t = this.el.nativeElement as HTMLElement
      // t.setAttribute('style','background-color: red !important')



    console.log('Mix panel iniciado: ', TOKEN);
    mixpanel.init(TOKEN);
  }


  @HostListener('click', ['$event.target'])
  onClick(btn) {

    console.log('Evento click')

    switch (this.mixPanelEvent.evento) {
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

    if (this.mixPanelEvent.evento) {
      let p = this.mixPanelEvent.propiedades ? this.mixPanelEvent.propiedades : {};
      mixpanel.track(this.mixPanelEvent.evento, p)
      console.log("Registrando evento: ", this.mixPanelEvent.evento)
    } else {
      console.error('No se puede registrar evento: undefined');
      
    }

  }

  /**
   * Register login event in Mixpanel.
   */
  login() {

    if (this.userEmail) {
      mixpanel.identify(this.userEmail);
      mixpanel.track('$session_start', {
        'source': "Click button",
      });
      console.log("Registrando evento: login")
    } else {
      console.error('userEmail not provided in mixpanel login event');

    }
  }

  /**
   * Register logout event in Mixpanel.
   *
   */
  logout() {
    mixpanel.track('$session_end');
    console.log("Registrando evento: logout")
  }




   

}

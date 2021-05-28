import { Directive, ElementRef, HostListener, Inject, InjectionToken, Input, ModuleWithProviders } from '@angular/core';
import mixpanel from 'mixpanel-browser';

interface MixPanelEvent {
  evento: string;
  propiedades: any;
}

export const token = new InjectionToken<string>('TOKEN');
@Directive({
  selector: '[mixPanelEvent]',
  // providers: [{provide: token, useValue: 'TOKEN'},]

})
export class NgxMixpanelDirective {
  @Input() mixPanelEvent: MixPanelEvent = {evento: '',propiedades: {} };
  @Input() userEmail = '';

  constructor(private el: ElementRef, @Inject(token) private TOKEN: string) {
    console.log('Mix panel iniciado');
    mixpanel.init(TOKEN);
  }

  @HostListener('click', ['$event.target'])
  onClick() {
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
    mixpanel.track(this.mixPanelEvent.evento, this.mixPanelEvent.propiedades)
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
  }




   

}

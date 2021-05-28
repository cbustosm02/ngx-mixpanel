import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class NgxMixpanelService {

  constructor() { }

  /**
   * Register events in Mixpanel.
   * @param evento A event name.
   * @param propiedades An optional object that contain item {'source': 'Click', 'otherParam': 'value'}
   * - evento name.
   * - propiedades Object.
   *
   */
  eventRegister(evento: string, propiedades?: any) {
    if (!propiedades) propiedades = {};
    mixpanel.track(evento, propiedades)
  }

  /**
   * Register login event in Mixpanel.
   * @param userEmail A email user used as its identifier.
   * - userEmail.
   *
   */
  login(userEmail: string) {

    if (userEmail) {
      mixpanel.identify(userEmail);
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

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
   * @param path path from where the event is executed.
   * @param propiedades An optional object that contain items {'source': 'Click', 'otherParam': 'value'}
   *
   */
  eventRegister(evento: string, path: string, propiedades?: any) {
    if (!propiedades) propiedades = {};
    if (typeof evento != 'string') console.error('El evento que proporcionaste: ', evento ,` no es un string`); //throw new Error('Event: '+ evento + ` type is not string`)
    if (typeof path != 'string') console.error('La ruta (path) que proporcionaste: ', path ,` no es un string`);
    propiedades = {...propiedades, path: path};
    mixpanel.track(evento, propiedades)
    console.log("Registrando evento: ", evento)
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
      console.log("Registrando evento: login")
    } else {
      console.error('El atributo userEmail con su respectivo valor no fue proporcionado para registrar el evento login');

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

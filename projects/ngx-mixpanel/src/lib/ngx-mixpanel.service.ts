import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class NgxMixpanelService {

  private orderASC = (a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

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
    if (this.validateType([evento, path], ['string', 'string'], ['El evento', 'La ruta(path)'])) {
      propiedades = { ...propiedades, path: path };
      mixpanel.track(evento, propiedades)
      console.log("Registrando evento: ", evento)
    }
  }

  /**
 * Register global properties to all events in Mixpanel. (The value is rewritten with each record)
 * @param propiedades An object that contain items {'source': 'Click', 'otherParam': 'value'}
 *
 */
  registerGlobalProperties(propiedades: any) {
    mixpanel.register(propiedades);
  }

  /**
   * Register login event in Mixpanel.
   * @param userEmail A email user used as its identifier.
   * - userEmail.
   *
   */
  login(userEmail: string) {

    if(this.validateType([userEmail], ['string'], ['El correo o identificador'])) {
      mixpanel.identify(userEmail);
      mixpanel.track('$session_start', {
        'source': "Click button"
      });
      mixpanel.people.set({$email: userEmail});
      console.log("Registrando evento: login")
    } else {
      console.error('El atributo userEmail con su respectivo valor no fue proporcionado correctamente para registrar el evento login');
    }
  }

  /**
   * Register logout event in Mixpanel.
   *
   */
  logout() {
    mixpanel.track('$session_end');
    console.log("Registrando evento: logout")
    mixpanel.reset();
  }

  /**
    * Register organizations to the user logged in.
    * @param organizations A organizations list.
    * - [ 'Org 1', 'Org 2', ... , 'Org n']
    *
    */
  registerGroups(nombre:string, listaPropiedades: string[]) {
    if (this.validateType([nombre, listaPropiedades], ['string', 'array'], ['El nombre', 'La lista de propiedades'])) {

      mixpanel.set_group(nombre, listaPropiedades);
      console.log(nombre,' agregadas al usuario.')
    }
  }

  updateUserProperties(object: any) {
    if (this.validateType([object],['object'], ['El objeto de propiedades'])) {
      mixpanel.people.set(object);
      console.log("Información del usuario actualizada")
    }
  }

  // /**
  //     * Remove organizations registered to the user logged in.
  //     * @param organizations A organizations list.
  //     * - [ 'Org 1', 'Org 2', ... , 'Org n']
  //     *
  //     */
  //   removeOrganizations(organizations: string[]) {

  //   }

  /**
       * It calculates the time in which this method is called, until the indicated event is executed.
       * 
       * @param evento Event name.
       * 
       */
  eventStartTime(evento: string) {
    if (this.validateType([evento], ['string'], ['El evento'])) {
      mixpanel.time_event(evento);
      console.log('Inicia contador para evento: ', evento)
    }
  }

      /**
       * It validate the type of the value.
       * 
       * @param value Array values.
       * @param type Array types.
       * - array
       * - string
       * - boolean
       * - number
       * - object
       * - bigint
       * - function
       * - symbol
       * - undefined
       * @param name Arrays names.
       * 
       */
  private validateType(value: any[], type: string[], name: string[]): boolean {

    try {
      if (value.length === type.length) {

        for (let index = 0; index < value.length; index++) {
          if (!value[index]) {
            console.error(name[index], ' ' , value[index], ' No es válido.')
            return false;
          } else if (type[index] === 'array') {
            if (!Array.isArray(value[index])) {
              console.error(name[index], ' que proporcionaste: ', value[index], ' No es de tipo ', type[index]);
              return false;
            }
          } else if (typeof value[index] != type[index]) {
            console.error(name[index], ' que proporcionaste: ', value[index], ' No es de tipo ', type[index]);
            return false;
          }
        }

        return true;

      } else {
        console.error('No proporcionaste la misma cantidad de valores para todos los array');
      }
    } catch (error) {
      console.error(error);

    }
  }
}

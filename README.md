# Ngx-mixpanel

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Compatibilidad

  Angular 10+

## Instalación

`npm i ngx-mixpanel --save`

`npm i mixpanel-browser --save`

## Agregar al app.module de tu proyecto

Remplazar `Token project from Mixpanel` por el token que se genera al registrarte en mixpanel y crear un proyecto allí.

    import { NgxMixpanelModule } from 'ngx-mixpanel';
  
    @NgModule({
    ...
      import: [
      NgxMixpanelModule.withOptions({
      token: 'Token project from Mixpanel',
        }),
      ]
    ...
    })
  
 ## Uso de la directiva dentro del proyecto
  
Cuando desees capturar el evento de una etiqueta de html cuando le hagan click (en su frencuencia son botones pero puede ser cualquiera) solo agrega la directiva `mixPanelEvent` el cual recibe un objeto:

  
  `mixPanelEvent`: 'Nombre del evento que quiereas restrear, tú le pones el nombre',
    
  `mixPanelProp`: { } //Un objeto opcional que puedes agregarle la cantidad de atributos que desees, los cuales puedan ayudar a describir mejor la acción del evento
    
     
  ### Ejemplo
     
     <button mixPanelEvent="My evento"  [mixPanelProp]="{'click': 'usuario presionó un botón'}"> Esto es un botón </button>
  
## Eventos especiales
    
Hay dos eventos únicos dentro de mix panel, los cuales determinan cuando un usuario inicia sesión en la herramienta  `login` o cuando el usuario cierra su sesión  `logout`, esto con el fin de realizar las medicionas de uso de su proyecto.
  
    
 ### Ejemplo  `login`

 Al enviar el evento con el nombre `login` se requiere un atributo adiciona el cual es `userEmail` el cual debes proporcionar el correo del usuario o en su defecto un identificador de usuario el cual deberás usar de aquí en adelante.
 
    <button mixPanelEvent="login" [mixPanelProp]="{'click': 'usuario ingresó a la herramienta'}" userEmail="usuario@email.com"> Ingresar </button>
     
 ### Ejemplo  `logout`
 
    <button mixPanelEvent="logout" [mixPanelProp]="{'click': 'usuario cerró sesión'}"> Salir </button>


## Servicio

  En caso de que necesites usar las funciones de tracking de mixpanel dentro de tu componente en su typescript puedes injertar el siguiente servicio al constructor de tu componente.

    import { NgxMixpanelService } from 'ngx-mixpanel';

    ...
    constructor(private mixPanelService: NgxMixpanelService) {}

### El servicio contiene los siguiente métodos:

   `login`
   
   Recuerda que el evento de login recibe el correo del usuario, o en su defecto un identificador único.

    this.mixPanelService.login('user@test.com');
  
   `logout`

    this.mixPanelService.logout();

   `eventRegister`
   
   Recibe el nombre del evento y otro parámetro opcional (un Objeto) que puedes agregarle la cantidad de atributos, los cuales puedan ayudar a describir mejor la acción del evento.

    this.mixPanelService.eventRegister('My evento', {detalles: 'Es un evento personalizado' })

     
    
## Mixpanel

  Ahora al capturar eventos podrás diseñar dashboards con los reportes que necesites, para más información del uso de Mixpanel puedes visitar: https://developer.mixpanel.com/


## Ayuda

Para obtener información del uso de angular use `ng help` o dirígete al enlace [Angular CLI Overview and Command Reference](https://angular.io/cli) web.

## Autor
`César Bustos`

 2021
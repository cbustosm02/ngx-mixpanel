import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxMixpanelDirective, token } from './ngx-mixpanel.directive';



@NgModule({
  providers: [{provide: token, useValue: 'TOKEN'},],
  declarations: [
    NgxMixpanelDirective
  ],
  imports: [
  ],
  exports: [
    NgxMixpanelDirective
  ]
})
export class NgxMixpanelModule { 


  /**
   * Configure maxPanel Token Project.
   * @param options An object that must specify
   * Token name
   * - TOKEN name default is `token`.
   *
   */
   static withOptions(options: {
    token: string
  }): ModuleWithProviders<NgxMixpanelDirective> {
    return {
      ngModule: NgxMixpanelDirective,
      providers: [
        options.token ? {provide: token, useValue: options.token} : [],
      ],
    };
  }
}

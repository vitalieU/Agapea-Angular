import { NgModule, Optional, SkipSelf } from '@angular/core';

import { STORAGE_SERVICE } from '../../servicios/injecitontokenstorage';
import { SubjectstorageService } from '../../servicios/subjectstorage.service';

@NgModule({
  providers: [
    {provide:STORAGE_SERVICE, useClass:SubjectstorageService}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
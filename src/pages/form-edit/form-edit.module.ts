import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormEditPage } from './form-edit';

@NgModule({
  declarations: [
    FormEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FormEditPage),
  ],
})
export class FormEditPageModule {}

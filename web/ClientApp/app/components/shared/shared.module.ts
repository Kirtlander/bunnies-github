import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LikeComponent } from './like/like.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LikeComponent
  ],
  declarations: [LikeComponent]
})
export class SharedModule { }

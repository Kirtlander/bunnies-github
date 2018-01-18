import { RouterModule } from '@angular/router';
import { LikeComponent } from '../shared/like/like.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BunnyListComponent } from './bunny-list/bunny-list.component';
import { FilterActiveBunniesPipe } from './filter-active-bunnies.pipe';
import { BunnyOrderComponent } from './bunny-order/bunny-order.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [BunnyListComponent, FilterActiveBunniesPipe, BunnyOrderComponent],
  providers: [  ]
})
export class BunnyModule { }

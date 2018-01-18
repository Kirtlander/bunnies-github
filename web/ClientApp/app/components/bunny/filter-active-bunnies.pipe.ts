import { Pipe, PipeTransform } from '@angular/core';
import { IBunny } from './bunny.model';

@Pipe({
  name: 'filterActiveBunnies'
})
export class FilterActiveBunniesPipe implements PipeTransform {

  transform(bunnies: IBunny[], args?: any): IBunny[] {
    return bunnies && bunnies.filter(bunny => !bunny.hidden);
  }

}

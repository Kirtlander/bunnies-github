import { IBunny } from '../bunny.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-bunny-list',
  templateUrl: './bunny-list.component.html',
  styleUrls: ['./bunny-list.component.css']
})
export class BunnyListComponent implements OnInit {

  errorMessage = '';
  bunnies: IBunny[];

  constructor(private dataService: DataService) { }


  ngOnInit() {
      this.dataService.getBunnies()
        .subscribe(bunnies => {
          this.bunnies = this.updateIsMostPopular(bunnies);
        },
        error => this.errorMessage = <any>error);
  }

  onLike(bunny: IBunny, likes: number): void {
    this.dataService.likeBunny(bunny.id);
  }

  onRemove(bunnyToRemove: IBunny, event: any): void {
    this.dataService.hideBunny(bunnyToRemove.id);
  }

  updateIsMostPopular(bunnies: IBunny[]): IBunny[] {
    const mostPopularBunny = bunnies.reduce((mostPopular, bunny) => {
      mostPopular = !bunny.hidden && bunny.likes > mostPopular.likes ? bunny : mostPopular;
      return mostPopular;
    }, { likes: 0 });
    bunnies.forEach(bunny2 => bunny2.isMostPopular = bunny2 === mostPopularBunny);
    return bunnies;
  }

}

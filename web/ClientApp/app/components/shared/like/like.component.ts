import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() likes: number;

  @Output() incremented: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.likes++;
    this.incremented.emit(this.likes);
  }

}

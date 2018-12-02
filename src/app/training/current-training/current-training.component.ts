import {Component, OnInit} from '@angular/core';

@Component(
  {
    selector: 'app-current-training',
    templateUrl: './current-training.component.html', styleUrls: ['./current-training.component.css']})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      if (this.progress < 100) {
        this.progress = this.progress + 1;
      }

    }, 100);
  }

}
import {Component, OnInit, EventEmitter, Output} from '@angular/core';

export interface Exercise {
  value: string;
  viewValue: string;
}

@Component({selector: 'app-new-training', templateUrl: './new-training.component.html', styleUrls: ['./new-training.component.css']})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  exercises: Exercise[] = [
    {
      value: 'crunches',
      viewValue: 'Crunches'
    },
    {
      value: 'touch-toes',
      viewValue: 'Touch toes'
    },
    {
      value: 'side-lunges',
      viewValue: 'Side lunges'
    },
    {
      value: 'burpees',
      viewValue: 'Burpees'
    },
  ];
  constructor() {}

  ngOnInit() {}

  onStartTraining(){
    this.trainingStart.emit();
  }

}

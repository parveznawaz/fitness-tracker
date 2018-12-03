import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  
  private availableExercises: Exercise[] = [
    {
      id: "crunches",
      name: "Crunches",
      duration: 30,
      calories: 80
    },
    {
      id: "touch-toes",
      name: "Touch toes",
      duration: 180,
      calories: 190
    },
    {
      id: "side-lunges",
      name: "Side lunges",
      duration: 120,
      calories: 50
    },
    {
      id: "burpees",
      name: "Burpees",
      duration: 60,
      calories: 80
    }
  ];

  private runningExercise: Exercise;

  getAvailableExercises(){
    return this.availableExercises.slice();
  }

  startExercise(selecteId: string) {
    this.runningExercise = this.availableExercises.find(ex=> ex.id===selecteId);
    this.exerciseChanged.next({...this.runningExercise});
  }
}

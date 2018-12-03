import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

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
      duration: 18,
      calories: 190
    },
    {
      id: "side-lunges",
      name: "Side lunges",
      duration: 12,
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
  private exercises: Exercise[]=[];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selecteId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selecteId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise () {
    return { ...this.runningExercise };
  };

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration*(progress/100),
      calories: this.runningExercise.calories*(progress/100),
      date: new Date(),
      state: "cancelled"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getCompletedOrCancelledExercises(): Exercise[] {
    return this.exercises.slice();
  }
  
}

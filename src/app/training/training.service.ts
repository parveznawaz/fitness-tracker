import { Exercise } from "./exercise.model";

export class TrainingService {
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

  getAvailableExercises(){
    return this.availableExercises.slice();
  }
}

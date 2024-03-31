export type Person = {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  physicalActivityCoefficient: PhysicalActivityCoefficient;
};

export enum Gender {
  Male,
  Female,
}

export enum PhysicalActivityCoefficient {
  PassiveLifestyle = 1.2,
  LightExercises = 1.375,
  ModerateExercises = 1.55,
  HeavyExercisesOnceADay = 1.75,
  HeavyExercisesConstantly = 1.9,
}

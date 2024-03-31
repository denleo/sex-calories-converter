import { Gender, Person } from "./Person";

export class CaloriesCalculator {
  public static LatteCaloriesPerMl = 0.423;

  private static MaleSexCoefficient = 4.2;
  private static FemaleSexCoefficient = 3.1;
  private static MET = 7; // метаболический эквивалент бега трусцой

  private readonly _person: Person;

  constructor(person: Person) {
    this._person = person;
  }

  getSexCalories(minutes: number): number {
    return this._person.gender === Gender.Male
      ? minutes * CaloriesCalculator.MaleSexCoefficient
      : minutes * CaloriesCalculator.FemaleSexCoefficient;
  }

  getRunCaloriesPerMinute(): number {
    return (CaloriesCalculator.MET * this._person.weight) / 60;
  }

  // базовый уровень метаболизма
  getBMR(): number {
    return this._person.gender === Gender.Male
      ? 66 +
          13.7 * this._person.weight +
          5 * this._person.height -
          6.8 * this._person.age
      : 655 +
          9.6 * this._person.weight +
          1.8 * this._person.height -
          4.7 * this._person.age;
  }

  // активный уровень метаболизма
  getAMR(): number {
    return this.getBMR() * this._person.physicalActivityCoefficient;
  }

  getSleepCaloriesPerMinute(): number {
    return this.getBMR() / 24 / 60;
  }
}

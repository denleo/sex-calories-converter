import { useState } from "react";
import Card from "../../components/card/Card";
import PersonForm, {
  PersonFormState,
} from "../../components/person-form/PersonForm";
import Statistics, {
  StatisticsProps,
} from "../../components/statistics/Statistics";
import { CaloriesCalculator } from "../../services/CaloriesCalculator";
import { Gender, PhysicalActivityCoefficient } from "../../services/Person";
import "./App.scss";

const initialFormState: PersonFormState = {
  person: {
    age: 21,
    gender: Gender.Male,
    weight: 75,
    height: 180,
    physicalActivityCoefficient: PhysicalActivityCoefficient.ModerateExercises,
  },
  sexTime: 15,
};

type AppState = {
  personInfo: PersonFormState;
  statistics?: StatisticsProps;
};

function App() {
  const [state, setState] = useState<AppState>({
    personInfo: initialFormState,
    statistics: undefined,
  });

  function handlePersonFormSubmit(data: PersonFormState) {
    const calcService = new CaloriesCalculator(data.person);
    const sexCalories = Math.round(calcService.getSexCalories(data.sexTime));

    const stats: StatisticsProps = {
      bmr: Math.round(calcService.getBMR()),
      amr: Math.round(calcService.getAMR()),
      sexCalories: sexCalories,
      sexTime: data.sexTime,
      runningTimeEquivalent: Math.round(
        sexCalories / calcService.getRunCaloriesPerMinute()
      ),
      sleepTimeEquivalent: Math.round(
        sexCalories / calcService.getSleepCaloriesPerMinute()
      ),
      coffeeEquivalent: Math.floor(
        sexCalories / CaloriesCalculator.LatteCaloriesPerMl
      ),
    };

    setState({
      personInfo: data,
      statistics: stats,
    });
  }

  function handleStatisticsClose() {
    setState((state) => ({
      ...state,
      statistics: undefined,
    }));
  }

  return (
    <main className="app-container">
      <Card>
        {state.statistics ? (
          <Statistics
            data={state.statistics!}
            onClose={handleStatisticsClose}
          />
        ) : (
          <PersonForm
            onSubmit={handlePersonFormSubmit}
            intitialFormState={state.personInfo}
          />
        )}
      </Card>
    </main>
  );
}

export default App;

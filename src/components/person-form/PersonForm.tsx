import "./PersonForm.scss";
import { Button, Divider, InputNumber, Radio, Select } from "antd";
import {
  Gender,
  Person,
  PhysicalActivityCoefficient,
} from "../../services/Person";
import {
  HeartTwoTone,
  ManOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const KFAs = [
  {
    label: "Cидячий образ жизни",
    value: PhysicalActivityCoefficient.PassiveLifestyle,
  },
  {
    label: "Легкие физические упражнения один-три дня в неделю",
    value: PhysicalActivityCoefficient.LightExercises,
  },
  {
    label: "Умеренные физические упражнения шесть-семь дней в неделю",
    value: PhysicalActivityCoefficient.ModerateExercises,
  },
  {
    label: "Тяжелые физические упражнения ежедневно или дважды в день",
    value: PhysicalActivityCoefficient.HeavyExercisesOnceADay,
  },
  {
    label: "Тяжелые физические упражнения два или более раза в день",
    value: PhysicalActivityCoefficient.HeavyExercisesConstantly,
  },
];

export type PersonFormState = {
  person: Person;
  sexTime: number;
};

export type PersonFormProps = {
  intitialFormState: PersonFormState;
  onSubmit: (data: PersonFormState) => void;
};

function PersonForm({ onSubmit, intitialFormState }: PersonFormProps) {
  const [formState, setFormState] =
    useState<PersonFormState>(intitialFormState);

  return (
    <form className="person-form">
      <section className="person-form__section">
        <Divider style={{ fontSize: "1.8rem", margin: "0" }}>
          <h2 className="person-form__section-title">
            Информация <UserOutlined style={{ color: "var(--blue-900)" }} />
          </h2>
        </Divider>
        <div className="person-form__inputs">
          <div className="person-form__gender">
            <Radio.Group
              buttonStyle="solid"
              value={formState.person.gender}
              onChange={(e) =>
                setFormState((state) => ({
                  sexTime: state.sexTime,
                  person: { ...state.person, gender: e.target.value },
                }))
              }
            >
              <Radio.Button value={Gender.Male}>
                Мужчина <ManOutlined />
              </Radio.Button>
              <Radio.Button value={Gender.Female}>
                Женщина <WomanOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="person-form__activity">
            <label htmlFor="kfa" className="person-form__label">
              Уровень физической активности:
            </label>
            <Select
              id="kfa"
              style={{ width: "22rem" }}
              value={formState.person.physicalActivityCoefficient}
              options={KFAs}
              popupMatchSelectWidth={false}
              onChange={(x) =>
                setFormState((state) => ({
                  sexTime: state.sexTime,
                  person: {
                    ...state.person,
                    physicalActivityCoefficient: x,
                  },
                }))
              }
            />
          </div>
          <div className="person-form__age">
            <label htmlFor="age" className="person-form__label">
              Возраст:
            </label>
            <InputNumber
              id="age"
              min={16}
              max={50}
              value={formState.person.age}
              onChange={(x) =>
                setFormState((state) => ({
                  sexTime: state.sexTime,
                  person: { ...state.person, age: x! },
                }))
              }
            />
          </div>
          <div className="person-form__weight">
            <label htmlFor="weight" className="person-form__label">
              Вес (кг):
            </label>
            <InputNumber
              id="weight"
              min={40}
              max={200}
              value={formState.person.weight}
              onChange={(x) =>
                setFormState((state) => ({
                  sexTime: state.sexTime,
                  person: { ...state.person, weight: x! },
                }))
              }
            />
          </div>
          <div className="person-form__height">
            <label htmlFor="height" className="person-form__label">
              Рост (см):
            </label>
            <InputNumber
              id="height"
              min={120}
              max={250}
              value={formState.person.height}
              onChange={(x) =>
                setFormState((state) => ({
                  sexTime: state.sexTime,
                  person: { ...state.person, height: x! },
                }))
              }
            />
          </div>
        </div>
      </section>
      <section className="person-form__section">
        <Divider style={{ fontSize: "1.8rem", margin: "0" }}>
          <h2 className="person-form__section-title">
            <HeartTwoTone
              twoToneColor={["var(--pink-800)", "var(--red-400)"]}
              className="person-form__heart"
            />
            <HeartTwoTone
              twoToneColor={["var(--pink-800)", "var(--red-400)"]}
              className="person-form__heart"
            />
            <HeartTwoTone
              twoToneColor={["var(--pink-800)", "var(--red-400)"]}
              className="person-form__heart"
            />
          </h2>
        </Divider>
        <div className="person-form person-form_flex-row person-form_gap-1">
          <label htmlFor="sexTime" className="person-form__label">
            Длительность, в минутах:
          </label>
          <InputNumber
            id="sexTime"
            style={{ width: "6rem" }}
            min={0}
            max={120}
            value={formState.sexTime}
            onChange={(x) =>
              setFormState((state) => ({ ...state, sexTime: x! }))
            }
          />
        </div>
      </section>
      <footer className="person-form__footer person-form_flex-row">
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(formState);
          }}
        >
          Рассчитать
        </Button>
      </footer>
    </form>
  );
}

export default PersonForm;

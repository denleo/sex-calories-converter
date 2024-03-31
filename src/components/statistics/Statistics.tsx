import { Divider, Statistic, Modal, Button } from "antd";
import "./Statistics.scss";
import {
  ClockCircleTwoTone,
  InfoCircleTwoTone,
  RestTwoTone,
  SkinTwoTone,
} from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";

const chartOptions: ApexOptions = {
  chart: {
    height: 400,
    type: "radialBar",
    animations: {
      enabled: true,
      speed: 2000,
      easing: "linear",
    },
  },
  colors: ["var(--teal-300)", "var(--yellow-300)", "var(--red-300)"],
  plotOptions: {
    radialBar: {
      dataLabels: {
        value: {
          fontSize: "1.8rem",
          color: "var(--grey-800)",
        },
        total: {
          fontSize: "1.8rem",
          color: "var(--teal-300)",
          show: true,
          label: "AMR",
        },
      },
    },
  },
  labels: ["AMR", "BMR", "🥰🥰🥰"],
};

const showInfoModal = () => {
  Modal.info({
    width: 800,
    type: "info",
    closable: true,
    footer: null,
    title: "Используемая терминология",
    content: (
      <div>
        <p>
          <b style={{ color: "var(--yellow-300)" }}>BMR</b> - базовый уровень
          метаболизма, минимальная энергия, необходимая организму для
          функционирования.
        </p>
        <p>
          <b style={{ color: "var(--teal-300)" }}>AMR</b> - активный метаболизм,
          учитывающий показатель физической активности человека, показывает
          какое общее количество калорий понадобится для поддержания веса в
          день.
        </p>
      </div>
    ),
  });
};

export type StatisticsProps = {
  sexCalories: number;
  sexTime: number;
  runningTimeEquivalent: number;
  sleepTimeEquivalent: number;
  coffeeEquivalent: number;
  bmr: number;
  amr: number;
};

function Statistics({
  data,
  onClose,
}: {
  data: StatisticsProps;
  onClose: () => void;
}) {
  const chartData = useMemo(() => {
    const series: ApexNonAxisChartSeries = [
      100,
      +((data.bmr / data.amr) * 100).toFixed(1),
      +((data.sexCalories / data.amr) * 100).toFixed(1),
    ];

    chartOptions.plotOptions!.radialBar!.dataLabels!.total!.formatter = () =>
      `${data.amr} ккал`;

    return {
      series,
      chartOptions,
    };
  }, [data.amr, data.bmr, data.sexCalories]);

  return (
    <article className="statistics">
      <h1 className="statistics__title">{`За ${data.sexTime} мин секса организм потратил ${data.sexCalories} ккал! 🥰`}</h1>
      <section className="statistics__content">
        <Divider>
          <h2 className="statistics__title">Что эквивалентно:</h2>
        </Divider>
        <div className="statistics__equivalents">
          <Statistic
            valueStyle={{ fontSize: "2.2rem", color: "var(--grey-800)" }}
            title="Минутам бега:"
            value={data.runningTimeEquivalent}
            prefix={
              <SkinTwoTone
                twoToneColor={["var(--grey-800)", "var(--red-100)"]}
              />
            }
            suffix="мин"
          />
          <Statistic
            valueStyle={{ fontSize: "2.2rem", color: "var(--grey-800)" }}
            title="Минутам сна:"
            value={data.sleepTimeEquivalent}
            prefix={
              <ClockCircleTwoTone
                twoToneColor={["var(--grey-800)", "var(--yellow-100)"]}
              />
            }
            suffix="мин"
          />
          <Statistic
            valueStyle={{ fontSize: "2.2rem", color: "var(--grey-800)" }}
            title="Вкусному латте:"
            value={data.coffeeEquivalent}
            prefix={
              <RestTwoTone
                twoToneColor={["var(--grey-800)", "var(--teal-300)"]}
              />
            }
            suffix="мл"
          />
        </div>
        <div className="statistics__chart">
          <ReactApexChart
            options={chartData.chartOptions}
            series={chartData.series}
            type="radialBar"
            height={350}
          />
        </div>
      </section>
      <footer className="statistics__footer">
        <Button type="dashed" shape="round" onClick={() => onClose()}>
          Назад
        </Button>
        <span className="statistics__link" onClick={() => showInfoModal()}>
          термины <InfoCircleTwoTone />
        </span>
      </footer>
    </article>
  );
}

export default Statistics;

import { AssetsInterface } from "../commons/types.tsx";
import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./Assets.module.css";
import { Col, Row } from "antd";

interface IProps {
  assets: AssetsInterface[];
}

const options: Highcharts.Options = {
  title: {
    text: "Health History",
  },
  subtitle: {
    // text: {asset.name}
  },
  yAxis: {
    title: { text: "Health" },
    categories: [
      "Unplanned Stop",
      "Planned Stop",
      "In Alert",
      "In Downtime",
      "In Operation",
    ],
  },
  xAxis: {
    title: { text: "Date UTC" },
    categories: [
      "2022/12/01 00:00:00",
      "2022/12-08 00:00:00",
      "2022/12/15 00:00:00",
      "2022/12/22 00:00:00",
      "2022/12/29 00:00:00",
    ],
  },
  series: [
    {
      showInLegend: false,
      type: "spline",
      data: [4, 3, 4, 2, 0],
    },
  ],
  tooltip: {
    headerFormat: "<b>Health</b><br/>",
  },
  chart: {
    width: 500,
    height: 300,
  },
};

function Assets({ assets }: IProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <>
      <h2>Assets</h2>
      {!!assets.length &&
        assets.map((asset) => (
          <div key={asset.id}>
            <Row>
              <Col span={12}>
                <h3>
                  {asset.name} - {asset.model}
                </h3>
              </Col>
              <Col span={3} offset={9}>
                <p>
                  {asset.status} - {asset.healthscore}%
                </p>
              </Col>
            </Row>
            <p>Company: {asset.companyId}</p>
            <p>Unit: {asset.unitId}</p>
            <img src={asset.image} alt={asset.name} className={styles.image} />
            {/* Gráfico com histórico de saúde do equipamento, e mostrando o nível de saúde atual no horário que puxou da api */}
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              ref={chartComponentRef}
            />
            <div>
              Specifications:{" "}
              <ul>
                {Object.keys(asset.specifications).map((key) => (
                  <li key={key}>
                    {key}: {asset.specifications[key] || "N/A"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              Sensors:{" "}
              <ul>
                {asset.sensors.map((sensor) => (
                  <li key={sensor}>{sensor}</li>
                ))}
              </ul>
            </div>
            <div>
              Metrics:{" "}
              <ul>
                {Object.keys(asset.metrics).map((key) => (
                  <li key={key}>
                    {key}: {asset.metrics[key]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </>
  );
}

export default Assets;

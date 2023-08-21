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
    text: "My chart",
  },
  series: [
    {
      type: "line",
      data: [1, 2, 3],
    },
  ],
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
                  {asset.status} - {asset.healthscore}/100
                </p>
              </Col>
            </Row>
            <p>Company: {asset.companyId}</p>
            <p>Unit: {asset.unitId}</p>
            <img src={asset.image} alt={asset.name} className={styles.image} />
            <HighchartsReact
              className={styles.highchart}
              highcharts={Highcharts}
              options={options}
              ref={chartComponentRef}
            />
            <p>
              Specifications:{" "}
              <ul>
                {Object.keys(asset.specifications).map((key) => (
                  <li>
                    {key}: {asset.specifications[key] || "N/A"}
                  </li>
                ))}
              </ul>
            </p>
            <p>
              Sensors:{" "}
              <ul>
                {asset.sensors.map((sensor) => (
                  <li>{sensor}</li>
                ))}
              </ul>
            </p>
            <p>
              Metrics:{" "}
              <ul>
                {Object.keys(asset.metrics).map((key) => (
                  <li>
                    {key}: {asset.metrics[key]}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        ))}
    </>
  );
}

export default Assets;

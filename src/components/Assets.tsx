import { AssetsInterface } from "../commons/types.tsx";
import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./Assets.module.css";
import { Badge, Tooltip } from "antd";

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
    <div className={styles.container}>
      <h2>Assets</h2>
      {!!assets.length &&
        assets.map((asset) => (
          <div key={asset.id} className={styles.singleAssetContainer}>
            <div className={styles.assetHeader}>
              <div>
                <h3>
                  {asset.name} | model: {asset.model}
                </h3>
              </div>
              <div>
                <Tooltip placement="top" title="Status">
                  <Badge count={asset.status} color="#faad14" />
                </Tooltip>
                <Tooltip placement="top" title="Healthscore">
                  <Badge count={`${asset.healthscore}%`} />
                </Tooltip>
              </div>
            </div>
            <p>
              <b>Company:</b> {asset.companyId}
            </p>
            <p>
              <b>Unit:</b> {asset.unitId}
            </p>
            <div className={styles.imageContainer}>
              <img
                src={asset.image}
                alt={asset.name}
                className={styles.image}
              />
              <div className={styles.assetDetails}>
                <p>Specifications:</p>
                <ul>
                  {Object.keys(asset.specifications).map((key) => (
                    <li key={key}>
                      {key}: {asset.specifications[key] || "N/A"}
                    </li>
                  ))}
                </ul>
                <p>Sensors:</p>
                <ul>
                  {asset.sensors.map((sensor) => (
                    <li key={sensor}>{sensor}</li>
                  ))}
                </ul>
                <p>Metrics:</p>
                <ul>
                  {Object.keys(asset.metrics).map((key) => (
                    <li key={key}>
                      {key}: {asset.metrics[key]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              ref={chartComponentRef}
            />
          </div>
        ))}
    </div>
  );
}

export default Assets;

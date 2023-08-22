import {
  AssetsInterface,
  CompanyInterface,
  UnitsInterface,
} from "../commons/types.tsx";
import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./Assets.module.css";
import { Badge, Tooltip } from "antd";
import { Metrics, Specifications } from "../commons/types.tsx";
import {
  convertFromCamelCase,
  assetSpecificationsUnit,
  assetMetricUnit,
} from "../helpers/helpers.tsx";

interface IProps {
  assets: AssetsInterface[];
  companies: CompanyInterface[];
  units: UnitsInterface[];
}

const options: Highcharts.Options = {
  title: {
    text: "Health History",
  },
  yAxis: {
    categories: [
      "Unplanned Stop",
      "Planned Stop",
      "In Alert",
      "In Downtime",
      "In Operation",
    ],
  },
  xAxis: {
    title: { text: "Datetime UTC at 00h00" },
    categories: [
      "2022/12/01",
      "2022/12-08",
      "2022/12/15",
      "2022/12/22",
      "2022/12/29",
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
    height: 300,
  },
};

function Assets({ assets, companies, units }: IProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <div className="container">
      <h2>Assets</h2>
      {!!assets.length &&
        assets.map((asset) => (
          <div
            key={asset.id}
            className={`${styles.singleAssetContainer} info-background-color`}
          >
            <div className={styles.assetHeader}>
              <div>
                <h3>
                  {asset.name} | model: {asset.model}
                </h3>
              </div>
              <div>
                <Tooltip placement="top" title="Status">
                  <Badge
                    count={convertFromCamelCase(asset.status)}
                    style={{ backgroundColor: "var(--warning)" }}
                    className={styles.badgeSpace}
                  />
                </Tooltip>
                <Tooltip placement="top" title="Healthscore">
                  <Badge
                    count={`${asset.healthscore}%`}
                    style={{ backgroundColor: "var(--error)" }}
                  />
                </Tooltip>
              </div>
            </div>
            <p>
              <b>Company:</b>{" "}
              {
                companies.filter((company) => company.id === asset.companyId)[0]
                  .name
              }
            </p>
            <p>
              <b>Unit:</b>{" "}
              {units.filter((unit) => unit.id === asset.unitId)[0].name}
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
                      {convertFromCamelCase(key)}:{" "}
                      {assetSpecificationsUnit(
                        key,
                        asset.specifications[key as keyof Specifications]
                      ) || "N/A"}
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
                      {convertFromCamelCase(key)}:{" "}
                      {assetMetricUnit(
                        key,
                        asset.metrics[key as keyof Metrics]
                      )}
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

import { AssetsInterface } from "../commons/types.tsx";
import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./Assets.module.css";

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
            <h3>{asset.name}</h3>
            <p>Company: {asset.companyId}</p>
            <img src={asset.image} alt={asset.name} className={styles.image} />
            <HighchartsReact
              className={styles.highchart}
              highcharts={Highcharts}
              options={options}
              ref={chartComponentRef}
            />
          </div>
        ))}
    </>
  );
}

export default Assets;

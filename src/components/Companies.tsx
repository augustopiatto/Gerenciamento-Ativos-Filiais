import { Button } from "antd";
import { api } from "../api/axios";
import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Units from "./Units";
import Users from "./Users";
import Workorders from "./Workorders";
import {
  AssetsInterface,
  UnitsInterface,
  UsersInterface,
  WorkordersInterface,
} from "../commons/types";

interface IProps {
  companyId: number | null;
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

function Company({ companyId }: IProps) {
  const [assets, setAssets] = React.useState<AssetsInterface[]>([]);
  const [units, setUnits] = React.useState<UnitsInterface[]>([]);
  const [users, setUsers] = React.useState<UsersInterface[]>([]);
  const [workorders, setWorkorders] = React.useState<WorkordersInterface[]>([]);

  // const unitMap = new Map<number, string>();

  const getCompanyInfos = React.useCallback(
    async function (): Promise<void> {
      let usersResponse;
      let unitsResponse;
      let workordersResponse;
      try {
        [usersResponse, unitsResponse, workordersResponse] = await Promise.all([
          api.get("users").catch(() => console.log("usersError")),
          api.get("units").catch(() => console.log("unitsError")),
          api.get("workorders").catch(() => console.log("workordersError")),
        ]);
      } catch (error) {
        console.log(error);
      }
      if (usersResponse) {
        let companyUsers: UsersInterface[] = usersResponse.data;
        if (companyId) {
          companyUsers = companyUsers.filter(
            (user: UsersInterface) => user.companyId === companyId
          );
        }
        setUsers(companyUsers);
      }
      if (unitsResponse) {
        let companyUnits: UnitsInterface[] = unitsResponse.data;
        if (companyId) {
          companyUnits = companyUnits.filter(
            (unit: UnitsInterface) => unit.companyId === companyId
          );
        }
        setUnits(companyUnits);
        // await companyUnits.forEach((unit) => {
        //   unitMap.set(unit.id, unit.name);
        // });
      }
      if (workordersResponse) setWorkorders(workordersResponse.data);
    },
    [companyId]
  );

  async function getAssets() {
    try {
      const response = await api.get("assets");
      setAssets(response.data);
      console.log("assets", assets);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getCompanyInfos();
  }, [getCompanyInfos]);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <>
      <Button onClick={() => getAssets()}>Usa API dos ativos</Button>
      <Units units={units} />
      <Users users={users} />
      <Workorders workorders={workorders} />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </>
  );
}

export default Company;

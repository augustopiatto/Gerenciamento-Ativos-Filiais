import { api } from "../api/axios";
import React from "react";
import Assets from "./Assets";
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

function Company({ companyId }: IProps) {
  const [assets, setAssets] = React.useState<AssetsInterface[]>([]);
  const [units, setUnits] = React.useState<UnitsInterface[]>([]);
  const [users, setUsers] = React.useState<UsersInterface[]>([]);
  const [workorders, setWorkorders] = React.useState<WorkordersInterface[]>([]);

  // const unitMap = new Map<number, string>();

  const getCompanyInfos = React.useCallback(
    async function (): Promise<void> {
      let assetsResponse;
      let usersResponse;
      let unitsResponse;
      let workordersResponse;
      try {
        [assetsResponse, usersResponse, unitsResponse, workordersResponse] =
          await Promise.all([
            api.get("assets").catch(() => console.log("assetsError")),
            api.get("users").catch(() => console.log("usersError")),
            api.get("units").catch(() => console.log("unitsError")),
            api.get("workorders").catch(() => console.log("workordersError")),
          ]);
      } catch (error) {
        console.log(error);
      }
      if (assetsResponse) {
        let companyAssets: AssetsInterface[] = assetsResponse.data;
        if (companyId) {
          companyAssets = companyAssets.filter(
            (user: AssetsInterface) => user.companyId === companyId
          );
        }
        console.log(companyAssets);
        setAssets(companyAssets);
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

  React.useEffect(() => {
    getCompanyInfos();
  }, [getCompanyInfos]);

  return (
    <>
      <Assets assets={assets} />
      <Units units={units} />
      <Users users={users} />
      <Workorders workorders={workorders} />
    </>
  );
}

export default Company;

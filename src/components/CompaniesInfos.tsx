import { api } from "../api/axios";
import React from "react";
import Assets from "./Assets";
import Units from "./Units";
import Users from "./Users";
import Workorders from "./Workorders";
import {
  AssetsInterface,
  CompanyInterface,
  UnitsInterface,
  UsersInterface,
  WorkordersInterface,
} from "../commons/types";
import { Spin } from "antd";
import styles from "./CompaniesInfo.module.css";

interface IProps {
  companyId: number | null;
  companies: CompanyInterface[];
}

function Company({ companyId, companies }: IProps) {
  const [assets, setAssets] = React.useState<AssetsInterface[]>([]);
  const [units, setUnits] = React.useState<UnitsInterface[]>([]);
  const [users, setUsers] = React.useState<UsersInterface[]>([]);
  const [workorders, setWorkorders] = React.useState<WorkordersInterface[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getCompanyInfos = React.useCallback(
    async function (): Promise<void> {
      setLoading(false);
      let assetsResponse;
      let usersResponse;
      let unitsResponse;
      let workordersResponse;
      try {
        setLoading(true);
        [assetsResponse, usersResponse, unitsResponse, workordersResponse] =
          await Promise.all([
            api.get("assets").catch(() => console.log("assetsApiFetchError")),
            api.get("users").catch(() => console.log("usersApiFetchError")),
            api.get("units").catch(() => console.log("unitsApiFetchError")),
            api
              .get("workorders")
              .catch(() => console.log("workordersApiFetchError")),
          ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      if (assetsResponse) {
        let companyAssets: AssetsInterface[] = assetsResponse.data;
        if (companyId) {
          companyAssets = companyAssets.filter(
            (user: AssetsInterface) => user.companyId === companyId
          );
        }
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
      {loading && (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      )}
      {!loading && (
        <div>
          <Units companies={companies} units={units} />
          <Users companies={companies} users={users} units={units} />
          <Workorders
            assets={assets}
            companies={companies}
            users={users}
            workorders={workorders}
          />
          <Assets assets={assets} companies={companies} units={units} />
        </div>
      )}
    </>
  );
}

export default Company;

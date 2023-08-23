import React from "react";
import Assets from "./Assets";
import Units from "./Units";
import Users from "./Users";
import Workorders from "./Workorders";
import { CompanyInterface } from "../commons/types";
import { Spin } from "antd";
import styles from "./CompaniesInfo.module.css";
import { UnitContext } from "../contexts/UnitContext";
import { UserContext } from "../contexts/UserContext";
import { AssetContext } from "../contexts/AssetContext";
import { WorkorderContext } from "../contexts/WorkorderContext";

interface IProps {
  companyId: number | null;
  companies: CompanyInterface[];
}

function Company({ companies }: IProps) {
  const { assets, getAssets } = React.useContext(AssetContext);
  const { units, getUnits } = React.useContext(UnitContext);
  const { users, getUsers } = React.useContext(UserContext);
  const { workorders, getWorkorders } = React.useContext(WorkorderContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  const getCompanyInfos = React.useCallback(
    async function (): Promise<void> {
      try {
        setLoading(true);
        await getAssets();
        await getUnits();
        await getUsers();
        await getWorkorders();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      // if (assets) {
      //   let companyAssets: AssetInterface[] = assets;
      //   if (companyId) {
      //     companyAssets = companyAssets.filter(
      //       (user: AssetInterface) => user.companyId === companyId
      //     );
      //   }
      //   setAssets(companyAssets);
      // }
      // if (users) {
      //   let companyUsers: UserInterface[] = users;
      //   if (companyId) {
      //     companyUsers = companyUsers.filter(
      //       (user: UserInterface) => user.companyId === companyId
      //     );
      //   }
      //   setUsers(companyUsers);
      // }
      // if (units) {
      //   let companyUnits: UnitInterface[] = units;
      //   if (companyId) {
      //     companyUnits = companyUnits.filter(
      //       (unit: UnitInterface) => unit.companyId === companyId
      //     );
      //   }
      //   setUnits(companyUnits);
      // }
      // if (workorders) setWorkorders(workorders);
    },
    [getAssets, getUnits, getUsers, getWorkorders]
  );

  React.useEffect(() => {
    getCompanyInfos();
  }, []);

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      )}
      {!loading && (
        <div>
          <Units />
          <Users />
          <Workorders />
          <Assets />
        </div>
      )}
    </>
  );
}

export default Company;

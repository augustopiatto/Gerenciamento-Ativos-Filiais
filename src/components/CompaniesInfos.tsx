import React from "react";
import Assets from "./Assets";
import Units from "./Units";
import Users from "./Users";
import Workorders from "./Workorders";
import { Spin } from "antd";
import styles from "./CompaniesInfo.module.css";
import { UnitContext } from "../contexts/UnitContext";
import { UserContext } from "../contexts/UserContext";
import { AssetContext } from "../contexts/AssetContext";
import { WorkorderContext } from "../contexts/WorkorderContext";
import { CompanyContext } from "../contexts/CompanyContext";

function Company() {
  const { getAssets } = React.useContext(AssetContext);
  const { filteredCompanyId } = React.useContext(CompanyContext);
  const { getUnits } = React.useContext(UnitContext);
  const { getUsers } = React.useContext(UserContext);
  const { getWorkorders } = React.useContext(WorkorderContext);

  const [loading, setLoading] = React.useState<boolean>(false);

  const getCompanyInfos = async () => {
    try {
      setLoading(true);
      await Promise.all([getAssets(), getUnits(), getUsers(), getWorkorders()]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCompanyInfos();
  }, [filteredCompanyId]);

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

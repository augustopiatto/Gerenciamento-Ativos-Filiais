import React from "react";
import { UnitContext } from "../contexts/UnitContext.tsx";
import styles from "./Units.module.css";
import { CompanyContext } from "../contexts/CompanyContext.tsx";

function Users() {
  const { companies } = React.useContext(CompanyContext);
  const { filteredUnits } = React.useContext(UnitContext);

  return (
    <div className="container">
      <h2>Units</h2>
      <ul className={styles.unitsContainer}>
        {!!filteredUnits.length &&
          filteredUnits.map((unit) => (
            <li
              className={`${styles.unitsName} info-background-color`}
              key={unit.id}
            >
              {unit.name} -{" "}
              {
                companies.filter((company) => company.id === unit.companyId)[0]
                  .name
              }
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Users;

import { CompanyInterface, UnitsInterface } from "../commons/types.tsx";
import styles from "./Units.module.css";

interface IProps {
  companies: CompanyInterface[];
  units: UnitsInterface[];
}

function Users({ companies, units }: IProps) {
  return (
    <div className="container">
      <h2>Units</h2>
      <ul className={styles.unitsContainer}>
        {!!units.length &&
          units.map((unit) => (
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

import { UnitsInterface } from "../commons/types.tsx";
import styles from "./Units.module.css";

interface IProps {
  units: UnitsInterface[];
}

function Users({ units }: IProps) {
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
              {unit.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Users;

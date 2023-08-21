import { UnitsInterface } from "../commons/types.tsx";
import styles from "./Units.module.css";

interface IProps {
  units: UnitsInterface[];
}

function Users({ units }: IProps) {
  return (
    <>
      <h2>Unidades</h2>
      <ul className={styles.unitsName}>
        {!!units.length &&
          units.map((unit) => <li key={unit.id}>{unit.name}</li>)}
      </ul>
    </>
  );
}

export default Users;

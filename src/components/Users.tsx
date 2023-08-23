import {
  CompanyInterface,
  UnitsInterface,
  UsersInterface,
} from "../commons/types.tsx";
import styles from "./Users.module.css";

interface IProps {
  companies: CompanyInterface[];
  users: UsersInterface[];
  units: UnitsInterface[];
}

function Users({ companies, users, units }: IProps) {
  return (
    <div className="container">
      <h2>Users</h2>
      {!!users.length &&
        users.map((user) => (
          <div
            className={`${styles.userContainer} info-background-color`}
            key={user.id}
          >
            <p className={styles.email}>
              <b>E-mail:</b> {user.email}
            </p>
            <p>
              <b>Unit:</b>{" "}
              {units.filter((unit) => unit.id === user.unitId)[0].name} -{" "}
              {
                companies.filter((company) => company.id === user.companyId)[0]
                  .name
              }
            </p>
          </div>
        ))}
    </div>
  );
}

export default Users;

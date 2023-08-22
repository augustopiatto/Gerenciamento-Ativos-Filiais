import { UsersInterface } from "../commons/types.tsx";
import styles from "./Users.module.css";

interface IProps {
  users: UsersInterface[];
}

function Users({ users }: IProps) {
  return (
    <div className="container">
      <h2>Users</h2>
      {!!users.length &&
        users.map((user) => (
          <div className={styles.userContainer} key={user.id}>
            <p className={styles.email}>
              <b>E-mail:</b> {user.email}
            </p>
            <p>
              <b>Unit:</b> {user.unitId}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Users;

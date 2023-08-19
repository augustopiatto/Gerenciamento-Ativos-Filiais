import { UsersInterface } from "../commons/types.tsx";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import styles from "./Users.module.css";
import { FilterOutlined } from "@ant-design/icons";

interface IProps {
  users: UsersInterface[];
}

function Users({ users }: IProps) {
  const genExtra = () => (
    <FilterOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps["items"] = users.map((user) => {
    return {
      key: user.id,
      label: <div className={styles.name}>{user.name}</div>,
      children: (
        <div>
          <span className={styles.email}>
            <b>Email:</b> {user.email}
          </span>
          <span>
            <b>Unidade:</b> {user.unitId}
          </span>
        </div>
      ),
      extra: genExtra(),
    };
  });

  return (
    <>
      <h2>Usuários</h2>
      {!!items.length && <Collapse items={items} />}
    </>
  );
}

export default Users;

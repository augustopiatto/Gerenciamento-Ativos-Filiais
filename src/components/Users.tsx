import { UsersInterface } from "../commons/types.tsx";

interface IProps {
  users: UsersInterface[];
}

function Users({ users }: IProps) {
  return (
    <>
      <h2>Usuários</h2>
      <ul>
        {!!users.length &&
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.unitId} -{" "}
              {/* {unitMap.get(user.unitId)} */}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Users;

import React from "react";
import { UserInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  users: UserInterface[];
  usersSelectOptions: { label: string; value: number }[];
  setUsers: (value: UserInterface[]) => void;
  getUsers: () => void;
}

export const UserContext = React.createContext<Context>({
  users: [],
  usersSelectOptions: [],
  setUsers: () => {},
  getUsers: () => {},
});

export const UserStorage = ({ children }) => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);

  async function getUsers(): Promise<void> {
    try {
      const response = await api.get("users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const usersSelectOptions: { label: string; value: number }[] = users.map(
    (user: UserInterface) => {
      return { label: user.name, value: user.id };
    }
  );

  return (
    <UserContext.Provider
      value={{ users, usersSelectOptions, setUsers, getUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

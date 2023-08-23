import React from "react";
import { UserInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  users: UserInterface[];
  setUsers: (value: UserInterface[]) => void;
  getUsers: () => void;
}

export const UserContext = React.createContext<Context>({
  users: [],
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

  return (
    <UserContext.Provider value={{ users, setUsers, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

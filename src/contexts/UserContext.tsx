import React from "react";
import { UserInterface } from "../commons/types";
import { api } from "../api/axios";
import { CompanyContext } from "./CompanyContext";

interface Context {
  allUsers: UserInterface[];
  filteredUsers: UserInterface[];
  usersSelectOptions: { label: string; value: number }[];
  setAllUsers: (value: UserInterface[]) => void;
  getUsers: () => void;
}

export const UserContext = React.createContext<Context>({
  allUsers: [],
  filteredUsers: [],
  usersSelectOptions: [],
  setAllUsers: () => {},
  getUsers: () => {},
});

export const UserStorage = ({ children }) => {
  const [allUsers, setAllUsers] = React.useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<UserInterface[]>([]);

  const { filteredCompanyId } = React.useContext(CompanyContext);

  async function getUsers(): Promise<void> {
    try {
      const response = await api.get("users");
      let companyUsers = response.data;
      setAllUsers(companyUsers);
      if (filteredCompanyId) {
        companyUsers = companyUsers.filter(
          (user: UserInterface) => user.companyId === filteredCompanyId
        );
      }
      setFilteredUsers(companyUsers);
    } catch (error) {
      console.log(error);
    }
  }

  const usersSelectOptions: { label: string; value: number }[] = allUsers.map(
    (user: UserInterface) => {
      return { label: user.name, value: user.id };
    }
  );

  return (
    <UserContext.Provider
      value={{
        allUsers,
        filteredUsers,
        usersSelectOptions,
        setAllUsers,
        getUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

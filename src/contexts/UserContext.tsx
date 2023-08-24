import React from "react";
import { UserInterface } from "../commons/types";
import { api } from "../api/axios";
import { CompanyContext } from "./CompanyContext";

interface Context {
  allUsers: UserInterface[];
  filteredUsers: UserInterface[];
  usersSelectOptions: { label: string; value: number }[];
  setAllUsers: (value: UserInterface[]) => void;
  setFilteredUsers: (value: UserInterface[]) => void;
  getUsers: () => void;
}

export const UserContext = React.createContext<Context>({
  allUsers: [],
  filteredUsers: [],
  usersSelectOptions: [],
  setAllUsers: () => {},
  setFilteredUsers: () => {},
  getUsers: () => {},
});

export const UserStorage = ({ children }) => {
  const [allUsers, setAllUsers] = React.useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<UserInterface[]>([]);

  const { filteredCompanyId } = React.useContext(CompanyContext);

  async function getUsers(): Promise<void> {
    try {
      const response = await api.get("users");
      setAllUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const usersSelectOptions: { label: string; value: number }[] = allUsers.map(
    (user: UserInterface) => {
      return { label: user.name, value: user.id };
    }
  );

  React.useEffect(() => {
    const newUsers = allUsers.filter(
      (user) => user.companyId === filteredCompanyId
    );
    if (newUsers.length) {
      setFilteredUsers(newUsers);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [filteredCompanyId]);

  return (
    <UserContext.Provider
      value={{
        allUsers,
        filteredUsers,
        usersSelectOptions,
        setAllUsers,
        setFilteredUsers,
        getUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import React from "react";
import { CompanyInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  companies: CompanyInterface[];
  setCompanies: (value: CompanyInterface[]) => void;
  getCompanies: () => void;
}

export const CompanyContext = React.createContext<Context>({
  companies: [],
  setCompanies: () => {},
  getCompanies: () => {},
});

export const CompanyStorage = ({ children }) => {
  const [companies, setCompanies] = React.useState<CompanyInterface[]>([]);

  async function getCompanies(): Promise<void> {
    try {
      const response = await api.get("companies");
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CompanyContext.Provider value={{ companies, setCompanies, getCompanies }}>
      {children}
    </CompanyContext.Provider>
  );
};

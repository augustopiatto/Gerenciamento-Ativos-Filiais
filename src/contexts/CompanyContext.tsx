import React from "react";
import { CompanyInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  companies: CompanyInterface[];
  companiesSelectOptions: { label: string; value: number }[];
  setCompanies: (value: CompanyInterface[]) => void;
  getCompanies: () => void;
}

export const CompanyContext = React.createContext<Context>({
  companies: [],
  companiesSelectOptions: [],
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

  const companiesSelectOptions: { label: string; value: number }[] =
    companies.map((company: CompanyInterface) => {
      return { label: company.name, value: company.id };
    });

  return (
    <CompanyContext.Provider
      value={{ companies, companiesSelectOptions, setCompanies, getCompanies }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

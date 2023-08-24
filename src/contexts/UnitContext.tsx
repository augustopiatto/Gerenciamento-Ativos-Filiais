import React from "react";
import { UnitInterface } from "../commons/types";
import { api } from "../api/axios";
import { CompanyContext } from "./CompanyContext";

interface Context {
  allUnits: UnitInterface[];
  filteredUnits: UnitInterface[];
  unitsSelectOptions: { label: string; value: number }[];
  setAllUnits: (value: UnitInterface[]) => void;
  getUnits: () => void;
}

export const UnitContext = React.createContext<Context>({
  allUnits: [],
  filteredUnits: [],
  unitsSelectOptions: [],
  setAllUnits: () => {},
  getUnits: () => {},
});

export const UnitStorage = ({ children }) => {
  const [allUnits, setAllUnits] = React.useState<UnitInterface[]>([]);
  const [filteredUnits, setFilteredUnits] = React.useState<UnitInterface[]>([]);

  const { filteredCompanyId } = React.useContext(CompanyContext);

  async function getUnits(): Promise<void> {
    try {
      const response = await api.get("units");
      let companyUnits = response.data;
      setAllUnits(companyUnits);
      console.log(filteredCompanyId);
      if (filteredCompanyId) {
        companyUnits = companyUnits.filter(
          (unit: UnitInterface) => unit.companyId === filteredCompanyId
        );
      }
      setFilteredUnits(companyUnits);
    } catch (error) {
      console.log(error);
    }
  }

  const unitsSelectOptions: { label: string; value: number }[] = allUnits.map(
    (unit: UnitInterface) => {
      return { label: unit.name, value: unit.id };
    }
  );

  return (
    <UnitContext.Provider
      value={{
        allUnits,
        filteredUnits,
        unitsSelectOptions,
        setAllUnits,
        getUnits,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

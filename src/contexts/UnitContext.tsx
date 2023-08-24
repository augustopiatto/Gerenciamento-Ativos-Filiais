import React from "react";
import { UnitInterface, ReactNodeInterface } from "../commons/types";
import { api } from "../api/axios";
import { CompanyContext } from "./CompanyContext";

interface Context {
  allUnits: UnitInterface[];
  filteredUnits: UnitInterface[];
  unitsSelectOptions: { label: string; value: number }[];
  setAllUnits: (value: UnitInterface[]) => void;
  setFilteredUnits: (value: UnitInterface[]) => void;
  getUnits: () => void;
}

export const UnitContext = React.createContext<Context>({
  allUnits: [],
  filteredUnits: [],
  unitsSelectOptions: [],
  setAllUnits: () => {},
  setFilteredUnits: () => {},
  getUnits: () => {},
});

export const UnitStorage = ({ children }: ReactNodeInterface) => {
  const [allUnits, setAllUnits] = React.useState<UnitInterface[]>([]);
  const [filteredUnits, setFilteredUnits] = React.useState<UnitInterface[]>([]);

  const { filteredCompanyId } = React.useContext(CompanyContext);

  async function getUnits(): Promise<void> {
    try {
      const response = await api.get("units");
      setAllUnits(response.data);
      setFilteredUnits(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const unitsSelectOptions: { label: string; value: number }[] = allUnits.map(
    (unit: UnitInterface) => {
      return { label: unit.name, value: unit.id };
    }
  );

  React.useEffect(() => {
    const newUnits = allUnits.filter(
      (unit) => unit.companyId === filteredCompanyId
    );
    if (filteredCompanyId) {
      setFilteredUnits(newUnits);
    } else {
      setFilteredUnits(allUnits);
    }
  }, [filteredCompanyId]);

  return (
    <UnitContext.Provider
      value={{
        allUnits,
        filteredUnits,
        unitsSelectOptions,
        setAllUnits,
        setFilteredUnits,
        getUnits,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

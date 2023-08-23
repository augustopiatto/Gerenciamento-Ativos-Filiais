import React from "react";
import { UnitInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  units: UnitInterface[];
  unitsSelectOptions: { label: string; value: number }[];
  setUnits: (value: UnitInterface[]) => void;
  getUnits: () => void;
}

export const UnitContext = React.createContext<Context>({
  units: [],
  unitsSelectOptions: [],
  setUnits: () => {},
  getUnits: () => {},
});

export const UnitStorage = ({ children }) => {
  const [units, setUnits] = React.useState<UnitInterface[]>([]);

  async function getUnits(): Promise<void> {
    try {
      const response = await api.get("units");
      setUnits(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const unitsSelectOptions: { label: string; value: number }[] = units.map(
    (unit: UnitInterface) => {
      return { label: unit.name, value: unit.id };
    }
  );

  return (
    <UnitContext.Provider
      value={{ units, unitsSelectOptions, setUnits, getUnits }}
    >
      {children}
    </UnitContext.Provider>
  );
};

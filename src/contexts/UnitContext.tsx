import React from "react";
import { UnitInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  units: UnitInterface[];
  setUnits: (value: UnitInterface[]) => void;
  getUnits: () => void;
}

export const UnitContext = React.createContext<Context>({
  units: [],
  setUnits: () => {},
  getUnits: () => {},
});

export const UnitStorage = ({ children }) => {
  const [units, setUnits] = React.useState<UnitInterface[]>([]);

  async function getUnits(): Promise<void> {
    try {
      const response = await api.get("companies");
      setUnits(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UnitContext.Provider value={{ units, setUnits, getUnits }}>
      {children}
    </UnitContext.Provider>
  );
};

import React from "react";
import { WorkorderInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  workorders: WorkorderInterface[];
  setWorkorders: (value: WorkorderInterface[]) => void;
  getWorkorders: () => void;
}

export const WorkorderContext = React.createContext<Context>({
  workorders: [],
  setWorkorders: () => {},
  getWorkorders: () => {},
});

export const WorkorderStorage = ({ children }) => {
  const [workorders, setWorkorders] = React.useState<WorkorderInterface[]>([]);

  async function getWorkorders(): Promise<void> {
    try {
      const response = await api.get("workorders");
      setWorkorders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WorkorderContext.Provider
      value={{ workorders, setWorkorders, getWorkorders }}
    >
      {children}
    </WorkorderContext.Provider>
  );
};

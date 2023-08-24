import React from "react";
import { ReactNodeInterface, WorkorderInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  workorders: WorkorderInterface[];
  tasksSelectOptions: { label: string; value: string }[];
  setWorkorders: (value: WorkorderInterface[]) => void;
  getWorkorders: () => void;
}

export const WorkorderContext = React.createContext<Context>({
  workorders: [],
  tasksSelectOptions: [],
  setWorkorders: () => {},
  getWorkorders: () => {},
});

export const WorkorderStorage = ({ children }: ReactNodeInterface) => {
  const [workorders, setWorkorders] = React.useState<WorkorderInterface[]>([]);

  async function getWorkorders(): Promise<void> {
    try {
      const response = await api.get("workorders");
      setWorkorders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const comparative: string[] = [];
  const tasksSelectOptions: { label: string; value: string }[] = [];
  for (let i = 0; i < workorders.length; i++) {
    for (let j = 0; j < workorders[i].checklist.length; j++) {
      if (!comparative.includes(workorders[i].checklist[j].task)) {
        comparative.push(workorders[i].checklist[j].task);
        tasksSelectOptions.push({
          label: workorders[i].checklist[j].task,
          value: workorders[i].checklist[j].task,
        });
      }
    }
  }

  return (
    <WorkorderContext.Provider
      value={{ workorders, tasksSelectOptions, setWorkorders, getWorkorders }}
    >
      {children}
    </WorkorderContext.Provider>
  );
};

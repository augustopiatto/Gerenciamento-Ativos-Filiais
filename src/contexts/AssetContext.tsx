import React from "react";
import { AssetInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  assets: AssetInterface[];
  setAssets: (value: AssetInterface[]) => void;
  getAssets: () => void;
}

export const AssetContext = React.createContext<Context>({
  assets: [],
  setAssets: () => {},
  getAssets: () => {},
});

export const AssetStorage = ({ children }) => {
  const [assets, setAssets] = React.useState<AssetInterface[]>([]);

  async function getAssets(): Promise<void> {
    try {
      const response = await api.get("assets");
      setAssets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AssetContext.Provider value={{ assets, setAssets, getAssets }}>
      {children}
    </AssetContext.Provider>
  );
};

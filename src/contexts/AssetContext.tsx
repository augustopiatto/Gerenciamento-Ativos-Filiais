import React from "react";
import { AssetInterface } from "../commons/types";
import { api } from "../api/axios";

interface Context {
  assets: AssetInterface[];
  assetsSelectOptions: { label: string; value: number }[];
  setAssets: (value: AssetInterface[]) => void;
  getAssets: () => void;
}

export const AssetContext = React.createContext<Context>({
  assets: [],
  assetsSelectOptions: [],
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

  const assetsSelectOptions: { label: string; value: number }[] = assets.map(
    (asset: AssetInterface) => {
      return { label: asset.name, value: asset.id };
    }
  );

  return (
    <AssetContext.Provider
      value={{ assets, assetsSelectOptions, setAssets, getAssets }}
    >
      {children}
    </AssetContext.Provider>
  );
};

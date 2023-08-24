import React from "react";
import { AssetInterface } from "../commons/types";
import { api } from "../api/axios";
import { convertFromCamelCase } from "../helpers/helpers";

interface Context {
  assets: AssetInterface[];
  assetsSelectOptions: { label: string; value: number }[];
  assetStatusSelectOptions: { label: string; value: string }[];
  sensorsSelectOptions: { label: string; value: string }[];
  setAssets: (value: AssetInterface[]) => void;
  getAssets: () => void;
}

export const AssetContext = React.createContext<Context>({
  assets: [],
  assetsSelectOptions: [],
  assetStatusSelectOptions: [],
  sensorsSelectOptions: [],
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

  const comparativeStatus: string[] = [];
  const assetStatusSelectOptions: { label: string; value: string }[] = [];
  for (let i = 0; i < assets.length; i++) {
    for (let j = 0; j < assets[i].healthHistory.length; j++) {
      if (!comparativeStatus.includes(assets[i].healthHistory[j].status)) {
        comparativeStatus.push(assets[i].healthHistory[j].status);
        assetStatusSelectOptions.push({
          label: convertFromCamelCase(assets[i].healthHistory[j].status),
          value: assets[i].healthHistory[j].status,
        });
      }
    }
  }

  const comparativeSensors: string[] = [];
  const sensorsSelectOptions: { label: string; value: string }[] = [];
  for (let i = 0; i < assets.length; i++) {
    for (let j = 0; j < assets[i].sensors.length; j++) {
      if (!comparativeSensors.includes(assets[i].sensors[j])) {
        comparativeSensors.push(assets[i].sensors[j]);
        sensorsSelectOptions.push({
          label: assets[i].sensors[j],
          value: assets[i].sensors[j],
        });
      }
    }
  }

  return (
    <AssetContext.Provider
      value={{
        assets,
        assetsSelectOptions,
        assetStatusSelectOptions,
        sensorsSelectOptions,
        setAssets,
        getAssets,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

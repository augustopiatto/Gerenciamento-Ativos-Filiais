import React from "react";
import { AssetInterface } from "../commons/types";
import { api } from "../api/axios";
import { convertFromCamelCase } from "../commons/helpers/helpers";
import { CompanyContext } from "./CompanyContext";

interface Context {
  allAssets: AssetInterface[];
  filteredAssets: AssetInterface[];
  assetsSelectOptions: { label: string; value: number }[];
  assetStatusSelectOptions: { label: string; value: string }[];
  sensorsSelectOptions: { label: string; value: string }[];
  setAllAssets: (value: AssetInterface[]) => void;
  setFilteredAssets: (value: AssetInterface[]) => void;
  getAssets: () => void;
}

export const AssetContext = React.createContext<Context>({
  allAssets: [],
  filteredAssets: [],
  assetsSelectOptions: [],
  assetStatusSelectOptions: [],
  sensorsSelectOptions: [],
  setAllAssets: () => {},
  setFilteredAssets: () => {},
  getAssets: () => {},
});

export const AssetStorage = ({ children }) => {
  const [allAssets, setAllAssets] = React.useState<AssetInterface[]>([]);
  const [filteredAssets, setFilteredAssets] = React.useState<AssetInterface[]>(
    []
  );

  const { filteredCompanyId } = React.useContext(CompanyContext);

  async function getAssets(): Promise<void> {
    try {
      const response = await api.get("assets");
      setAllAssets(response.data);
      setFilteredAssets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const assetsSelectOptions: { label: string; value: number }[] = allAssets.map(
    (asset: AssetInterface) => {
      return { label: asset.name, value: asset.id };
    }
  );

  const comparativeStatus: string[] = [];
  const assetStatusSelectOptions: { label: string; value: string }[] = [];
  for (let i = 0; i < allAssets.length; i++) {
    for (let j = 0; j < allAssets[i].healthHistory.length; j++) {
      if (!comparativeStatus.includes(allAssets[i].healthHistory[j].status)) {
        comparativeStatus.push(allAssets[i].healthHistory[j].status);
        assetStatusSelectOptions.push({
          label: convertFromCamelCase(allAssets[i].healthHistory[j].status),
          value: allAssets[i].healthHistory[j].status,
        });
      }
    }
  }

  const comparativeSensors: string[] = [];
  const sensorsSelectOptions: { label: string; value: string }[] = [];
  for (let i = 0; i < allAssets.length; i++) {
    for (let j = 0; j < allAssets[i].sensors.length; j++) {
      if (!comparativeSensors.includes(allAssets[i].sensors[j])) {
        comparativeSensors.push(allAssets[i].sensors[j]);
        sensorsSelectOptions.push({
          label: allAssets[i].sensors[j],
          value: allAssets[i].sensors[j],
        });
      }
    }
  }

  React.useEffect(() => {
    const newAssets = allAssets.filter(
      (asset) => asset.companyId === filteredCompanyId
    );
    if (filteredCompanyId) {
      setFilteredAssets(newAssets);
    } else {
      setFilteredAssets(allAssets);
    }
  }, [filteredCompanyId]);

  return (
    <AssetContext.Provider
      value={{
        allAssets,
        filteredAssets,
        assetsSelectOptions,
        assetStatusSelectOptions,
        sensorsSelectOptions,
        setAllAssets,
        setFilteredAssets,
        getAssets,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

import React, { Dispatch, SetStateAction } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./AddInfo.module.css";
import CompanyModal from "./modals/CompanyModal.tsx";
import UnitModal from "./modals/UnitModal.tsx";
import UserModal from "./modals/UserModal.tsx";
import WorkorderModal from "./modals/WorkorderModal.tsx";
import AssetModal from "./modals/AssetModal.tsx";

function AddInfo() {
  const [isCompanyOpen, setIsCompanyOpen] = React.useState<boolean>(false);
  const [isUnitOpen, setIsUnitOpen] = React.useState<boolean>(false);
  const [isUserOpen, setIsUserOpen] = React.useState<boolean>(false);
  const [isWorkorderOpen, setIsWorkorderOpen] = React.useState<boolean>(false);
  const [isAssetOpen, setIsAssetOpen] = React.useState<boolean>(false);

  function openModal(modalName: string): void {
    const modals: {
      [key: string]: Dispatch<SetStateAction<boolean>>;
      company: Dispatch<SetStateAction<boolean>>;
      unit: Dispatch<SetStateAction<boolean>>;
      user: Dispatch<SetStateAction<boolean>>;
      workorder: Dispatch<SetStateAction<boolean>>;
      asset: Dispatch<SetStateAction<boolean>>;
    } = {
      company: setIsCompanyOpen,
      unit: setIsUnitOpen,
      user: setIsUserOpen,
      workorder: setIsWorkorderOpen,
      asset: setIsAssetOpen,
    };
    modals[modalName](true);
  }

  return (
    <div className={styles.addInfo}>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={() => {
          openModal("company");
        }}
      >
        Company
      </Button>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={() => {
          openModal("unit");
        }}
      >
        Unit
      </Button>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={() => {
          openModal("user");
        }}
      >
        User
      </Button>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={() => {
          openModal("workorder");
        }}
      >
        Workorder
      </Button>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={() => {
          openModal("asset");
        }}
      >
        Asset
      </Button>
      <CompanyModal
        isCompanyOpen={isCompanyOpen}
        setIsCompanyOpen={setIsCompanyOpen}
      />
      <UnitModal isUnitOpen={isUnitOpen} setIsUnitOpen={setIsUnitOpen} />
      <UserModal isUserOpen={isUserOpen} setIsUserOpen={setIsUserOpen} />
      <WorkorderModal
        isWorkorderOpen={isWorkorderOpen}
        setIsWorkorderOpen={setIsWorkorderOpen}
      />
      <AssetModal isAssetOpen={isAssetOpen} setIsAssetOpen={setIsAssetOpen} />
    </div>
  );
}

export default AddInfo;

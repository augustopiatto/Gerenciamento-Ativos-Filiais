import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./AddInfo.module.css";
import CompanyModal from "./modals/CompanyModal.tsx";

function AddInfo() {
  const [isCompanyOpen, setIsCompanyOpen] = React.useState<boolean>(false);
  const [isUnitOpen, setIsUnitOpen] = React.useState<boolean>(false);
  const [isUserOpen, setIsUserOpen] = React.useState<boolean>(false);
  const [isWorkorderOpen, setIsWorkorderOpen] = React.useState<boolean>(false);
  const [isAssetOpen, setIsAssetOpen] = React.useState<boolean>(false);

  function openModal(modalName: string): void {
    const modals: {
      [key: string]: void;
      company: void;
      unit: void;
      user: void;
      workorder: void;
      asset: void;
    } = {
      company: setIsCompanyOpen(true),
      unit: setIsUnitOpen(true),
      user: setIsUserOpen(true),
      workorder: setIsWorkorderOpen(true),
      asset: setIsAssetOpen(true),
    };
    modals[modalName];
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
      <Button type="default" icon={<PlusOutlined />}>
        Unit
      </Button>
      <Button type="default" icon={<PlusOutlined />}>
        User
      </Button>
      <Button type="default" icon={<PlusOutlined />}>
        Workorder
      </Button>
      <Button type="default" icon={<PlusOutlined />}>
        Asset
      </Button>
      <CompanyModal
        isCompanyOpen={isCompanyOpen}
        setIsCompanyOpen={setIsCompanyOpen}
      />
    </div>
  );
}

export default AddInfo;

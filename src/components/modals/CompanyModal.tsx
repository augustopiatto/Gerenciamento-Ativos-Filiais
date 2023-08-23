import { Modal, Input } from "antd";
import React from "react";

interface IProps {
  isCompanyOpen: boolean;
  setIsCompanyOpen: (value: boolean) => void;
}

function CompanyModal({ isCompanyOpen, setIsCompanyOpen }: IProps) {
  const [companyName, setCompanyName] = React.useState<string>("");

  function addName(companyName: string): void {
    console.log(companyName);
    setIsCompanyOpen(false);
    setCompanyName("");
  }

  return (
    <Modal
      title="Add a company"
      open={isCompanyOpen}
      onOk={() => {
        addName(companyName);
      }}
      onCancel={() => {
        setIsCompanyOpen(false);
      }}
    >
      <Input
        placeholder="Company name"
        value={companyName}
        onChange={({ target }) => {
          setCompanyName(target.value);
        }}
      ></Input>
    </Modal>
  );
}

export default CompanyModal;

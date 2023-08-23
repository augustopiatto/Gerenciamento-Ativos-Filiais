import { Form, Modal, Input } from "antd";
import React from "react";
import { CompanyContext } from "../../contexts/CompanyContext";
import { CompanyInterface } from "../../commons/types";

interface IProps {
  isCompanyOpen: boolean;
  setIsCompanyOpen: (value: boolean) => void;
}

function CompanyModal({ isCompanyOpen, setIsCompanyOpen }: IProps) {
  const { companies, setCompanies } = React.useContext(CompanyContext);

  const [companyName, setCompanyName] = React.useState<string>("");

  const [form] = Form.useForm();

  function addName(companyName: string): void {
    const ids: number[] = companies.map(
      (company: CompanyInterface) => company.id
    );
    const lastId: number = Math.max(...ids);
    const newCompanies: CompanyInterface[] = [
      ...companies,
      { id: lastId + 1, name: companyName },
    ];
    setCompanies(newCompanies);
    setIsCompanyOpen(false);
    form.resetFields();
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
      <Form form={form}>
        <Form.Item
          label="Company name"
          name="companyName"
          rules={[{ required: true, message: "Company is required" }]}
        >
          <Input
            value={companyName}
            onChange={({ target }) => {
              setCompanyName(target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CompanyModal;

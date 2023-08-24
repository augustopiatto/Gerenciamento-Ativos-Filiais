import { Form, Modal, Input, Select } from "antd";
import { UnitInterface } from "../../commons/types";
import React from "react";
import { UnitContext } from "../../contexts/UnitContext";
import { CompanyContext } from "../../contexts/CompanyContext";

interface IProps {
  isUnitOpen: boolean;
  setIsUnitOpen: (value: boolean) => void;
}

function UnitModal({ isUnitOpen, setIsUnitOpen }: IProps) {
  const { allUnits, setAllUnits, setFilteredUnits } =
    React.useContext(UnitContext);
  const { companiesSelectOptions } = React.useContext(CompanyContext);

  const [unitName, setUnitName] = React.useState<string>("");
  const [companyId, setCompanyId] = React.useState<number>(0);

  const [form] = Form.useForm();

  async function addUnit(): Promise<void> {
    const { errorFields } = await form.validateFields();
    if (!errorFields) {
      const ids: number[] = allUnits.map((unit: UnitInterface) => unit.id);
      const lastId: number = Math.max(...ids);
      const newUnits: UnitInterface[] = [
        ...allUnits,
        { companyId: companyId, id: lastId + 1, name: unitName },
      ];
      setAllUnits(newUnits);
      setFilteredUnits(newUnits);
      setIsUnitOpen(false);
      form.resetFields();
    }
  }

  function selectCompany(value: number) {
    setCompanyId(value);
  }

  return (
    <Modal
      title="Add a unit"
      open={isUnitOpen}
      onOk={() => {
        addUnit();
      }}
      onCancel={() => {
        setIsUnitOpen(false);
      }}
    >
      <Form form={form}>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: "Company is required" }]}
        >
          <Select
            showSearch
            options={companiesSelectOptions}
            onChange={selectCompany}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Unit name"
          name="unitName"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input
            value={unitName}
            onChange={({ target }) => {
              setUnitName(target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UnitModal;

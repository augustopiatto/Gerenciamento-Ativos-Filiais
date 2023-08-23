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
  const { units, setUnits } = React.useContext(UnitContext);
  const { companiesSelectOptions } = React.useContext(CompanyContext);

  const [unitName, setUnitName] = React.useState<string>("");
  const [companyId, setCompanyId] = React.useState<number>(0);

  const [form] = Form.useForm();

  async function addUnit(unitName: string): Promise<void> {
    const { errorFields } = await form.validateFields();
    if (!errorFields) {
      const ids: number[] = units.map((unit: UnitInterface) => unit.id);
      const lastId: number = Math.max(...ids);
      const newUnits: UnitInterface[] = [
        ...units,
        { companyId: companyId, id: lastId + 1, name: unitName },
      ];
      setUnits(newUnits);
      setIsUnitOpen(false);
      setUnitName("");
      console.log(newUnits);
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
        addUnit(unitName);
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
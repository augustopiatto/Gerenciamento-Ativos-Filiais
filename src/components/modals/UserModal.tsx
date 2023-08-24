import { Form, Modal, Input, Select } from "antd";
import { UserInterface } from "../../commons/types";
import React from "react";
import { UnitContext } from "../../contexts/UnitContext";
import { CompanyContext } from "../../contexts/CompanyContext";
import { UserContext } from "../../contexts/UserContext";

interface IProps {
  isUserOpen: boolean;
  setIsUserOpen: (value: boolean) => void;
}

function UserModal({ isUserOpen, setIsUserOpen }: IProps) {
  const { users, setUsers } = React.useContext(UserContext);
  const { companiesSelectOptions } = React.useContext(CompanyContext);
  const { unitsSelectOptions } = React.useContext(UnitContext);

  const [companyId, setCompanyId] = React.useState<number>(0);
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [userUnitId, setUserUnitId] = React.useState<number>(0);

  const [form] = Form.useForm();

  async function addUser(): Promise<void> {
    const { errorFields } = await form.validateFields();
    if (!errorFields) {
      const ids: number[] = users.map((user: UserInterface) => user.id);
      const lastId: number = Math.max(...ids);
      const newUsers: UserInterface[] = [
        ...users,
        {
          companyId: companyId,
          email: userEmail,
          id: lastId + 1,
          name: userName,
          unitId: userUnitId,
        },
      ];
      setUsers(newUsers);
      setIsUserOpen(false);
      form.resetFields();
    }
  }

  function selectCompany(value: number) {
    setCompanyId(value);
  }

  function selectCompanyUnit(value: number) {
    setUserUnitId(value);
  }

  return (
    <Modal
      title="Add a unit"
      open={isUserOpen}
      onOk={() => {
        addUser();
      }}
      onCancel={() => {
        setIsUserOpen(false);
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
            placeholder="Company"
            options={companiesSelectOptions}
            onChange={selectCompany}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Company's unit is required" }]}
        >
          <Select
            showSearch
            placeholder="Company's unit"
            options={unitsSelectOptions}
            onChange={selectCompanyUnit}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="User name"
          name="userName"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input
            value={userName}
            onChange={({ target }) => {
              setUserName(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="User email"
          name="userEmail"
          rules={[{ required: true, message: "E-mail is required" }]}
        >
          <Input
            value={userEmail}
            onChange={({ target }) => {
              setUserEmail(target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserModal;

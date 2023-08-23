import { Form, Modal, Input, Select } from "antd";
import React from "react";
import { AssetInterface } from "../../commons/types";
import { AssetContext } from "../../contexts/AssetContext";
import { UserContext } from "../../contexts/UserContext";

interface IProps {
  isAssetOpen: boolean;
  setIsAssetOpen: (value: boolean) => void;
}

function AssetModal({ isAssetOpen, setIsAssetOpen }: IProps) {
  const { assets, setAssets } = React.useContext(AssetContext);
  const { usersSelectOptions } = React.useContext(UserContext);

  const [assetName, setAssetName] = React.useState<string>("");
  const [assignedUsers, setAssignedUsers] = React.useState<number[]>([]);

  const [form] = Form.useForm();

  async function addName(): Promise<void> {
    const { errorFields } = await form.validateFields();
    if (!errorFields) {
      const ids: number[] = assets.map((company: AssetInterface) => company.id);
      const lastId: number = Math.max(...ids);
      const newAssets: AssetInterface[] = [
        ...assets,
        {
          assignedUserIds: assignedUsers,
          companyId: 1,
          healthHistory: [],
          healthscore: 1,
          id: lastId + 1,
          image: "",
          metrics: {},
          model: "",
          name: "",
          sensors: [],
          specifications: {},
          status: "",
          unitId: 1,
        },
      ];
      setAssets(newAssets);
      setIsAssetOpen(false);
      form.resetFields();
    }
  }

  function selectUsers(value: number[]) {
    setAssignedUsers([...value]);
  }

  return (
    <Modal
      title="Add a company"
      open={isAssetOpen}
      onOk={() => {
        addName();
      }}
      onCancel={() => {
        setIsAssetOpen(false);
      }}
    >
      <Form form={form}>
        <Form.Item
          label="Name"
          name="assetName"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input
            value={assetName}
            onChange={({ target }) => {
              setAssetName(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Assigned users"
          name="assignedUsers"
          rules={[{ required: true, message: "Assign a user is required" }]}
        >
          <Select
            showSearch
            mode="multiple"
            options={usersSelectOptions}
            onChange={selectUsers}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AssetModal;

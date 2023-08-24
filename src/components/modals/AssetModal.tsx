import { Form, Modal, Input, InputNumber, Select } from "antd";
import React from "react";
import { AssetInterface } from "../../commons/types";
import { AssetContext } from "../../contexts/AssetContext";
import { UserContext } from "../../contexts/UserContext";
import { CompanyContext } from "../../contexts/CompanyContext";

interface IProps {
  isAssetOpen: boolean;
  setIsAssetOpen: (value: boolean) => void;
}

function AssetModal({ isAssetOpen, setIsAssetOpen }: IProps) {
  const { assets, assetStatusSelectOptions, sensorsSelectOptions, setAssets } =
    React.useContext(AssetContext);
  const { companiesSelectOptions } = React.useContext(CompanyContext);
  const { usersSelectOptions } = React.useContext(UserContext);

  const [assetName, setAssetName] = React.useState<string>("");
  const [assignedUsers, setAssignedUsers] = React.useState<number[]>([]);
  const [companyId, setCompanyId] = React.useState<number>(0);
  const [healthscore, setHealthscore] = React.useState<number>(0);
  const [model, setModel] = React.useState<string>("");
  const [sensors, setSensors] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<string>("");

  const [form] = Form.useForm();

  async function addAsset(): Promise<void> {
    const { errorFields } = await form.validateFields();
    if (!errorFields) {
      const ids: number[] = assets.map((company: AssetInterface) => company.id);
      const lastId: number = Math.max(...ids);
      const newAssets: AssetInterface[] = [
        ...assets,
        {
          assignedUserIds: assignedUsers,
          companyId: companyId,
          healthHistory: [],
          healthscore: healthscore,
          id: lastId + 1,
          image: "",
          metrics: {},
          model: model,
          name: assetName,
          sensors: sensors,
          specifications: {},
          status: status,
          unitId: 1,
        },
      ];
      setAssets(newAssets);
      setIsAssetOpen(false);
      form.resetFields();
    }
  }

  function changeHealthscore(value: number | null) {
    if (value) setHealthscore(value);
  }

  function selectCompany(value: number) {
    setCompanyId(value);
  }

  function selectStatus(value: string) {
    setStatus(value);
  }

  function selectUsers(value: number[]) {
    setAssignedUsers([...value]);
  }

  return (
    <Modal
      title="Add an asset"
      open={isAssetOpen}
      onOk={() => {
        addAsset();
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
          label="Model"
          name="model"
          rules={[{ required: true, message: "Model is required" }]}
        >
          <Input
            value={model}
            onChange={({ target }) => {
              setModel(target.value);
            }}
          />
        </Form.Item>
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
        <Form.Item
          label="Healthscore"
          name="healthscore"
          rules={[{ required: true, message: "Healthscore is required" }]}
        >
          <InputNumber
            min={0}
            max={100}
            value={healthscore}
            onChange={changeHealthscore}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            options={assetStatusSelectOptions}
            onChange={selectStatus}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Sensors"
          name="sensors"
          rules={[{ required: true, message: "Sensors are required" }]}
        >
          <Select
            showSearch
            mode="multiple"
            options={sensorsSelectOptions}
            onChange={(value: string[]) => {
              setSensors([...value]);
            }}
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

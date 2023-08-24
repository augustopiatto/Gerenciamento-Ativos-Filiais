import {
  Form,
  Modal,
  Input,
  InputNumber,
  Select,
  Divider,
  Upload,
  Button,
} from "antd";
import React from "react";
import { AssetInterface } from "../../commons/types";
import { AssetContext } from "../../contexts/AssetContext";
import { UserContext } from "../../contexts/UserContext";
import { CompanyContext } from "../../contexts/CompanyContext";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import styles from "./AssetModal.module.css";

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
  const [image, setImage] = React.useState<string>("");
  const [lastUptimeAt, setLastUptimeAt] = React.useState<string>("");
  const [totalCollectsUptime, setTotalCollectsUptime] =
    React.useState<number>(0);
  const [totalUptime, setTotalUptime] = React.useState<number>(0);
  const [maxTemp, setMaxTemp] = React.useState<number>(0);
  const [power, setPower] = React.useState<number>(0);
  const [rpm, setRpm] = React.useState<number>(0);
  const [status1, setStatus1] = React.useState<string>("");
  const [status2, setStatus2] = React.useState<string>("");
  const [status3, setStatus3] = React.useState<string>("");
  const [status4, setStatus4] = React.useState<string>("");
  const [status5, setStatus5] = React.useState<string>("");

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
          healthHistory: [
            { status: status1, timestamp: "2022-12-01T00:00:00.000Z" },
            { status: status2, timestamp: "2022-12-08T00:00:00.000Z" },
            { status: status3, timestamp: "2022-12-15T00:00:00.000Z" },
            { status: status4, timestamp: "2022-12-22T00:00:00.000Z" },
            { status: status5, timestamp: "2022-12-29T00:00:00.000Z" },
          ],
          healthscore: healthscore,
          id: lastId + 1,
          image: image,
          metrics: {
            lastUptimeAt: lastUptimeAt,
            totalCollectsUptime: totalCollectsUptime,
            totalUptime: totalUptime,
          },
          model: model,
          name: assetName,
          sensors: sensors,
          specifications: {
            maxTemp: maxTemp,
            power: power,
            rpm: rpm,
          },
          status: status,
          unitId: 1,
        },
      ];
      setAssets(newAssets);
      setIsAssetOpen(false);
      form.resetFields();
    }
  }

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const props: UploadProps = {
    name: "file",
    fileList: [],
    beforeUpload: () => false,
    onChange: async (info) => {
      const imageFile = info.fileList[0];
      const url = await getBase64(imageFile.originFileObj as RcFile);
      setImage(url);
    },
  };

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
            onChange={(value: number) => {
              setCompanyId(value);
            }}
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
            onChange={(value: number[]) => {
              setAssignedUsers([...value]);
            }}
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
            onChange={(value: number | null) => {
              if (value) setHealthscore(value);
            }}
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
            onChange={(value: string) => {
              setStatus(value);
            }}
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
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Sensors are required" }]}
        >
          {!!image && <p className={styles.sentFile}>File sent</p>}
          {!image && (
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload image</Button>
            </Upload>
          )}
        </Form.Item>
        <Divider>Metrics</Divider>
        <Form.Item
          label="Last uptime date"
          name="lastUptimeAt"
          rules={[{ required: true, message: "Last uptime date is required" }]}
        >
          <Input
            value={lastUptimeAt}
            onChange={({ target }) => {
              setLastUptimeAt(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Total collects uptime"
          name="totalCollectsUptime"
          rules={[
            { required: true, message: "Total collects uptime is required" },
          ]}
        >
          <InputNumber
            min={0}
            value={totalCollectsUptime}
            onChange={(value: number | null) => {
              if (value) setTotalCollectsUptime(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Total uptime"
          name="totalUptime"
          rules={[{ required: true, message: "Total uptime is required" }]}
        >
          <InputNumber
            min={0}
            value={totalUptime}
            onChange={(value: number | null) => {
              if (value) setTotalUptime(value);
            }}
          />
        </Form.Item>
        <Divider>Specifications</Divider>
        <Form.Item
          label="Max temperature"
          name="maxTemp"
          rules={[{ required: true, message: "Max temperature is required" }]}
        >
          <InputNumber
            min={0}
            value={maxTemp}
            onChange={(value: number | null) => {
              if (value) setMaxTemp(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Power"
          name="power"
          rules={[{ required: false, message: "Power is required" }]}
        >
          <InputNumber
            min={0}
            value={power}
            onChange={(value: number | null) => {
              if (value) setPower(value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="RPM"
          name="rpm"
          rules={[{ required: false, message: "RPM is required" }]}
        >
          <InputNumber
            min={0}
            value={rpm}
            onChange={(value: number | null) => {
              if (value) setRpm(value);
            }}
          />
        </Form.Item>
        <Divider>Health history</Divider>
        <Form.Item
          label="Day 12/01 status"
          name="status1"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            options={assetStatusSelectOptions}
            onChange={(value: string) => {
              setStatus1(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Day 12/08 status"
          name="status2"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            options={assetStatusSelectOptions}
            onChange={(value: string) => {
              setStatus2(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Day 12/15 status"
          name="status3"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            options={assetStatusSelectOptions}
            onChange={(value: string) => {
              setStatus3(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Day 12/22 status"
          name="status4"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            options={assetStatusSelectOptions}
            onChange={(value: string) => {
              setStatus4(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Day 12/29 status"
          name="status5"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select
            showSearch
            options={assetStatusSelectOptions}
            onChange={(value: string) => {
              setStatus5(value);
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

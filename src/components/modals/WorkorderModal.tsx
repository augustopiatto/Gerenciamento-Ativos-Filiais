import { Form, Modal, Input, Select } from "antd";
import { Checklist, WorkorderInterface } from "../../commons/types";
import React from "react";
import { UserContext } from "../../contexts/UserContext";
import { WorkorderContext } from "../../contexts/WorkorderContext";
import { AssetContext } from "../../contexts/AssetContext";

interface IProps {
  isWorkorderOpen: boolean;
  setIsWorkorderOpen: (value: boolean) => void;
}

const { TextArea } = Input;

function WorkorderModal({ isWorkorderOpen, setIsWorkorderOpen }: IProps) {
  const { assetsSelectOptions } = React.useContext(AssetContext);
  const { usersSelectOptions } = React.useContext(UserContext);
  const { workorders, tasksSelectOptions, setWorkorders } =
    React.useContext(WorkorderContext);

  const [title, setTitle] = React.useState<string>("");
  const [priority, setPriority] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [assetId, setAssetId] = React.useState<number>(0);
  const [assignedUsers, setAssignedUsers] = React.useState<number[]>([]);
  const [checklist, setChecklist] = React.useState<Checklist[]>([]);

  const [form] = Form.useForm();

  async function addWorkorder(): Promise<void> {
    const { errorFields } = await form.validateFields();
    if (!errorFields) {
      const ids: number[] = workorders.map(
        (workorder: WorkorderInterface) => workorder.id
      );
      const lastId: number = Math.max(...ids);
      const newWorkorders: WorkorderInterface[] = [
        ...workorders,
        {
          assetId: assetId,
          assignedUserIds: assignedUsers,
          checklist: checklist,
          description: description,
          id: lastId + 1,
          priority: priority,
          status: "waiting",
          title: title,
        },
      ];
      setWorkorders(newWorkorders);
      setIsWorkorderOpen(false);
      form.resetFields();
    }
  }
  function selectAsset(value: number) {
    setAssetId(value);
  }

  function selectPriority(value: string) {
    setPriority(value);
  }

  function selectUsers(value: number[]) {
    setAssignedUsers([...value]);
  }

  function selectTasks(values: string[]) {
    const checklists = values.map((value) => {
      return { task: value, completed: false };
    });
    setChecklist(checklists);
  }

  return (
    <Modal
      title="Add a workorder"
      open={isWorkorderOpen}
      onOk={() => {
        addWorkorder();
      }}
      onCancel={() => {
        setIsWorkorderOpen(false);
      }}
    >
      <Form form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Asset"
          name="asset"
          rules={[{ required: true, message: "Asset is required" }]}
        >
          <Select
            showSearch
            options={assetsSelectOptions}
            onChange={selectAsset}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Priority is required" }]}
        >
          <Select
            showSearch
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
            onChange={selectPriority}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea
            value={description}
            rows={2}
            onChange={({ target }) => {
              setDescription(target.value);
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
        <Form.Item
          label="Tasks"
          name="tasks"
          rules={[{ required: true, message: "Tasks are required" }]}
        >
          <Select
            showSearch
            mode="multiple"
            options={tasksSelectOptions}
            onChange={selectTasks}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default WorkorderModal;

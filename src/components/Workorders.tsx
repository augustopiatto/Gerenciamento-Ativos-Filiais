import { WorkordersInterface } from "../commons/types.tsx";
import styles from "./Workorders.module.css";
import { Col } from "antd";
import type { CollapseProps } from "antd";
import { Collapse, Badge } from "antd";

interface IProps {
  workorders: WorkordersInterface[];
}

function Workorders({ workorders }: IProps) {
  function setPriorityColor(priority: string): string {
    const priorities: {
      [key: string]: string;
      high: string;
      medium: string;
      low: string;
    } = {
      high: "ff4d4f",
      medium: "faad14",
      low: "f5222d",
    };
    return priorities[priority];
  }

  const workordersItems: CollapseProps["items"] = workorders.map(
    (workorder) => {
      return {
        key: workorder.id,
        label: (
          <div className={styles.labelContainer}>
            <div className={styles.label}>
              <h3>{workorder.title}</h3>
              <Badge
                count={workorder.priority}
                color={setPriorityColor(workorder.priority)}
              />
            </div>
            <div>
              <h3>{workorder.status}</h3>
            </div>
          </div>
        ),
        children: (
          <Col>
            <p>Asset: {workorder.assetId}</p>
            <p>Description: {workorder.description}</p>
            <ul>
              Assigned Users:{" "}
              {workorder.assignedUserIds.map((assignedUserId) => (
                <li key={assignedUserId}>{assignedUserId}</li>
              ))}
            </ul>
            <ul>
              Checklist:{" "}
              {workorder.checklist.map((checklist) => (
                <li key={checklist.task}>
                  Task:{checklist.task} - {checklist.completed}
                </li>
              ))}
            </ul>
          </Col>
        ),
      };
    }
  );

  return (
    <div className="container">
      <h2>Workorders</h2>
      {!!workorders.length && <Collapse items={workordersItems} size="small" />}
    </div>
  );
}

export default Workorders;

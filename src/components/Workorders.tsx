import { WorkordersInterface } from "../commons/types.tsx";
// import styles from "./Units.module.css";
import { Col, Row } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

interface IProps {
  workorders: WorkordersInterface[];
}

function Workorders({ workorders }: IProps) {
  const workordersItems: CollapseProps["items"] = workorders.map(
    (workorder) => {
      return {
        key: workorder.id,
        label: (
          <Row>
            <Col span={12}>
              <Row>
                <h3>{workorder.title}</h3>
                <p>{workorder.priority}</p>
              </Row>
            </Col>
            <Col span={3} offset={9}>
              <h3>{workorder.status}</h3>
            </Col>
          </Row>
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
    <div>
      <h2>Ordens de serviço</h2>
      {!!workorders.length && <Collapse items={workordersItems} size="small" />}
    </div>
  );
}

export default Workorders;

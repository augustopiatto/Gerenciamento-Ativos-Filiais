import { Button } from "antd";
import { api } from "../api/axios";

function Company({ companyName }) {
  return (
    <>
      <h1>{companyName}</h1>
      <Button onClick={() => api.get("assets")}>Usa API dos ativos</Button>
    </>
  );
}

export default Company;

// propTypes

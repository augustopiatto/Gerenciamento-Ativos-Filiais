import { Button } from "antd";
import { api } from "../api/axios";
import React from "react";
import { useNavigate, useParams } from "react-router";

interface ParamsInfos {
  id: string;
}

function Company() {
  const navigate = useNavigate();

  const { id }: ParamsInfos = useParams();
  const companyId: number = parseInt(id);
  const [company, setCompany] = React.useState<{ id?: number; name?: string }>(
    {}
  );

  const getCompany = React.useCallback(
    async function (): Promise<void> {
      try {
        const response = await api.get("companies", companyId);
        if (!response.data.length) {
          navigate("/*");
        }
        setCompany(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    },
    [navigate, companyId]
  );

  React.useEffect(() => {
    getCompany();
  }, [getCompany, id]);

  return (
    <>
      {!!Object.keys(company).length && (
        <div>
          <h1>{company.name}</h1>
          <Button onClick={() => api.get("assets")}>Usa API dos ativos</Button>
        </div>
      )}
    </>
  );
}

export default Company;

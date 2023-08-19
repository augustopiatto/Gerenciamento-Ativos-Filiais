import { Button } from "antd";
import { api } from "../api/axios";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ParamsInfos {
  id: string;
}

interface Company {
  id?: number;
  name?: string;
}

interface HealthHistory {
  status: string;
  timestamp: string;
}

interface Metrics {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}

interface Specifications {
  maxTemp: number;
}

interface Assets {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: HealthHistory[];
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: string;
  name: string;
  sensors: string[];
  specifications: Specifications;
  status: string;
  unitId: number;
}

interface Users {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

interface Units {
  companyId: number;
  id: number;
  name: string;
}

interface Checklist {
  completed: boolean;
  task: string;
}

interface Workorders {
  assetId: number;
  assignedUsersIds: number[];
  checklist: Checklist[];
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

const options: Highcharts.Options = {
  title: {
    text: "My chart",
  },
  series: [
    {
      type: "line",
      data: [1, 2, 3],
    },
  ],
};

function Company() {
  const navigate = useNavigate();

  const { id }: ParamsInfos = useParams();
  const companyId: number = parseInt(id);
  const [company, setCompany] = React.useState<Company>({});
  const [assets, setAssets] = React.useState<Assets[]>([]);
  const [users, setUsers] = React.useState<Users[]>([]);
  const [units, setUnits] = React.useState<Units[]>([]);
  const [workorders, setWorkorders] = React.useState<Workorders[]>([]);

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

  async function getAssets() {
    try {
      const response = await api.get("assets");
      if (!response.data.length) {
        navigate("/*");
      }
      setAssets(response.data[0]);
      console.log("assets", assets);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      const response = await api.get("users");
      if (!response.data.length) {
        navigate("/*");
      }
      setUsers(response.data[0]);
      console.log("users", users);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUnits() {
    try {
      const response = await api.get("units");
      if (!response.data.length) {
        navigate("/*");
      }
      setUnits(response.data[0]);
      console.log("units", units);
    } catch (error) {
      console.log(error);
    }
  }

  async function getWorkorders() {
    try {
      const response = await api.get("workorders");
      if (!response.data.length) {
        navigate("/*");
      }
      setWorkorders(response.data[0]);
      console.log("workorders", workorders);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getCompany();
  }, [getCompany, id]);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <>
      {!!Object.keys(company).length && (
        <div>
          <h1>{company.name}</h1>
          <Button onClick={() => getAssets()}>Usa API dos ativos</Button>
          <Button onClick={() => getUsers()}>Usa API dos usuários</Button>
          <Button onClick={() => getUnits()}>Usa API das unidades</Button>
          <Button onClick={() => getWorkorders()}>
            Usa API das ordens de serviço
          </Button>
        </div>
      )}
      <div>
        as informações da empresa aqui, com quantos funcionarios tem, quais as
        unidades, qtd de funcionario por unidade, quais ordens de servico, ordem
        de servico por usuario, etc. Pra isso, tem que chamar todas APIs, exceto
        dos ativos quando carregar essa pagina, e ai usar TS pra trabalhar com
        essas infos
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </>
  );
}

export default Company;

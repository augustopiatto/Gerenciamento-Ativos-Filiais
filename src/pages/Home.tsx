import React from "react";
import { api } from "../api/axios";
import { Button, Select } from "antd";
import CompaniesInfos from "../components/CompaniesInfos.tsx";
import styles from "./Home.module.css";
import { CompanyInterface } from "../commons/types.tsx";
import { PlusOutlined } from "@ant-design/icons";

function Home() {
  const [companies, setCompanies] = React.useState<CompanyInterface[]>([]);
  const [options, setOptions] = React.useState<
    { label: string; value: number }[]
  >([]);
  const [filteredCompanyId, setFilteredCompanyId] = React.useState<
    number | null
  >(null);

  async function getCompanies(): Promise<void> {
    try {
      const response = await api.get("companies");
      setCompanies(response.data);
      const companiesObj = response.data.map(
        (company: { id: number; name: string }) => {
          return { label: company.name, value: company.id };
        }
      );
      setOptions(companiesObj);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(value: number) {
    const companyId: number = companies.filter(
      (company: CompanyInterface) => company.id === value
    )[0].id;
    setFilteredCompanyId(companyId);
  }

  React.useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.companySearch}>
        <h1>Companies</h1>
        <Select
          className={styles.selectBox}
          showSearch
          placeholder="Filter by company"
          options={options}
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      <div className={styles.addInfo}>
        <Button type="default" icon={<PlusOutlined />}>
          Company
        </Button>
        <Button type="default" icon={<PlusOutlined />}>
          Unit
        </Button>
        <Button type="default" icon={<PlusOutlined />}>
          User
        </Button>
        <Button type="default" icon={<PlusOutlined />}>
          Workorder
        </Button>
        <Button type="default" icon={<PlusOutlined />}>
          Asset
        </Button>
      </div>
      <CompaniesInfos companyId={filteredCompanyId} companies={companies} />
    </div>
  );
}

export default Home;

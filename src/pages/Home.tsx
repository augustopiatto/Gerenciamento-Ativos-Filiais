import React from "react";
import { api } from "../api/axios";
import { Select } from "antd";
import CompaniesInfos from "../components/CompaniesInfos.tsx";
import styles from "./Home.module.css";
import { CompanyInterface } from "../commons/types.tsx";

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
          placeholder="Select company"
          options={options}
          onChange={onChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      <CompaniesInfos companyId={filteredCompanyId} companies={companies} />
    </div>
  );
}

export default Home;

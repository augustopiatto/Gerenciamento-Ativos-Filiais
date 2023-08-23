import React from "react";
import { Select } from "antd";
import CompaniesInfos from "../components/CompaniesInfos.tsx";
import styles from "./Home.module.css";
import { CompanyInterface } from "../commons/types.tsx";
import AddInfo from "../components/AddInfo.tsx";
import { CompanyContext } from "../contexts/CompanyContext.tsx";

function Home() {
  const [filteredCompanyId, setFilteredCompanyId] = React.useState<
    number | null
  >(null);

  const { companies, getCompanies } = React.useContext(CompanyContext);
  const options: { label: string; value: number }[] = companies.map(
    (company: { id: number; name: string }) => {
      return { label: company.name, value: company.id };
    }
  );

  function selectCompany(value: number) {
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
          onChange={selectCompany}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
      <AddInfo />
      <CompaniesInfos companyId={filteredCompanyId} companies={companies} />
    </div>
  );
}

export default Home;

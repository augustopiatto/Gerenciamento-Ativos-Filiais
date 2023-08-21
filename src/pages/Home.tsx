import React from "react";
import { api } from "../api/axios";
import { Select } from "antd";
import Companies from "../components/Companies.tsx";

function Home() {
  const [companies, setCompanies] = React.useState<
    { label: string; value: number }[]
  >([]);
  const [filteredCompanyId, setFilteredCompanyId] = React.useState<
    number | null
  >(null);

  async function getCompanies(): Promise<void> {
    try {
      const response = await api.get("companies");
      const companiesObj = response.data.map(
        (company: { id: number; name: string }) => {
          return { label: company.name, value: company.id };
        }
      );
      setCompanies(companiesObj);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(value: number) {
    setFilteredCompanyId(value);
  }

  React.useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <p>
        Bem vindo ao nosso site, essas são as empresas que temos conosco. Qual
        delas você gostaria de mais informações?
      </p>
      <h1>Companies</h1>
      <Select
        showSearch
        placeholder="Select company"
        options={companies}
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
      <Companies companyId={filteredCompanyId} />
    </>
  );
}

export default Home;

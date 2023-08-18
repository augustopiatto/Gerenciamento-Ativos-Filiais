import React from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

// Todos dados estão relacionados às empresas, vou ter que fazer a busca dos dados secundários
// a partir da empresa

function Home() {
  const [companies, setCompanies] = React.useState<
    { id: number; name: string }[]
  >([]);

  async function getCompanies(): Promise<void> {
    try {
      const response = await api.get("companies");
      setCompanies(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
      <h1>Empresas</h1>
      <ul>
        {!!Object.keys(companies).length &&
          companies.map((company) => (
            <li key={company.id}>
              <Link to={`company/${company.id}`}>{company.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Home;

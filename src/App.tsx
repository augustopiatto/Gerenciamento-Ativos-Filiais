import Header from "./Header.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { CompanyStorage } from "./contexts/CompanyContext.tsx";

function App() {
  return (
    <BrowserRouter>
      <CompanyStorage>
        <Header />
        <main className={styles.background}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </CompanyStorage>
    </BrowserRouter>
  );
}

export default App;

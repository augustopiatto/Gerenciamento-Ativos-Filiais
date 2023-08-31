import Header from "./Header.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { CompanyStorage } from "./contexts/CompanyContext.tsx";
import { UnitStorage } from "./contexts/UnitContext";
import { UserStorage } from "./contexts/UserContext.tsx";
import { WorkorderStorage } from "./contexts/WorkorderContext.tsx";
import { AssetStorage } from "./contexts/AssetContext.tsx";

function App() {
  return (
    <HashRouter>
      <CompanyStorage>
        <AssetStorage>
          <UnitStorage>
            <UserStorage>
              <WorkorderStorage>
                <Header />
                <main className={styles.background}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </WorkorderStorage>
            </UserStorage>
          </UnitStorage>
        </AssetStorage>
      </CompanyStorage>
    </HashRouter>
  );
}

export default App;

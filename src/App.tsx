import Header from "./Header.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={styles.background}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import Company from "./pages/Company.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const id: number = 1;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="company/:id" element={<Company companyName={id} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

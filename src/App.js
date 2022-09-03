import Join from "./pages/Join";
import PlanningProvider from "./context/planning";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <PlanningProvider>
      <Routes>
        <Route path="/" element={<Join />} />
      </Routes>
    </PlanningProvider>
  );
}

export default App;

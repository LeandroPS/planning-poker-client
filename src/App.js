import Join from "./pages/Join";
import Vote from "./pages/Vote";
import PlanningProvider from "./context/planning";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <PlanningProvider>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </PlanningProvider>
  );
}

export default App;

import Join from "./pages/Join";
import Vote from "./pages/Session";
import PlanningProvider from "./context/planning";
import SettingsProvider from "./context/settings";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <PlanningProvider>
      <SettingsProvider>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/session/:id" element={<Vote />} />
        </Routes>
      </SettingsProvider>
    </PlanningProvider>
  );
}

export default App;

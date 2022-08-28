import Join from "./pages/Join";
import PlanningProvider from "./context/planning";

function App() {
  return (
    <PlanningProvider>
      <Join />
    </PlanningProvider>
  );
}

export default App;

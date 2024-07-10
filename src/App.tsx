import "reactflow/dist/style.css";
import useRouteElements from "./routes/useRouteElements";

function App() {
  const routeElements = useRouteElements();
  return routeElements;
}

export default App;

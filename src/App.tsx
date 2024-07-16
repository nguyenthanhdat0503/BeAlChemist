import "reactflow/dist/style.css";
import useRouteElements from "./routes/useRouteElements";
import { LocalStorageEventTarget } from "./utils/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./features/auth.slice";

function App() {
  const dispatch = useDispatch();

  // // Listen event token is expired so I can reset global state
  useEffect(() => {
    const reset = () => {
      dispatch(setIsAuthenticated({ isAuthenticated: false }));
    };
    LocalStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [dispatch]);

  const routeElements = useRouteElements();
  return routeElements;
}

export default App;

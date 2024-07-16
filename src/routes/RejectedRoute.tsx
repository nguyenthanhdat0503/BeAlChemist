import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { path } from "../constants/path";

export default function RejectedRoute() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}

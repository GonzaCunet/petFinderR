import { Outlet } from "react-router-dom";
import { Header } from "./header";
export function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
}

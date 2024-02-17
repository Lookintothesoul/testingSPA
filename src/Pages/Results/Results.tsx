import { useEffect } from "react";
import "./Results.css";
import { observer } from "mobx-react-lite";
import { clearCurrentTestLocal } from "../../Helpers/LocalStorage.ts";
import { Outlet } from "react-router-dom";

export const Results = observer(() => {
  useEffect(() => {
    clearCurrentTestLocal();
  }, []);

  return (
    <div className="results-container">
      <Outlet />
    </div>
  );
});

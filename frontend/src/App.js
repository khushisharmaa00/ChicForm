import "./App.css";
import { Routes, Route } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRouters from "./Routers/AdminRouters";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser()); //  Call without passing token, let `getUser` handle it
  }, [dispatch]);
  return (
    <div className="">
      <Routes>
        <Route path="/admin/*" element={<AdminRouters />} />
        <Route path="/*" element={<CustomerRouters />} />
      </Routes>
    </div>
  );
}

export default App;

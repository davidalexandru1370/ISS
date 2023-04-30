import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { ProtectedRoute } from "./Pages/ProtectedRoute/ProtectedRoute";
import MainPage from "./Pages/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/mainpage"
        element={<ProtectedRoute page={<MainPage />} redirectPage="/login" />}
      />
    </Routes>
  );
}

export default App;

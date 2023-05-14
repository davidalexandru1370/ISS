import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BaseRouter from "./Components/BaseRouter/BaseRouter";
import Login from "./Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage";
import { ProtectedRoute } from "./Pages/ProtectedRoute/ProtectedRoute";
import { PublicDestinations } from "./Pages/PublicDestinations/PublicDestinations";
import { Register } from "./Pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<BaseRouter />}>
        <Route
          path="/mainpage"
          element={<ProtectedRoute page={<MainPage />} redirectPage="/login" />}
        />
        <Route
          path="/publicdestinations"
          element={
            <ProtectedRoute
              page={<PublicDestinations />}
              redirectPage="/login"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

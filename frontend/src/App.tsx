import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import LocationPage from "./pages/Location";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#192080",
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
        },
        components: {
          Table: {
            headerBg: "#f1f5f9",
            headerColor: "#374151",
            headerBorderRadius: 0,
          },
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/location/province" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/location/:view"
            element={
              <ProtectedRoute>
                <LocationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";
import Layout from "./components/Layout/Layout";

// Pages
import UserAuth from "./pages/UserAuthPage/UserAuth";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Analytics from "./pages/AnalyticsPage/Analytics";
import Settings from "./pages/SettingsPage/Settings";
import Public from "./pages/PublicPage/Public";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/*" element={<UserAuth />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/public/:taskId" element={<Public />} />
        </Routes>
      </BrowserRouter>
      <ToastContainerComponent />
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/year/:year/month/:month" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarPlus } from "react-icons/fa";

interface HeaderProps {
  onCreateAppointment: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateAppointment }) => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    setSelectedMonth(Number(month));
    navigate(`/year/${selectedYear}/month/${month}`);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(Number(year));
    navigate(`/year/${year}/month/${selectedMonth}`);
  };

  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">DocScheduler</h1>
      <div className="flex items-center space-x-4">
        {/* Year Dropdown */}
        <select
          onChange={handleYearChange}
          value={selectedYear}
          className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 10 }, (_, i) => 2019 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        <select
          onChange={handleMonthChange}
          value={selectedMonth}
          className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 12 }, (_, month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <button
          onClick={onCreateAppointment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
        >
          <FaCalendarPlus className="mr-2" />
          New Appointment
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Appointment } from "../types";
import { formatDate, formatTime } from "../utils/dateUtils";
import { FaTimes } from "react-icons/fa";

interface AppointmentModalProps {
  appointment: Appointment;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  onClose,
}) => {
  const startDate = new Date(appointment.start);
  const formattedDate = formatDate(startDate);
  const formattedTime = formatTime(startDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-150"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Patient</span>
              <span className="font-medium">{appointment.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">{formattedTime}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Gender</span>
              <span className="font-medium">{appointment.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Age</span>
              <span className="font-medium">{appointment.age}</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

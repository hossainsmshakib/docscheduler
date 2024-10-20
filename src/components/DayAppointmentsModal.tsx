import React from 'react';
import { Appointment } from '../types';
import { formatDate, formatTime } from '../utils/dateUtils';
import { FaTimes } from 'react-icons/fa';

interface DayAppointmentsModalProps {
  appointments: Appointment[];
  onClose: () => void;
}

const DayAppointmentsModal: React.FC<DayAppointmentsModalProps> = ({ appointments, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] flex flex-col shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {appointments.length > 0 ? formatDate(new Date(appointments[0].start)) : 'Selected Day'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {appointments.length === 0 ? (
            <p className="p-6 text-gray-500 italic">No appointments for this day.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <li key={appointment.id} className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{appointment.name}</p>
                      <p className="text-sm text-gray-500">{formatTime(new Date(appointment.start))}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-500">{appointment.gender}, {appointment.age}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t">
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

export default DayAppointmentsModal;

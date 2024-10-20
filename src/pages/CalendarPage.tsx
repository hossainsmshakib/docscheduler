import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../redux/rootReducer";
import { fetchAppointmentsThunk } from "../redux/slices/appointmentSlice";
import { AppDispatch } from "../redux/store";
import { Appointment } from "../types";
import Header from "../components/Header";
import AppointmentModal from "../components/AppointmentModal";
import CreateAppointmentForm from "../components/CreateAppointmentForm";
import DayAppointmentsModal from "../components/DayAppointmentsModal";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { year, month } = useParams<{ year: string; month: string }>();
  const appointments = useSelector(
    (state: RootState) => state.appointments.appointments
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDayAppointments, setShowDayAppointments] = useState(false);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<
    Appointment[]
  >([]);

  useEffect(() => {
    dispatch(fetchAppointmentsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (year && month) {
      const date = moment(`${year}-${month}-01`, "YYYY-MM-DD").toDate();
      setSelectedDate(date);
    } else {
      setSelectedDate(new Date());
    }
  }, [year, month]);

  const handleNavigate = (date: Date) => {
    const newYear = date.getFullYear();
    const newMonth = date.getMonth() + 1;
    navigate(`/year/${newYear}/month/${newMonth}`);
  };

  const handleSelectEvent = (event: Appointment) => {
    setSelectedAppointment(event);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleCreateAppointment = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleSelectSlot = (slotInfo: {
    start: Date;
    end: Date;
    action: "select" | "click" | "doubleClick";
  }) => {
    const selectedDate = slotInfo.start;
    const appointmentsForDay = appointments.filter(
      (appointment) =>
        new Date(appointment.start).toDateString() ===
        selectedDate.toDateString()
    );
    setSelectedDayAppointments(appointmentsForDay);
    setShowDayAppointments(true);
  };

  const handleCloseDayAppointments = () => {
    setShowDayAppointments(false);
  };

  const eventStyleGetter = (event: Appointment) => ({
    style: {
      backgroundColor: "#3498db",
      color: "#ffffff",
      borderRadius: "2px",
      opacity: 0.8,
      display: "block",
      fontSize: "0.8em",
      padding: "2px 4px",
    },
  });

  const formats = {
    dateFormat: "D",
    dayFormat: "ddd DD",
    monthHeaderFormat: "MMMM YYYY",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onCreateAppointment={handleCreateAppointment} />
      <div className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-lg p-4 md:p-6">
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 200px)" }}
            onNavigate={handleNavigate}
            date={selectedDate || undefined}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable={true}
            eventPropGetter={eventStyleGetter}
            views={[Views.MONTH]}
            formats={formats}
          />
        </div>
      </div>
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
        />
      )}
      {showCreateForm && (
        <CreateAppointmentForm onClose={handleCloseCreateForm} />
      )}
      {showDayAppointments && (
        <DayAppointmentsModal
          appointments={selectedDayAppointments}
          onClose={handleCloseDayAppointments}
        />
      )}
    </div>
  );
};

export default CalendarPage;

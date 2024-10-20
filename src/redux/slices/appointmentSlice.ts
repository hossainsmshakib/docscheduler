import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Appointment } from "../../types";
import { fetchAppointments, createAppointment } from "../../services/api";

interface CalendarState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  appointments: [],
  loading: false,
  error: null,
};

export const fetchAppointmentsThunk = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const response = await fetchAppointments();
    return response;
  }
);

export const createAppointmentThunk = createAsyncThunk(
  "appointments/createAppointment",
  async (appointment: Omit<Appointment, "id">) => {
    const response = await createAppointment(appointment);
    return response;
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch appointments";
      })
      .addCase(createAppointmentThunk.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      });
  },
});

export default appointmentSlice.reducer;

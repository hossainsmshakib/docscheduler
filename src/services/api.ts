import { Appointment } from "../types";

const API_URL = "http://localhost:3001";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await fetch(`${API_URL}/appointments`);
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  return response.json();
};

export const createAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }
  return response.json();
};

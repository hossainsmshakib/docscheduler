export interface Appointment {
  id: string;
  start: Date;
  end: Date;
  name: string;
  gender: "male" | "female";
  age: number;
  time: string;
}

export interface CalendarState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

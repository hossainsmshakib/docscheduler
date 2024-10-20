import React from "react";
import { EventProps } from "react-big-calendar";
import { Appointment } from "../types/index";

const CustomEvent: React.FC<EventProps<Appointment>> = ({ event }) => {
  return (
    <div className="text-xs p-1">
      {event.time} - {event.name}
    </div>
  );
};

export default CustomEvent;

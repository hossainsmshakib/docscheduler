import React from 'react';
import { DateCellWrapperProps } from 'react-big-calendar';

const CustomDayCell: React.FC<DateCellWrapperProps> = ({ children }) => {
  return (
    <div className="h-full overflow-y-auto custom-day-cell">
      {children}
    </div>
  );
};

export default CustomDayCell;

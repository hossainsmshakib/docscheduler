import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createAppointmentThunk } from '../redux/slices/appointmentSlice';
import { AppDispatch } from '../redux/store';
import { Appointment } from '../types/index';

interface CreateAppointmentFormProps {
  onClose: () => void;
}

type AppointmentInput = Omit<Appointment, 'id' | 'start' | 'end'>;

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentInput>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<AppointmentInput> = (data) => {
    const startDateTime = new Date(`${data.time}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const newAppointment: Omit<Appointment, 'id'> = {
      name: data.name,
      gender: data.gender,
      age: data.age,
      time: data.time,
      start: startDateTime,
      end: endDateTime,
    };
    dispatch(createAppointmentThunk(newAppointment));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-modal max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input {...register('name', { required: true })} className="w-full border rounded px-2 py-1" autoComplete="off" />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <select {...register('gender', { required: true })} className="w-full border rounded px-2 py-1">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="text-red-500">This field is required</span>}
          </div>
          <div>
            <label className="block mb-1">Age</label>
            <input type="number" {...register('age', { required: true, min: 0 })} className="w-full border rounded px-2 py-1" autoComplete="off" />
            {errors.age && <span className="text-red-500">This field is required and must be a positive number</span>}
          </div>
          <div>
            <label className="block mb-1">Date and Time</label>
            <input 
              type="datetime-local" 
              {...register('time', { required: true })} 
              className="w-full border rounded px-2 py-1" 
            />
            {errors.time && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentForm;

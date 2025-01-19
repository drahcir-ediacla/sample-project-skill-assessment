"use client";
import React, { useRef, useEffect } from 'react';
import styles from './style.module.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: (event: { target: { name?: string; value: string } }) => void; // Adjusted for flatpickr
}

const DatePicker: React.FC<DatePickerProps> = ({ id, name, className, value, onChange }) => {
  const flatpickrRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const options = {
      dateFormat: 'Y-m-d',
      defaultDate: value || new Date().toISOString().split('T')[0], // Default to current date
      onChange: (selectedDates: Date[], dateStr: string) => {
        if (onChange) {
          onChange({ target: { name, value: dateStr } }); // Pass selected date to parent
        }
      },
    };

    // Initialize flatpickr on the input element
    if (flatpickrRef.current) {
      flatpickr(flatpickrRef.current, options);
    }
  }, [value, name, onChange]);

  return (
    <div className={styles.datePickerBox}>
      <div className={styles.calendarIcon}>
        <i className="fa-solid fa-calendar"></i>
      </div>
      <input
        id={id}
        name={name}
        className={`${styles.customDate} ${styles.active} ${className}`}
        type="text" // Set to "text" since flatpickr controls the value
        ref={flatpickrRef}
        readOnly // Prevent manual editing as flatpickr handles the input
      />
    </div>
  );
};

export default DatePicker;

import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useDispatch } from 'react-redux';
import { setDate } from '../../store/actions';

const Calendar: React.FC = () => {
    const [dateLocal, setDateLocal] = useState<Dayjs | null>(dayjs('2022-04-07'));
    const dispatch = useDispatch();
    
    useEffect(() => {
        const dateAsString = dateLocal ? dateLocal?.format('YYYY-MM-DD').toString() : '';
        dispatch(setDate(dateAsString));
    }, [dateLocal]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="year"
                value={dateLocal}
                onChange={(newDate) => {
                    setDateLocal(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export default Calendar;
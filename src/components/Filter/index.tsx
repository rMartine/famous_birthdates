import React, { useState, useEffect } from 'react';

interface Props {
  date: string;
  updateResults: (searchTerm: string) => void;
}

const Filter: React.FC<Props> = ({ date, updateResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    updateResults(searchTerm);
  }, [searchTerm]);

  const formatDate = (currDate: string) => {
    const date = new Date(currDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate()+1;
    return `Birthdays on ${month} ${day}`;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(event.target.value) || event.target.value === '') {
      setSearchTerm(event.target.value);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 8, width: '100%' }}>
      <div style={{ fontWeight: 'bold', fontSize: 14 }}>{formatDate(date)}</div>
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 'normal', paddingRight: 8 }}>Search</div>
        <input type="text" value={searchTerm} onChange={handleSearchChange} style={{ fontSize: 14, fontWeight: 'normal' }} />
      </div>
    </div>
  );
};

export default Filter;

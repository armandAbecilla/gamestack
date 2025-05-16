// import Button from './UI/Button';
// import Checkbox from './UI/Checkbox';
import Accordion from './UI/Accordion';
import Radio from './UI/Radio';

import { statusOptions } from '../data/dropdowns';
import { useEffect, useState } from 'react';

export default function Sidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    title: '',
    status: '',
  });

  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  function handleStatusSelect(status) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: status,
    }));
  }

  function handleInputChange(e) {
    setTitleInput(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      title: e.target.value,
    }));
  }

  return (
    <div className='flex flex-col'>
      <div className='mb-4 flex flex-col'>
        <label>Search library by title</label>
        <input
          className='mt-2 w-full rounded-sm border border-stone-500 bg-stone-100 px-2 text-lg text-stone-800'
          type='text'
          onChange={handleInputChange}
          value={titleInput}
        ></input>
      </div>

      <Accordion label='Filter by Status' isOpen>
        <div className='flex flex-col gap-1'>
          <Radio
            name='status'
            id='all'
            label='All'
            value='all'
            defaultChecked
            onClick={() => handleStatusSelect('')}
          />
          {statusOptions.map((status) => (
            <Radio
              key={status.value}
              name='status'
              id={status.value}
              label={status.label}
              value={status.value}
              onClick={() => handleStatusSelect(status.value)}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
}

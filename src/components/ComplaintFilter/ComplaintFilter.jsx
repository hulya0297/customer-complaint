/* eslint-disable react/prop-types */
import  { useState } from 'react';
import './complaintFilter.scss';


function ComplaintFilter({ setFilter }) {
    const [filterText, setFilterText] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setFilter(filterText);
       

    };
    

    return (
        <div className="filterContainer">
            <form onSubmit={handleFilterSubmit} className="filterContainer_filterForm">
            <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
                <input
                    type="text"
                    value={filterText}
                    onChange={handleFilterChange}
                    placeholder="Filter complaints"
                    className="filterContainer_filterForm_filterInput" />
                <button type="submit" className="filterContainer_filterForm_filterButton">Filter</button>
                
            </form>

        </div>
    );
}

export default ComplaintFilter;
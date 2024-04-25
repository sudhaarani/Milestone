import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ keyword, searchKeyword, setKeyword, selectedTimeline, fromDate, setFromDate, toDate, setToDate, handleSearchByDate }) => {
  const [selectedOption, setSelectedOption] = useState('text');

  // Function to handle radio button change
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="full-search-container">
      <div className="search-input-container">

        {selectedOption === 'date' ? (
          <div className='date-search-container'>
            <label htmlFor="fromDate">From Date</label>
            <input type="date" id="fromDate" className="date-input" value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}/>
            <label htmlFor="toDate">To Date</label>
            <input type="date" id="toDate" className="date-input" value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
            }}/>
            <div className='magnifying-glass-container'>
              <i class="fa-solid fa-magnifying-glass" 
                onClick={() => {handleSearchByDate(selectedTimeline.id, fromDate, toDate)}} />
            </div>
          </div>
        ) : (
          <input
            className="search-bar"
            type="text"
            value={keyword}
            placeholder="Milestone Search"
            onChange={(e) => {
              searchKeyword(selectedTimeline.id, e.target.value);
              setKeyword(e.target.value);
            }}/>
        )}
      </div>

      <div className="radio-container">
        <input type="radio" id="textRadio" name="inputType" value="text" checked={selectedOption === 'text'} onChange={handleRadioChange} />
          <label htmlFor="textRadio">Search By Text</label>

        <input type="radio" id="dateRadio" name="inputType" value="date" checked={selectedOption === 'date'} onChange={handleRadioChange} />
        <label htmlFor="dateRadio">Search By Date</label>
      </div>

    </div>
  );
};

export default SearchBar;
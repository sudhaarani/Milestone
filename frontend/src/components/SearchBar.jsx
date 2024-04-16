import React,{useState} from 'react';

const SearchBar = ({ keyword, searchKeyword,setKeyword,selectedTimeline,fromDate, setFromDate,
  toDate, setToDate,handleSearchByDate }) => {
  const BarStyle = { width: "20rem", background: "#F0F0F0", border: "none", padding: "0.5rem" };
  
  const [selectedOption, setSelectedOption] = useState('text');

  // Function to handle radio button change
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  return (
    <div>
      <input type="radio" id="textRadio" name="inputType" value="text" checked={selectedOption === 'text'} onChange={handleRadioChange} />
      <label for="textRadio">Search By Text</label>
      <input type="radio" id="dateRadio" name="inputType" value="date" checked={selectedOption === 'date'} onChange={handleRadioChange} />
      <label for="dateRadio">Search By Date</label>
      
      {selectedOption === 'date' ? (
        <div>
          <label for="fromDate">From Date:</label>
          <input type="date" id="fromDate" value={fromDate} onChange={(e) => {
          setFromDate(e.target.value)
          }} />
          <label for="toDate">To Date:</label>
          <input type="date" id="toDate" value={toDate} onChange={(e) => {
          setToDate(e.target.value)
          }} />
          <button onClick={()=>{handleSearchByDate(selectedTimeline.id,fromDate,toDate)}}>Search</button>
        </div>
      ) : (
        <input style={BarStyle} type="text" value={keyword}
        placeholder="Enter Title To Search" onChange={(e) => {
          searchKeyword(selectedTimeline.id,e.target.value)
          setKeyword(e.target.value)
        }}/>
      )}
    </div>
    
       /* <input 
        name
        style={BarStyle}
        key="search-bar"
        value={keyword}
        placeholder="Enter Text or Date(YYYY-MM-DD)"
        onChange={(e) => {
          searchKeyword(selectedTimeline.id,e.target.value)
          setKeyword(e.target.value)
        }}
        />   */
    
  );
}

export default SearchBar;
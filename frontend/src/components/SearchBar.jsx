import React from 'react';

const SearchBar = ({ keyword, searchKeyword,setKeyword }) => {
  const BarStyle = {width:"20rem",background:"#F0F0F0", border:"none", padding:"0.5rem"};
  return (
    <input 
      name
      style={BarStyle}
      key="search-bar"
      value={keyword}
      placeholder={"search bar"}
      onChange={(e) => {
        searchKeyword(e.target.value)
        setKeyword(e.target.value)
      }}
    />
  );
}

export default SearchBar;
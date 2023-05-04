import { useState } from "react";
import React from "react";
const listOfText = ["hello", "hi", "snap", "chat", "face", "book"];
const DataContext = React.createContext({
  valueEntered: [],
  getTheValue: () => {},
});

export const DataContextProvider = (props) => {
  const [filterValue, setFilterValue] = useState([]);
  const [valueEntered, setValueEntered] = useState();
  //setValueEntered(props.valueEntered);

  const getTheValue = (value) => {
    //setValueEntered(value);
    setFilterValue(listOfText.filter((val) => val.includes(value)));
    //return filterValue;
  };

  return (
    <DataContext.Provider
      value={{
        valueEntered: filterValue,
        getTheValue: getTheValue,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;

import { useState } from "react";
import "./App.css";
import Select from "./components/Select";
const options = [
  { name: "first", value: 1 },
  { name: "second", value: 2 },
  { name: "third", value: 3 },
  { name: "fourth", value: 4 },
  { name: "fifth", value: 5 },
];
function App() {
  const [value, setValue] = useState(options[0]);
  return (
    <div className="App">
      {/* <StockExchange></StockExchange>
      <footer>US Stock Exchange</footer> */}
      {/* <Select value={value} options={options} onChange={o=> setValue(o)} /> */}
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";
const API_KEY = "ch5bt59r01qjg0aurqp0ch5bt59r01qjg0aurqpg";
const EXCHANGE = "US";
const STOCK_SYMBOL_URI = `https://finnhub.io/api/v1/stock/symbol?exchange=${EXCHANGE}&token=${API_KEY}`;
const MAX_CHECKED_COUNT = 3;

/* Filter Component to show only selection of DATE ranges and Stock Symabols */
const Filter = ({ populateChart }) => {
  const [stockSymbols, setStockSymbol] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const fetchStockSymbol = useRef(()=>{});

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  /* we can have few more changes to this method
  such as having validation with From date can not be after To date
  Null check over fields
  Feed back messgae for users on null/empty selection
  */
  const handleDateChange = (selectedDate, dateType) => {
    if ("fromDate" === dateType) {
      setSelectionRange((prev) => {
        return {
          startDate: selectedDate,
          endDate: prev.endDate,
        };
      });
    } else {
      setSelectionRange((prev) => {
        return {
          startDate: prev.startDate,
          endDate: selectedDate,
        };
      });
    }
  };
  /* Fetching the API call over here to load the  STOCK symbols on load/on component mount
  Can be move to a common place as well. May be a custom Hook or if the project grows can be kept inside Redux Slice area*/
  
  fetchStockSymbol.current = async () => {
    try {
      const fetchStockSymbol = await fetch(STOCK_SYMBOL_URI);
      const getJsonStockSymbol = await fetchStockSymbol.json();
      //showing only 30 data For demo purpose.
      setStockSymbol(getJsonStockSymbol.slice(0, 30));
      setIsLoading(!isLoading);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //Fetch the STOCK symbols on load of the screen.
    fetchStockSymbol.current();
  }, []);
  const handleOnCheck = (e) => {
    const { name: stockSymbol, checked } = e.target;
    const newCount = checked ? checkCount + 1 : checkCount - 1;
    setCheckCount(newCount);

    const updatedStockSymbols = stockSymbols.map((stSym) =>
      stSym.displaySymbol === stockSymbol
        ? { ...stSym, isChecked: checked }
        : stSym
    );

    setStockSymbol(updatedStockSymbols);
  };
  const handleShowChart = () => {
    const selectedStocks = [];
    stockSymbols.forEach((chkdStock) => {
      if (chkdStock.isChecked) {
        selectedStocks.push(chkdStock.symbol);
      }
    });
    const unixTimeStamp = {
      fromDate: Math.floor(new Date(selectionRange.startDate).getTime() / 1000),
      toDate: Math.floor(new Date(selectionRange.endDate).getTime() / 1000),
    };
    populateChart(selectedStocks, unixTimeStamp);
  };
  if (isLoading) {
    return <p>Please wait.. We are fetching data for you</p>;
  }
  return (
    <>
      {!isLoading && (
        <div className="stockExchangeFilter">
          <div className="stockExchangeFilter_datePicker">
            <div className="stockExchangeFilter_datePicker_FromDate">
              <label>From</label>
              <ReactDatePicker
                selected={selectionRange.startDate}
                // onSelect={() => handleDateSelect(selectionRange, "fromDate")}
                onChange={(date) => handleDateChange(date, "fromDate")}
              />
            </div>

            <div className="stockExchangeFilter_datePicker_ToDate">
              <label>To</label>
              <ReactDatePicker
                selected={selectionRange.endDate}
                // onSelect={() => handleDateSelect(selectionRange, "toDate")}
                onChange={(date) => handleDateChange(date, "toDate")}
              />
            </div>
          </div>
          <div className="stockExchangeFilter_stockSymbol">
            <button className="button" onClick={handleModalOpen}>
              Filter stocks
            </button>
            {isModalOpen && (
              <Modal onClose={handleModalClose}>
                <h2>Stock Symbols</h2>
                <p>
                  Choose upto <strong>{MAX_CHECKED_COUNT}</strong> symbols that
                  you would like to view the time series for.
                </p>
                <ul>
                  {stockSymbols.length > 0 &&
                    stockSymbols.map((stcSymb, idx) => {
                      return (
                        <li key={idx}>
                          <label>
                            <input
                              type="checkbox"
                              name={stcSymb.displaySymbol}
                              onChange={handleOnCheck}
                              checked={stcSymb.isChecked || false}
                              disabled={
                                checkCount >= MAX_CHECKED_COUNT &&
                                !stcSymb.isChecked
                              }
                            />
                            {stcSymb.description}{" "}
                            {`( ${stcSymb.displaySymbol})`}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </Modal>
            )}
          </div>
          {checkCount <= MAX_CHECKED_COUNT && checkCount > 0 && (
            <button
              className="button stockExchangeFilter_submit"
              onClick={handleShowChart}
            >
              Show Chart
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Filter;

import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import Filter from "./Filter";
//Suggested over google to use this. To properly use react-chartjs-2
Chart.register(...registerables);
//Key being generated for my account and exposed over here. In real time we need proper authentication for sure.
const API_KEY = "ch5bt59r01qjg0aurqp0ch5bt59r01qjg0aurqpg";
//Easy to maintain and less use of switch case.
const BORDER_COLOR = {
  o: "rgb(53, 162, 235)",
  h: "rgba(255, 0, 0)",
  l: "rgba(255, 255, 0)",
  c: "rgba(128, 128, 128)",
};
const BACKGROUND_COLOR = {
  o: "rgba(53, 162, 235, 0.5)",
  h: "rgba(255, 0, 0, 0.5)",
  l: "rgba(255, 255, 0, 0.5)",
  c: "rgba(128, 128, 128, 0.5)",
};

/* here we will keep only the chart specific details */
const StockExchange = () => {
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [chartResult, setChartResult] = useState([]);
  const [chartDataSets, setChartDataSets] = useState([]);

  //As we do not want this to be recreated when ever there is a state update/ reload of component
  const processChartData = useRef(() => {});
  processChartData.current = (e) => {
    const filterType = e?.target?.value || "o";
    const backgroundColor = BACKGROUND_COLOR[filterType];
    const borderColor = BORDER_COLOR[filterType];
    const chartDataPlotting = [];
    /* 
      Processing here to return a Line chart specific data
      e.g [{
        labels: [],--- X axis
        datasets: [],--- Y axis
        borderColor: null,
        backgroundColor: null,
      }]
     */
    chartResult.forEach((chart) => {
      const data = {
        labels: [],
        datasets: [],
        borderColor: null,
        backgroundColor: null,
      };
      data.labels = chart.data.t;
      const datasetObj = {
        label: chart.symbol,
        data: chart.data[filterType],
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      };
      data.datasets.push(datasetObj);
      chartDataPlotting.push(data);
    });
    setChartDataSets(chartDataPlotting);
    if (isChartLoading) {
      setIsChartLoading(!isChartLoading);
    }
  };
  //Expecting to be changed every time there is a `stock/candle` call
  useEffect(() => {
    processChartData.current();
  }, [chartResult]);

  /* Get the details from Filter component once all the required fields are filled
    stockSymbols: String[], e.g: ['GRWLF', 'RSLCS', 'WINT']
  dateRange: {fromDate: UNIX TimeStamp(Number), toDate: UNIX TimeStamp(Number)}, e.g {fromDate: 1682701970, toDate: 1682701970}]
  */
  function handlerChart(stockSymbols, dateRange) {
    setIsChartLoading(!isChartLoading);
    function fetchStockPrices(stockSymbols, fromDate, toDate) {
      const fetchPromises = stockSymbols.map(async (symbol) => {
        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${fromDate}&to=${toDate}&token=${API_KEY}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          return { symbol, data };
        } catch (error) {
          return { symbol, error };
        }
      });

      //Need all the api response at once hence.
      return Promise.allSettled(fetchPromises);
    }

    fetchStockPrices(stockSymbols, dateRange.fromDate, dateRange.toDate)
      .then((results) => {
        const successfulResults = results.filter(
          (result) =>
            result.status === "fulfilled" && result.value.data.s === "ok"
        );
        const filteredChartData = [];
        successfulResults.forEach((data) => {
          filteredChartData.push(data.value);
        });
        // Process the successful Chart detail after
        setChartResult((prev) => filteredChartData);
        const failedResults = results.filter(
          (result) => result.status === "rejected"
        );
        // Handle the failed requests
        console.error(failedResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="exchangeSection">
      <h1>US Stock Exchange</h1>
      <div className="exchangeSection_filter">
        <Filter populateChart={handlerChart}></Filter>
      </div>
      <hr></hr>
      {!isChartLoading ? (
        <>
          {chartDataSets.length > 0 && (
            <select onChange={processChartData.current}>
              <option value="o">Open Prices</option>
              <option value="h">High Prices</option>
              <option value="l">Low Prices</option>
              <option value="c">Close Prices</option>
            </select>
          )}
          {chartDataSets.length > 0 &&
            chartDataSets.map((data, idx) => {
              return (
                <div className="exchangeSection_chartHolder" key={idx}>
                  <Line data={data} />
                </div>
              );
            })}
        </>
      ) : (
        <p>Please wait.. Charts are getting processed.</p>
      )}
    </div>
  );
};

export default StockExchange;

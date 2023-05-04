import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataContext from "./store/data-context";
import finnhub from "finnhub";

const Filtered = (props) => {
  const apiKey = finnhub.ApiClient.instance.authentications['api_key']
  console.log(apiKey);
  const client = new finnhub.DefaultApi(apiKey);

  const [quote, setQuote] = useState(null);

  useEffect(() => {
    client.quote("AAPL", (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        setQuote(data);
      }
    });
  }, []);

  // const { filterValue } = props;
  console.log(props[0]);
  //const context = useContext(DataContext);
  const vales =
    useSelector((state) => {
      console.log(state);
      return state.valueEntered;
    }) || [];
  return vales.map((val) => {
    return <p key={val}>{val}</p>;
  });
};
export default Filtered;

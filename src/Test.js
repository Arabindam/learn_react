import { useEffect, useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);
  const [a, ...rst] = ["A", "1", "2"];
  console.log(a);
  console.log(typeof rst.join(""));
  useEffect(() => {
    // document.title = `Count: ${count}`;
    console.log("Hello");
  }, []);

  return (
    <>
    <div>
      <h1>
        <p>helllp</p>
      </h1> 
      <p href="#">Hello</p>
      <p>Hello</p>
      <p>Hello</p>
      <p href="#">Hello</p>
    </div>
    <p>heeey m out</p>
    </>
  );
};

export default Test;

import money from "./img/money.png";
import "./App.css";
import Currency from "./components/Currency";
import { useEffect, useState } from "react";

function App() {
  const [currencyChoice, setCurrencyChoice] = useState([]);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("THB");

  const [amount, setAmount] = useState(1);
  const [exChangeRate, setExChangeRate] = useState(0);

  const [checkfromCurrency, setCheckfromCurrency] = useState(true);
  let fromAmount, toAmount;

  if (checkfromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exChangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exChangeRate).toFixed(2);
  }

  // fecth = ร้องขอ
  // useEffect check ว่าต้องการให้เกิดการเปลี่ยนแปลงอะไร
  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyChoice([...Object.keys(data.rates)]);
        setExChangeRate(data.rates[toCurrency]);
      });
    // []  ข้อมูลแค่ครั้งเดียวในตอน render
  }, [fromCurrency, toCurrency]);

  const amountFromCurrency = (e) => {
    setAmount(e.target.value);
    setCheckfromCurrency(true);
  };
  const amountToCurrency = (e) => {
    setAmount(e.target.value);
    setCheckfromCurrency(false);
  };

  return (
    <div>
      <img src={money} alt="logo" className="money-img" />
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <div className="container">
        {/* ต้นทาง */}
        <Currency
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />

        <div className="equal"> = </div>

        {/* ปลายทาง */}
        <Currency
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;

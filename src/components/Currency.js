import React from "react";
import "./Currency.css";

const Currency = (props) => {
  const { currencyChoice, selectCurrency, changeCurrency, amount } = props;

  return (
    <div className="currency">
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyChoice.map((choice) => (
          <option value={choice} key={choice}>
            {choice}
          </option>
        ))}
      </select>
      <input type="number" value={amount} />
    </div>
  );
};

export default Currency;

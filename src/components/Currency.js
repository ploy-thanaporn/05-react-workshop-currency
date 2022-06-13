import React from "react";
import "./Currency.css";

const Currency = (props) => {
  const {
    currencyChoice,
    selectCurrency,
    changeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <div className="currency">
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyChoice.map((choice) => (
          <option value={choice} key={choice}>
            {choice}
          </option>
        ))}
      </select>
      <input type="number" value={amount} onChange={onChangeAmount} />
    </div>
  );
};

export default Currency;

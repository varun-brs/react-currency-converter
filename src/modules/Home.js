import React, { useState, useEffect } from "react";
import { HttpGet } from "../core/store/httpHelper";
import { CurrencyList } from "../core/common/helpers";

export const Home = () => {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("INR");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  useEffect(() => {
    // Get conversion rates and calculate based on currencies and amount
    const getConversionRates = async () => {
      let conversionRates = await HttpGet(currencyOne);
      let exchangeAmount = conversionRates?.rates[currencyTwo];
      let amtTwo =
        (amountOne >= 0 && (exchangeAmount * amountOne).toFixed(2)) || "";
      setAmountTwo(amtTwo);
      setExchangeRate(exchangeAmount);
    };
    getConversionRates();
  }, [currencyOne, currencyTwo, amountOne]);

  const handleCurrencyOneChange = (e) => {
    setCurrencyOne(e.target.value);
  };

  const handleCurrencyTwoChange = (e) => {
    setCurrencyTwo(e.target.value);
  };

  const handleAmountOneChange = (e) => {
    setAmountOne(e.target.value);
  };

  const toggleCurrency = () => {
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
  };

  const CurrencyOptions = () => {
    return CurrencyList.map((option, index) => (
      <option key={index}>{option}</option>
    ));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card ">
            <div className="card-header">
              <h1 className="card-title h3">Exchange Rate Calculator</h1>
              <p className="card-text">
                Choose the currency and the amounts to get the exchange rate
              </p>
            </div>
            <div className="card-body">
              <div className="row justify-content-md-center">
                <div className="col col-lg-3 currency">
                  <select
                    className="w-50"
                    value={currencyOne}
                    onChange={handleCurrencyOneChange}
                  >
                    <CurrencyOptions />
                  </select>
                </div>
                <div className="col col-lg-3 currency">
                  <input
                    placeholder="0"
                    type="number"
                    className="w-100 border"
                    value={amountOne}
                    onChange={handleAmountOneChange}
                  />
                </div>
              </div>

              <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                  <button
                    className="btn btn-md btn-dark background-none border-0 toggle-currency"
                    onClick={toggleCurrency}
                  >
                    &#x0296E;
                  </button>
                </div>
                <div className="col col-lg-3">
                  <p className="rate text-end">
                    1 {currencyOne} = {exchangeRate} {currencyTwo}
                  </p>
                </div>
              </div>

              <div className="row justify-content-md-center">
                <div className="col col-lg-3 currency">
                  <select
                    className="w-50"
                    value={currencyTwo}
                    onChange={handleCurrencyTwoChange}
                  >
                    <CurrencyOptions />
                  </select>
                </div>
                <div className="col col-lg-3 currency">
                  <input
                    type="number"
                    className="w-100  border"
                    value={amountTwo}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

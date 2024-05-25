import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const[amount,setAmount]=useState(1);
  const[fromCurrency,setFromCurrency]=useState("USD");
  const[toCurrency,settoCurrency]=useState("INR");
  const[convertedAmount,setConvertedAmount]=useState(null);
  const[exchangerate,setExChangeRate]=useState(null);
useEffect(()=>
{
 const getExchangeRate= async()=>
    {
try{
let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
const res= await axios.get(url);
console.log(res);
setExChangeRate(res.data.rates[toCurrency])
}
catch(error)
{
  console.log("Eroor Fetching ",error);
}
    };
    getExchangeRate();
},[fromCurrency,toCurrency])
const handleclick=(e)=>
{
  const value=parseFloat(e.target.value)
  setAmount(isNaN (value)? 0 : value)
}
const handlefrom=(e)=>
{
  setFromCurrency(e.target.value);
}
const handleto=(e)=>
{
  settoCurrency(e.target.value);
}
useEffect(()=>
{if(exchangerate!==null)
  {
    setConvertedAmount((amount*exchangerate).toFixed(2))
  }

},[amount,exchangerate])
  return (
    <>
     <div className="container">
      <div className="minicontainer">
        <div className="inpuconatiner">
          <div className="image">
          <img src="/src/assets/image/pay.png" alt="" /></div>
        <h1>CURRENCY CONVERTER</h1>
        <div className="inpus">
          <label htmlFor="amoun"> Amount:</label>
          <input type="text" id='amoun' value={amount} onChange={handleclick}  />
        </div>
        <div className="fromcur">
          <label htmlFor="fromcur">From Currency:</label>
          <select name="" id="fromcur" value={fromCurrency} onChange={handlefrom} >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBR">GBR - BRitish pound Streling </option>
            <option value="JPY">JPY - Japanaes Yen</option>
            <option value="AUD">AUD - Australian  Dollar</option>
            <option value="CAD">CAD - Canadian Dollars</option>
            <option value="INR">INR - Indaian rupee</option>
            <option value="BRL">BRL - Brxzillian Real</option>
            <option value="ZAR">ZAR - South Afrian Rand</option>
          </select>
        </div>
        <div className="tocur">
          <label htmlFor="tocur">To Currency:</label>
          <select name="" id="tocur" onChange={handleto} value={toCurrency} >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBR">GBR - BRitish pound Streling </option>
            <option value="JPY">JPY - Japanaes Yen</option>
            <option value="AUD">AUD - Australian  Dollar</option>
            <option value="CAD">CAD - Canadian Dollars</option>
            <option value="INR">INR - Indaian rupee</option>
            <option value="BRL">BRL - Brxzillian Real</option>
            <option value="ZAR">ZAR - South Afrian Rand</option>
          </select>
        </div>
        <div className="finalvalue">
          <p> {amount} {fromCurrency} is Equal To {convertedAmount} {toCurrency} </p>
        </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default App

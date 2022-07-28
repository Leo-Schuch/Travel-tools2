import './App.css';
import React, { useEffect, useMemo, useState } from 'react';

import { formatToBRCurrency, formatToUsCurrency } from './utils/currency';


const BASE_URL = 'https://marketdata.tradermade.com/api/v1/convert?api_key=0SIBO8_fjWJkSyJ0Z_6E&from=USD&to=BRL&amount=1'



function App() {

  const [amount, setAmount] = useState('0')
  const [paymentType, setPaymentType] = useState('')
  const [taxType, setTaxType] = useState('')
  const [currentQuote, setCurrentQuote] = useState('')
  const [resultIof, setResultIof] = useState(0)
  const [resultTax, setResultTax] = useState(0)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setCurrentQuote(data.quote))
  }, [])


  function handleSubmit(event) {
    event.preventDefault()


    if (amount <= 500) {

      return

    }


    const updatedValue = amount - 500
    if (paymentType === 'cash') {
      setResultIof(amount * (1.1 / 100))
    }
    if (taxType === 'declare') {
      setResultTax((updatedValue * (50 / 100)))
    }
    if (taxType === 'tax-without-declare') {
      setResultTax(amount)
    }
    if (taxType === 'no-tax-without-declare') {
      setResultTax(0)
    }

    if (paymentType === 'credit-card') {
      setResultIof(amount * (6.38 / 100))
    }
    if (taxType === 'declare') {
      setResultTax((updatedValue * (50 / 100)))
    }

    if (taxType === 'tax-without-declare') {
      setResultTax(amount)
    }


    if (taxType === 'no-tax-without-declare') {
      setResultTax(0)
    }

  }
  const total = useMemo(() => {
    return (resultTax) + (resultIof) + (amount)
  }, [resultTax, resultIof, amount]
  )




  return (
    <>
      <form onSubmit={handleSubmit} className='flex-container'>
        <h1>Travel Tools</h1>
        <div>
          <label>Valor gasto em dolar:<input type='number' className='input' value={amount}  onChange={(event) => setAmount(Number(event.target.value))} /> </label>
        </div>
        <div>
          <label> Forma de pagamento
            <select value={paymentType} onChange={(event) => setPaymentType(event.target.value)}>
              <option value='cash'>
                Dinheiro
              </option>
              <option value='credit-card'>
                Cartão de crédito
              </option>


            </select>
          </label>
        </div>
        <div>
          <label> Impostos
            <select value={taxType} onChange={(event) => setTaxType(event.target.value)}>
              <option value='declare'>
                Declarar
              </option>
              <option value='tax-without-declare'>
                Não declarar e ser multado
              </option>
              <option value='no-tax-without-declare'>
                Não declarar e não ser taxado
              </option>

            </select>
          </label>
        </div>
        <button type='submit' className='botao'>
          Calcular
        </button>






        <div className='resultIof'><label >Resultado IOF: {formatToUsCurrency(resultIof)} </label></div>

        <div className='resultTax'><label>Resultado da taxa: {formatToUsCurrency(resultTax)} </label></div>

        <div className='resultIofBrl'><label>Valor total IOF em reais: {formatToBRCurrency(currentQuote * resultIof)}</label></div>

        <div className='resultIofUsd'><label>Valor total Taxa em reais: {formatToBRCurrency(currentQuote * resultTax)}</label></div>

        <div className='total'><label>valor total: {formatToUsCurrency(total)}</label></div>

        <div className='totalRs'><label>valor total em reais: {formatToBRCurrency(total * currentQuote)}</label></div>
      </form>
    </>

  );

}




export default App;

import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import ProductManager from './components/ProductManeger';
import { formatToBRCurrency, formatToUsCurrency } from './utils/currency';



const BASE_URL = 'https://marketdata.tradermade.com/api/v1/convert?api_key=cw1bjUaX7yekv4yIvmat&from=USD&to=BRL&amount=1'



function App() {
  //O useState nos permite criar estados em um componente criado a partir de uma função, assim como o state presente em componentes criados a partir de classes
  const [amount, setAmount] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [taxType, setTaxType] = useState('declare')
  const [currentQuote, setCurrentQuote] = useState('')
  const [resultIof, setResultIof] = useState(0)
  const [resultTax, setResultTax] = useState(0)
  const [canShowResult, setCanShowResult] = useState(false)
  

  
  
  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => setCurrentQuote(data.quote))
    
  }, []) //useEffect para importar os valores da api


  function handleSubmit(event) {
    event.preventDefault() //Registra o valor atual do elemento de entrada(input) sempre que o formulário for enviado; Impede o comportamento padrão do formulário HTML de navegar para uma nova página

    setCanShowResult(true) // if utilizado para prosseguir com os calculos se o valor for acima de 500 usd

    if (amount <= 500) {
      alert('Valor abaixo de 500USD não é tributado')
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
      setResultTax(updatedValue)
    }
    if (taxType === 'no-tax-without-declare') {
      setResultTax(0)
    }
    if (paymentType === 'credit-card') {
      setResultIof(amount * (6.38 / 100))

    }
    
  }
 const total = useMemo(() => { //useMemo executa a função inicialmente e somente executa novamente caso as dependências informadas sejam alteradas
    return (resultTax) + (resultIof) + (amount)
  }, [resultTax, resultIof, amount] // <array de dependência
  )

  return (
    
    
    <div className='container'>
      
      <form onSubmit={handleSubmit} className='flex-container'>
        <h1>Travel Tools</h1>
        <div>
          <label>Valor gasto em dolar:<input inputMode='numeric' className='input' value={amount} onChange={(event) => setAmount(Number(event.target.value))} /> </label>
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

        <div >
          <button type='submit'>
            Calcular
          </button>
        </div>

      </form>
      {canShowResult && (
        <div className='container-result'>
          <div className='resultIof'>
            <label>Resultado IOF: {formatToUsCurrency(resultIof)} </label>
          </div>
          <div className='resultTax'>
            <label>Resultado da taxa: {formatToUsCurrency(resultTax)} </label>
          </div>
          <div className='resultIofBrl'>
            <label>Valor total IOF em reais: {formatToBRCurrency(currentQuote * resultIof)}</label>
          </div>
          <div className='resultIofUsd'>
            <label>Valor total Taxa em reais: {formatToBRCurrency(currentQuote * resultTax)}</label>
          </div>
          <div className='total'>
            <label>valor total: {formatToUsCurrency(total)}</label>
          </div>
          <div className='totalRs'>
            <label>valor total em reais: {formatToBRCurrency(total * currentQuote)}</label>
          </div>
        </div>
      )}
      <div> <ProductManager/></div>
    </div>
    
    
  );

}




export default App;

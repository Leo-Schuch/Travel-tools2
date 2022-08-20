import '../../src/App.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../components/Product';
import { formatToBRCurrency, formatToUsCurrency } from '../utils/currency';
import './Products'
import { useNavigate } from 'react-router-dom';




const BASE_URL = 'https://marketdata.tradermade.com/api/v1/convert?api_key=4R0aSgdEPuw1lPX2AmQd&from=USD&to=BRL&amount=1'



function Home() {
  //O useState nos permite criar estados em um componente criado a partir de uma função, assim como o state presente em componentes criados a partir de classes
  const [amount, setAmount] = useState(0)
  const [paymentType, setPaymentType] = useState('cash')
  const [taxType, setTaxType] = useState('declare')
  const [currentQuote, setCurrentQuote] = useState('')
  const [resultIof, setResultIof] = useState(0)
  const [resultTax, setResultTax] = useState(0)
  const [canShowResult, setCanShowResult] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [stateTax, setStateTax] = useState('georgiaTax')
  const [resultStateTax, setResultStateTax] = useState(0)


  
    const navigate = useNavigate();
  
    const navigateToProducts = () => {
      
      navigate('/products');
    };


  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setCurrentQuote(data.quote))

  }, []) //useEffect para importar os valores da api

 
  function handleSubmit(event) {
    event.preventDefault() //Registra o valor atual do elemento de entrada(input) sempre que o formulário for enviado; Impede o comportamento padrão do formulário HTML de navegar para uma nova página
    

    if (amount <= 500) {
      setCanShowResult(false)
      setErrorMessage('Valor abaixo de 500USD não é tributado')
      return
    }
    setCanShowResult(true)// if utilizado para prosseguir com os calculos se o valor for acima de 500 usd
    //
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

    // taxa estadual
    if (stateTax === 'georgiaTax') {
      setResultStateTax(amount * (8 / 100))
    }

    if (stateTax === 'floridaTax') {
      setResultStateTax(amount * (7.5 / 100))
    }

    if (stateTax === 'californiaTax') {
      setResultStateTax(amount * (10.5 / 100))
    }

    if (stateTax === 'texasTax') {
      setResultStateTax(amount * (8.25 / 100))
    }

  }

  const total = useMemo(() => {
    return resultTax + resultIof + amount + resultStateTax

  }, [resultTax, resultIof, amount, resultStateTax]

  )

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='flex-container'>
        <h1>Travel Tools</h1>
        <div>
          <Product  handleSelectChange={setAmount}/>
          <button type='submit' className='newProduct' onClick={navigateToProducts}>
            Criar
          </button>
          
        
          
          
          <label>Valor gasto em dolar:<input inputMode='numeric' className='input' value={amount} onChange={(event) => {

            setAmount(Number(event.target.value))
          }}
          /> </label>
          
        </div>
        <div>
          <label> Estado da compra
            <select value={stateTax} onChange={(event) => setStateTax(event.target.value)}>

              <option value='georgiaTax'>
                GA
              </option>
              <option value='floridaTax'>
                FL
              </option>
              <option value='californiaTax'>
                CA
              </option>
              <option value='texasTax'>
                TX
              </option>

            </select>
          </label>

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
      {!canShowResult && (<p>{errorMessage}</p>)}
      {canShowResult && (
        <div className='container-result'>

          <div className='resultIof'>
            <label>Resultado IOF: {formatToUsCurrency(resultIof)} </label>
          </div>
          <div>
            <label>Resultado imposto do estado: {formatToUsCurrency(resultStateTax)}</label>
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


    </div>
  );
}

export default Home;

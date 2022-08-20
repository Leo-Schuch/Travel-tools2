import React, { useState } from 'react'
import './Users.css'
import {setData} from '../dao/dao-service'
import { useNavigate } from 'react-router-dom';




function Users() {
    const [value, setValue] = useState();
    const [name, setName] = useState();
    const [type, setType] = useState();
    const handleChangeValues = (values) => {
    }
    const buttonClickHandler = async(event)=>{
      event.preventDefault()
      await setData("produtos", {
        name,
        value,
        type
      
      })
      alert("Item cadastrado com sucesso")
    }

    const navigate = useNavigate();
  
const navigateToHome = () => {
  // 👇️ navigate to /contacts
  navigate('/');
};
    

  return (
    <div className='container'>
      <form className='flex-container'>
        <h1>Cadastro de itens</h1>
        <div>
          <label> Cadastrar item
        <input 
        type="text"
        name='name'
        
        onChange={(event) => setName(event.target.value)}
        />
        </label>
        </div>
        <div>
          <label> valor
          <input 
        type="text"
        name='cost'
        
        onChange={(event) => setValue(event.target.value)}
        />
          </label>
        </div>
        <div>
          <label> tipo de produto
          <input 
        type="text"
        name='category'
        
        onChange={(event) => setType(event.target.value)}
        />
          </label>
        </div>
        <div>
        <button onClick={buttonClickHandler}>Cadastrar</button>
        </div>
        <div>
          <button className='newProduct' onClick={navigateToHome}>Voltar</button>
        </div>
      </form>
    </div>
  )
}

export default Users
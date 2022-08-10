
function Product({ id, name, value }) {
console.log('name', 'id', 'value')
return (

        <div className='task__body'>
            <h2>{name}</h2>
            <p>{value}</p>
        </div>

    )
  
}

export default Product

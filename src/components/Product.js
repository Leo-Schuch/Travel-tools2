import { useEffect, useState } from "react";
import { getAllDocumentsAt } from "../dao/dao-service";

const Product = ({ handleSelectChange }) => {
    const [products, setProducts] = useState([0]);
    
    const getProducts = async () => {
        const products = await getAllDocumentsAt('produtos');
        setProducts(products);
    };

    const onSelectChange = (event) => handleSelectChange(Number(event.target.value));

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <select id="products" onChange={onSelectChange} >
                {products.map((product) => {
                    return (
                        <option id={product.id} value={product.value}>{product.name}</option>
                    )
                })}
            </select>
        </div>

    );
};

export { Product };

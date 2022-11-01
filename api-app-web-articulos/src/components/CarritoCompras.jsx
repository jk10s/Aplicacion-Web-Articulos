import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CarritoCompras = ({cartItems,handleAddProduct,handleRemoveProduct}) => {

    const [data, setData] = useState({fecha: Date(),cartItems})
    const URL = "http://localhost:5000/ventas"

    let fecha = Date();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(URL,data);
        if (response.status === 201) {
           console.log("Insertado Correctamente")
            history.push('/')
        }else {
            console.log("Error")
        }
    }
    const totalPrecio = cartItems.reduce((precio, item) => precio + item.quantity * item.precio, 0)

   
    
  return (
    <div className='card-items'>
        <div className='card-item-header'>
            <p>Carrito de compras</p>
        </div>
        {cartItems.length === 0 && (
            <div>El carrito esta vacio</div>
        )}
        
        <div className='content-general'>
        {cartItems.map((item)=>(
            <div key={item.id} className='card-product'>
                <img src={item.Imagen} alt="" />
                <p>{item.descripcion}</p>
                <p>Stock: {item.stock}</p>
                <div className="card-product-function">
                    <button className='btn1' onClick={() => handleAddProduct(item)}>+</button>
                    <button className='btn1' onClick={() => handleRemoveProduct(item)}>-</button>
                </div>
                <div className='card-product-precio'>
                    {item.quantity} * ${item.precio}
                </div>
               
            </div>
        ))}
       
        </div>

        <button onClick={handleSubmit}>Completar venta</button>
                <div className='card-product-precio'>
                    <p>Precio Total: ${totalPrecio} </p>
                </div>
    </div>
  )
}

export default CarritoCompras
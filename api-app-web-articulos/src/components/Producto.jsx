import React from 'react'

const Producto = ({item, handleAddProduct}) => {
  return (
    <div className='card-product'>
    <img src={item.Imagen} alt="" />
    <p>{item.descripcion}</p>
    <p>${item.precio}</p>
    <p>Stock: {item.stock}</p>
    <button className='btn1' onClick={() => handleAddProduct(item)}>Agregar al carrito</button>
</div>
  )
}

export default Producto
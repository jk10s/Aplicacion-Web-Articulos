import React from 'react'
import { Link } from 'react-router-dom';

const Navegacion = () => {
  return (
    <div className="nav">
        <nav className="menu-principal">
            <Link to="/">Lista de productos</Link>
            <Link to="ListaVentas">Lista ventas</Link>
            <Link to="ModificarProductos">Modificar productos</Link>
            <Link to="Carrito">Carrito de compras</Link>
        </nav>
    </div>
  )
}

export default Navegacion
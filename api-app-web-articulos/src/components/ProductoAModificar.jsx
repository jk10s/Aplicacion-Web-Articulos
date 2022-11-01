import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const initailForm = {
  descripcion: "",
  precio: "",
  stock: 0,
  id: null,
};


const ProductoAModificar = ({updateData,productoEdit,setProductoEdit}) => {

  const [form, setForm] = useState(initailForm);
  useEffect(() => {
    if (productoEdit) {
      setForm(productoEdit);
    } else {
      setForm(initailForm);
    }
  }, [productoEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.descripcion]: e.target.value,
      [e.target.precio]: e.target.value,
      [e.target.stock]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.descripcion || !form.precio || !form.stock) {
      alert("Datos incompletos");
      return;
    }

    if (form.id === null) {
      updateData(form);
    } 

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initailForm);
    setProductoEdit(null);
  };
  return (
    <>
      <h3>Editar datos de producto: </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          onChange={handleChange}
          value={form.descripcion}
        />
        <br/> <br/>
        <input
          type="text"
          name="precio"
          placeholder="Precio"
          onChange={handleChange}
          value={form.precio}
        />
        <br/> <br/>
        <input
          type="text"
          name="stock"
          placeholder="Stock"
         onChange={handleChange}
         value={form.stock}
        />
        <br/> <br/>
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </>
  )
}

export default ProductoAModificar
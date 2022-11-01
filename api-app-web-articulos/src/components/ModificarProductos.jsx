import React, { useState, useEffect } from 'react';
import { helpHttp }  from '../helpers/helperHttp';
import ProductoAModificar from './ProductoAModificar';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Loader from './Loader';
import Message from './Message';

const ModificarProductos = () => {

  const [producto, setProducto] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let helper = helpHttp();
  let url = "http://localhost:5000/productos";

  useEffect(()=>{
    setLoading(true)
    helper.get(url).then(res=>{
      // console.log("Res:",res);
      if(!res.err){
        setProducto(res)
        setError(null)
      }else{
        setProducto(null)
        setError(res)
      }
      setLoading(false)
    });
  },[])


  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    helper.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        let newData = producto.map((el) => (el.id === data.id ? data : el));
        setProducto(newData);
      } else {
        setError(res);
      }
    });
  };

  return (
    <div className='content-productos'>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>DESCRIPCION PRODUCTO</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>

      {producto.length > 0 ? (
            producto.map((el) => (
             <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.descripcion}</td>
              <td> <button onClick={() => setProductoEdit(el)}>Editar</button></td>
             </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
            
      </tbody>
    </Table>
    {loading && <Loader/>}
    {error && <Message/>}
    <div className='editarProducto'>
    <ProductoAModificar
      updateData={updateData}
      setProductoEdit={setProductoEdit}
      productoEdit={productoEdit}
    />
    </div>
  
   </div>
  )
}

export default ModificarProductos
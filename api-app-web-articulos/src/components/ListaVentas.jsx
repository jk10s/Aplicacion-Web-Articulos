import React from 'react'
import { useState, useEffect } from 'react';

const ListaVentas = () => {

  const [ventas, setVentas] = useState([]);
  
  useEffect(()=>{
   const consultarVentas= async () => {
    try {
      const res = await fetch("http://localhost:5000/ventas");
      const res1 = await res.json();
      setVentas(res1);
      console.log(res1);
     } catch (error) {
       console.log("Error: "+error.menssage);
     }
   };
   consultarVentas();
  },[])


  return (
    <div className='content-productos'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Fecha</th>
      <th scope="col">idVenta</th>
      <th scope="col">Valor</th>
    </tr>
  </thead>
  <tbody>
  {ventas.map((item)=>(
    <tr key={item.id}>
      <td>{item.fecha}</td>
      <td>{item.id}</td>
      <td></td>
    </tr>
     ))}
  </tbody>
</table>
   </div>
  )
}

export default ListaVentas
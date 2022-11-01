import React, {useState, useEffect} from 'react'
import Producto from './Producto';

const ListaProductos = ({handleAddProduct}) => {

  const [consulta, setConsulta] = useState([]);
  
  useEffect(()=>{
   const consultarProductos = async () => {
    try {
      const res = await fetch("http://localhost:5000/productos");
      const res1 = await res.json();
      setConsulta(res1);
      console.log(res1);
     } catch (error) {
       console.log("Error: "+error.menssage);
     }
   };
   consultarProductos();
  },[])

  
  return (
    <>
     { consulta.length > 0 ? <p className='title1'>Productos disponibles en el stock</p>:<p>No hay productos disponibles en el stock</p>}
   <div className='content-general'>
        {consulta.map(item=>(
          <Producto
          key={item.id}
          item={item}
          handleAddProduct={handleAddProduct}
          />
        ))}
      </div>
    </>
  )
}

export default ListaProductos
import { useState, useEffect } from 'react';
import{
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './Layout/Layout';
import './assets/styles/styles.css';
import './assets/styles/normalize.css';
import ListaProductos from './components/ListaProductos';
import ListaVentas from './components/ListaVentas';
import ModificarProductos from './components/ModificarProductos';
import CarritoCompras from './components/CarritoCompras';
import ProductoAModificar from './components/ProductoAModificar';

function App() {
  const [cartItems, setCartItems] = useState([]);

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


  const handleAddProduct = (consulta) => {
    const ProductExiste = cartItems?.find((item) => item.id === consulta.id);
    if(ProductExiste){
      setCartItems(cartItems.map((item)=> item.id === consulta.id ? 
      {...ProductExiste, quantity: ProductExiste.quantity + 1}: item)
      );
    }else{
      setCartItems([...cartItems, {...consulta, quantity: 1}]);
    }
  }

  const handleRemoveProduct = (consulta) =>{
    const ProductExiste = cartItems?.find((item) => item.id === consulta.id);
    if(ProductExiste.quantity === 1){
        setCartItems(cartItems.filter((item) => item.id !== consulta.id));
    }else{
      setCartItems(
        cartItems.map((item) => item.id === consulta.id ? {...ProductExiste, quantity: ProductExiste.quantity - 1} : item)
      )
    }
  }

  return (
    <BrowserRouter>
    {/*Rutas publicas*/}
     <Routes>
       <Route path='/' element={<Layout/>}>
         <Route index element={<ListaProductos 
            handleAddProduct={handleAddProduct} 
            handleRemoveProduct={handleRemoveProduct} 
            consulta={consulta}/>}/>
         <Route path='ListaVentas' element={<ListaVentas/>}/>
         <Route path='edit/:id' element={<ProductoAModificar
         cartItems={cartItems} 
         setCartItems={setCartItems} 
         />}/>
         <Route path='ModificarProductos' element={<ModificarProductos/>}/>
         <Route path='Carrito' element={<CarritoCompras 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
            handleAddProduct={handleAddProduct}
            handleRemoveProduct={handleRemoveProduct}  />} />
       </Route>
     </Routes>
       {/*Rutas protegidas*/}
    </BrowserRouter>
  )
}

export default App

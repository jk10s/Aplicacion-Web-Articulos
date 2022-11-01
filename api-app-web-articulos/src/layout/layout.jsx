import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navegacion from '../components/Navegacion';
import Footer from '../components/Footer';


const layout = () => {
  return (
    <>
    <Header/>
    <Navegacion/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default layout
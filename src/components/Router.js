import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
 

import App from '../App';
import EditAccount from './editAccount'
import Employees from '../Pages/Employees';
export default function Router() {
    return (
        <BrowserRouter>
       <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path='/edit/:id' element={<EditAccount/>} />
        <Route path='/allcontacts' element={<EditAccount/>}/>
        <Route path='/employees' element={<Employees/>}/>
        </Routes>
        </BrowserRouter>
    )
}
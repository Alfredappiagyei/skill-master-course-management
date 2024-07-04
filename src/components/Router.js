import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
 

import App from '../App';
import EditAccount from './editAccount'
import Employees from '../Pages/Employees';
import Client from '../Pages/Client';
import Delegate from '../Pages/Delegate';


export default function Router() {
    return (
        <BrowserRouter>
       <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path='/edit/:id' element={<EditAccount/>} />
        <Route path='/allcontacts' element={<EditAccount/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/client' element={<Client/>}/>
        <Route path='/delegate' element={<Delegate/>}/>
        </Routes>
        </BrowserRouter>
    )
}
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import App from '../App';
import editAccount from './editAccount'
export default function Router() {
    return (
        <BrowserRouter>
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={editAccount} />
        <Route path='/allcontacts' component={editAccount}/>
        </BrowserRouter>
    )
}
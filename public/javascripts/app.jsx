import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from "pages/Main.jsx";
import Login from "pages/Login.jsx";
import Home from "pages/Home.jsx";
import Register from "pages/Register.jsx"
import AllCustomers from "pages/AllCustomers.jsx"
import NewCustomer from "pages/NewCustomer.jsx"
import EditCustomer from "pages/EditCustomer.jsx"
import AllServices from "pages/AllServices.jsx"
import NewService from "pages/NewService.jsx"
// import EditService from "pages/EditService.jsx"

// Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render( 
    <Router history = { hashHistory }>
    <Route path = "/" component = { Login }> </Route> 
    <Route path = "/register" component = { Register }></Route>

    <Route path = "/dashboard" component = { Main }>
        <IndexRoute component = { Home } /> 

        <Route path = "/dashboard/customers" component = { AllCustomers }></Route>
        <Route path = "/dashboard/new-customer" component = { NewCustomer }></Route>
        <Route path = "/dashboard/edit-customer/:customerID" component = { EditCustomer }></Route>
        <Route path = "/dashboard/services" component = { AllServices }></Route>
        <Route path = "/dashboard/new-service" component = { NewService }></Route>

    </Route> 
    
    </Router>,
    document.getElementById("content")
);
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from "pages/Main.jsx";
import Login from "pages/Login.jsx";
import Home from "pages/Home.jsx";
import Register from "pages/Register.jsx"


// Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render( 
    <Router history = { hashHistory }>
    <Route path = "/" component = { Login }> </Route> 
    <Route path = "/register" component = { Register }></Route>

    <Route path = "/dashboard" component = { Main }>
        <IndexRoute component = { Home } /> 
        
        { /* List */ } 
        {/*<Route path = "/dashboard/test" component = { AllHotels }></Route>*/}

    </Route> 
    
    </Router>,
    document.getElementById("content")
);
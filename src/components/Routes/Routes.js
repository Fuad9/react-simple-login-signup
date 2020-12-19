import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Auth/Login";
import Home from "../Home/Home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Routes = () => {
   return (
      <>
         <Router>
            <Switch>
               <Route path="/login" component={Login} />

               <PrivateRoute path="/">
                  <Home />
               </PrivateRoute>
            </Switch>
         </Router>
      </>
   );
};

export default Routes;

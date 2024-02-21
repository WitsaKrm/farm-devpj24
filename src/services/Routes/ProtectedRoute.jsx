// ProtectedRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated ,getUserRole } from "../Auth.service"; // Import your authentication service

const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated()) {
          return <Redirect to="/login" />;
        }
        const userRole = getUserRole();
        if (isAdmin && userRole !== 1) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
  
  export default ProtectedRoute;

import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
// import { auth } from '../utils/Actions'

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
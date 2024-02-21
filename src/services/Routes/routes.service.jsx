// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import LoginPage from "../../pages/LoginPage/loginPage";

// import IndexPage from "../../pages/users/indexPage/indexPage";
// import SensersPage from "../../pages/users/SenserPage/senserPage";
// import StationPage from "../../pages/users/StationPage/stationPage";

// import UsersPage from "../../pages/admin/UsersPage/users";

// const Routes = () => {
//   return (
//     <Switch>
//       <Route exact path="/" component={IndexPage} />
//       <Route path="/users" component={UsersPage}/>
//       <Route path="/login" component={LoginPage} />
//       <Route path="/senser/:nodeId" component={SensersPage} />
//       <Route path="/station/:nodeId" component={StationPage} />
//     </Switch>
//   );
// };

// export default Routes;
import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getUserRole } from "../Auth.service";
import ProtectedRoute from "./ProtectedRoute";

import AdminPage from "../../pages/admin/adminindex/adIndex";
import LoginPage from "../../pages/LoginPage/loginPage";
import IndexPage from "../../pages/users/indexPage/indexPage";
import SensersPage from "../../pages/users/SenserPage/senserPage";
import StationPage from "../../pages/users/StationPage/stationPage";

import UsersPage from "../../components/UsersTable/users";

const Routes = () => {
  const userRole = getUserRole();
  const [role, setRole] = useState(userRole);

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={() => (role === 0 ? <AdminPage /> : <IndexPage />)}
      />
      {/* // <ProtectedRoute path="/users" component={UsersPage} isAdmin={true} /> */}
      <Route path="/login">
        <LoginPage setRole={setRole} />
      </Route>
      <ProtectedRoute path="/senser/:userId:nodeId" component={SensersPage} />
      <ProtectedRoute path="/station/:userId:nodeId" component={StationPage} />
      <Redirect to="/" /> {/* Redirect to the home page for unknown routes */}
    </Switch>
  );
};

export default Routes;

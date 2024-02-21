import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from './adIndex.module.css';
import AppHeader from "../../../components/header/app-header";
import AllUsers from "../../../components/UsersTable/users";
import UsersNodes from "../../../components/UsersNode/usersNode";
import {APIdataUsers,APIdeleteUser } from "../../../services/API/user.api";
import {authenticate } from "../../../services/API/auth.api";

const USERS_URL = "/users";
const AUTH_URL ="/authen"

const AdminPage = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [isUsersVisible, setIsUsersVisible] = useState(false);
  const [isUserNodeVisible, setIsUserNodeVisible] = useState(false);

    authenticate(AUTH_URL, history);
    APIdataUsers(setUsers, USERS_URL, setLoading);

  const toggleUsersContent = () => {
    setIsUsersVisible(!isUsersVisible);
    setIsUserNodeVisible(false);
  };

  const toggleUserNodeContent = () => {
    setIsUserNodeVisible(!isUserNodeVisible);
    setIsUsersVisible(false);
  };

  return (
    <>
      <AppHeader header={"ADMIN"} />
      <div className={style.container}>
        <button
            className={`${style.btn} btn btn-dark`}
            onClick={toggleUsersContent}
          >
           USERS
          </button>
        <div className={style.control}>
          {isUsersVisible && <AllUsers users={users} loading={loading}/>}
          {isUserNodeVisible && <UsersNodes user={users}/>}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

import React, { useRef, useState, useEffect } from "react";
import endpoint from "../../services/API/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./editUser.module.css";

const USERS_URL = "/user";
const USER_REGEX = /^[a-zA-Z0-9-_]{3,23}$/;

const EditUser = ({ userData }) => {
  const data = userData;

  const [nameGroup, setNameGroup] = useState({
    firstName: userData.f_name || "",
    lastName: userData.l_name || "",
    userName: userData.username || "",
    role: userData.role,
  });

  const [validGroup, setValidGroup] = useState({
    userName: true,
    firstName: true,
    lastName: true,
  });

  const [focusGroup, setFocusGroup] = useState({
    userName: false,
  });

  const [succ, setSucc] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const userNameIsValid = USER_REGEX.test(nameGroup.userName);
    setValidGroup((prevState) => ({
      ...prevState,
      userName: userNameIsValid,
    }));
  }, [nameGroup.userName]);

  const userRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.user_id) {
        const { firstName, lastName, userName, role } = nameGroup;

        const updatedUserData = {
          f_name: firstName,
          l_name: lastName,
          username: userName,
          user_id: data.user_id,
          role: role,
        };
        const response = await endpoint.put(USERS_URL, updatedUserData);

        if (response.status === 200) {
          setSucc(true);
          window.location.reload();
        } else {
          setError("Error updating user: " + response.statusText);
        }
      } else {
        setError("Invalid user_id. Update not performed.");
      }
    } catch (error) {
      setError("Error updating user: " + error.message);
    }
  };

  return (
    <div className={style.container}>
      {succ ? (
        <section className={style.section}>
          <h1>
            Success! <br /> Reloading ...
          </h1>
        </section>
      ) : (
        <section className={style.section}>
          {error && <p className={style.errmsg}>{error}</p>}
          <h1 className={style.h1}>Edit User Data</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="f_name">ชื่อ : (ใหม่)*</label>
            <input
              placeholder={"เดิม " + data.f_name}
              type="text"
              id="f_name"
              autoComplete="off"
              value={nameGroup.firstName}
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }))
              }
              required
            />

            <label htmlFor="l_name">สกุล : (ใหม่)*</label>
            <input
              placeholder={"เดิม " + data.l_name}
              type="text"
              id="l_name"
              autoComplete="off"
              value={nameGroup.lastName}
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }))
              }
              required
            />

            <label htmlFor="username">
              ชื่อผู้ใช้ : (ใหม่)*
              <span className={validGroup.userName ? style.valid : style.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validGroup.userName || !nameGroup.userName
                    ? style.hide
                    : style.invalid
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              placeholder={"เดิม " + data.username}
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={nameGroup.userName}
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
              required
              aria-invalid={validGroup.userName ? "false" : "true"}
              onFocus={() =>
                setFocusGroup((prevState) => ({
                  ...prevState,
                  userName: true,
                }))
              }
              onBlur={() =>
                setFocusGroup((prevState) => ({
                  ...prevState,
                  userName: false,
                }))
              }
            />
            <label htmlFor="role">ระดับ : (ใหม่)*</label>
            <select
              id="role"
              name="role"
              value={nameGroup.role}
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  role: e.target.value,
                }))
              }
              required
            >
              <option value={0}>ADMIN</option>
              <option value={1}>USER</option>
            </select>
            <p
              id="uidnote"
              className={
                focusGroup.userName &&
                nameGroup.userName &&
                !validGroup.userName
                  ? style.instructions
                  : style.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              3 to 24 characters. <br />
              1 or more large letters.
              <br />
              must begin with a letter. <br />
              Letters, Numbers, underscores, hyphens, allowed.
            </p>

            <button
              className={style.updateBtt}
              disabled={
                !validGroup.userName ||
                !validGroup.firstName ||
                !validGroup.lastName
              }
            >
              Update User
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default EditUser;

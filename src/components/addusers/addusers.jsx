import { useRef, useState, useEffect } from "react";
import endpoint from "../../services/API/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./adduser.module.css";

const USER_REGEX = /^[a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const ADDUSER_URL = "/register";

const AddUsers = () => {
  const informations = {
    firstName: "",
    lastName: "",
    userName: "",
    passWord: "",
    matchPwd: "",
    errMsg: "",
    role: "",
  };
  const userRef = useRef();
  const errRef = useRef();

  const [nameGroup, setNameGroup] = useState(informations);
  const [validGroup, setValidGroup] = useState(informations);
  const [focusGroup, setFocusGroup] = useState(informations);
  const [succ, setSucc] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(nameGroup.userName);
    setValidGroup((prevState) => ({ ...prevState, userName: result }));
  }, [nameGroup.userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(nameGroup.passWord);
    setValidGroup((prevState) => ({ ...prevState, passWord: result }));
    const match = nameGroup.passWord === nameGroup.matchPwd;
    setValidGroup((prevState) => ({
      ...prevState,
      passWord: result,
      matchPwd: match,
    }));
  }, [nameGroup.passWord, nameGroup.matchPwd]);

  useEffect(() => {
    setNameGroup((prevState) => ({ ...prevState, errMsg: "" }));
  }, [nameGroup.userName, nameGroup.passWord, nameGroup.matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const U = USER_REGEX.test(nameGroup.userName);
    const P = PWD_REGEX.test(nameGroup.passWord);
    if (!U || !P) {
      setNameGroup((prevState) => ({ ...prevState, errMsg: "Invalid Entry" }));
      return;
    }
    try {
      const res = await endpoint.post(ADDUSER_URL, {
        f_name: nameGroup.firstName,
        l_name: nameGroup.lastName,
        username: nameGroup.userName,
        password: nameGroup.passWord,
        role: nameGroup.role,
      });
      if (res.data.status === "Success") {
        setSucc(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setNameGroup((prevState) => ({ ...prevState, errMsg: res.data.text }));
      }
    } catch (err) {
      if (!err?.response) {
        setNameGroup((prevState) => ({
          ...prevState,
          errMsg: "No Server Response",
        }));
      } else {
        setNameGroup((prevState) => ({ ...prevState, errMsg: err }));
      }
      errRef.current.focus();
    }
  };

  return (
    <div className={style.container}>
      {succ ? (
        <section className={style.section}>
          <h1>
            Success ! <br /> Reloading ...
          </h1>
        </section>
      ) : (
        <section className={style.section}>
          <p
            ref={errRef}
            className={nameGroup.errMsg ? style.errmsg : style.offscreen}
            aria-live="assertive"
          >
            {nameGroup.errMsg}
          </p>
          <h1 className={style.h1}>
            ADD USER
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="f_name">ชื่อ : </label>
            <input
              type="text"
              id="f_name"
              autoComplete="off"
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }))
              }
              required
            />

            <label htmlFor="l_name">สกุล : </label>
            <input
              type="text"
              id="l_name"
              autoComplete="off"
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }))
              }
              required
            />

            <label htmlFor="username">
              ชื่อผู้ใช้ :
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
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
              required
              aria-invalid={validGroup.userName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() =>
                setFocusGroup((prevState) => ({ ...prevState, userName: true }))
              }
              onBlur={() =>
                setFocusGroup((prevState) => ({
                  ...prevState,
                  userName: false,
                }))
              }
            />
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
              1 or more large letters.<br />
              must begin with a letter. <br />
              Letters, Numbers, underscores, hyphens, allowed.
            </p>

            <label htmlFor="password">
              รหัสผ่าน :
              <span className={validGroup.passWord ? style.valid : style.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validGroup.passWord || !nameGroup.passWord
                    ? style.hide
                    : style.invalid
                } 
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) =>
                setNameGroup((prevState) => ({
                  ...prevState,
                  passWord: e.target.value,
                }))
              }
              required
              aria-invalid={validGroup.passWord ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() =>
                setFocusGroup((prevState) => ({ ...prevState, passWord: true }))
              }
              onBlur={() =>
                setFocusGroup((prevState) => ({
                  ...prevState,
                  passWord: false,
                }))
              }
            />
            <p
              id="pwdnote"
              className={
                focusGroup.passWord && !validGroup.passWord
                  ? style.instructions
                  : style.offscreen
              } 
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              6 to 24 characters. <br />
              must include uppercase and lowercase, and a number. <br />
            </p>

            <div className={style.selectrole}>
              <label htmlFor="role">
                ระดับ :
                <span
                  className={
                    nameGroup.role === "0" || nameGroup.role === "1"
                      ? style.valid
                      : style.hide
                  } 
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={!nameGroup.role ? style.invalid : style.hide}> 
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <select
                id="role"
                required
                value={nameGroup.role}
                onChange={(e) =>
                  setNameGroup((prevState) => ({
                    ...prevState,
                    role: e.target.value,
                  }))
                }
              >
                <option value="">Select Role</option>
                <option value="0">Admin</option>
                <option value="1">User</option>
              </select>
            </div>

            <button
              className={style.addBtt} 
              disabled={!validGroup.userName || !validGroup.passWord}
            >
              ADD USERS
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AddUsers;

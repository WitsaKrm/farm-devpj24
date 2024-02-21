import { useState } from "react";
import style from "./loginPage.module.css";
import AppHeader from "../../components/header/app-header";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import endpoint from "../../services/API/axios";
import AddUsers from "../../components/addusers/addusers";
import { SETUIDLocal ,decodedToken} from "../../services/tkEndcoded.service";
import { getUserRole } from "../../services/Auth.service";
const LOGIN_URL = "/login";
const USER = "/user/username";

const LoginPage = (props) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [role, SETRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await endpoint.post(LOGIN_URL, {
        username: userName,
        password: userPwd,
      });

      if (res.data.status === "Success") {
        const user = await endpoint.get(`${USER}/${userName}`);

        props?.setRole(user.data.user[0].role)

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        })
        Toast.fire({
          icon: "success",
          title: "กำลังเข้าสู่ระบบ",
        }).then(() => {

          localStorage.setItem("token", res.data.token);
          SETUIDLocal();
          const role = getUserRole()

          history.push({
            pathname: `/`,
          });
        });
      } else {
        setErrMsg(res.data.msg);

      }
    } catch (err) {
      console.error(err);
  
      if (err.response && err.response.status === 404) {
        setErrMsg(" : ชื่อผู้ใช้ไม่ถูกต้อง");
      } else if (err.response && err.response.status === 401) {
        setErrMsg(" : รหัสผ่านไม่ถูกต้อง");
      } else {
        setErrMsg(err.message);
      }
    }
  };
  

  return (
    <>
      <AppHeader header={`LoginPage : กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน`}/>
      <section>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="login-username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
            required
          />

          {errMsg && <p className={style.errorMsg}>{errMsg}</p>}

          <button className={style.loginBtt} type="submit">
            LOGIN
          </button>
        </form>
      </section>
      {/* <AddUsers /> */}
    </>
  );
};

export default LoginPage;

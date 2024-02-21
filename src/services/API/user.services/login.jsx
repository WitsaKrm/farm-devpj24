// import { useEffect } from "react";
// import endpoint from "../axios";

// const APIuserLogin = (setErrMsg, LOGIN_URL, userName, userPwd) => {
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await endpoint.post(LOGIN_URL, {
//           username: userName,
//           password: userPwd,
//         });
//         console.log(endpoint, LOGIN_URL);
//         console.log(res.data);
//         if (res.data.status === "Success") {
//           console.log(res.data.text);
//         } else {
//           setErrMsg(res.data.text);
//           console.log(res.data.text);
//         }
//       } catch (err) {
//         console.error(err);
//         setErrMsg("No Server Response");
//       }
//     };
//     fetchUsers();
//   }, [setErrMsg, LOGIN_URL, userName, userPwd]);
// };

// export default APIuserLogin;

import Swal from "sweetalert2";
import endpoint from "../../services/API/axios";

export async function authenticate(AUTH_URL, history) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:9000${AUTH_URL}`, {
      // const response = await fetch(`http://172.24.163.45:9000${AUTH_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: "ยืนยันตัวตนเสร็จสิ้น",
          icon: "success",
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        // Authentication failed
        localStorage.removeItem("token");
        localStorage.removeItem("UID");
        history.push({
          pathname: "/login",
        });
      }
    } catch (err) {
      console.error("Authentication error:", err);
      Swal.fire({
        title: "Authentication Error",
        text: "An error occurred during authentication.",
        icon: "error",
        showConfirmButton: false,
        timer: 500,
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("UID");
        history.push({
          pathname: "/login",
        });
      });
    }
  }
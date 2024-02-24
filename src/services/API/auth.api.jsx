import Swal from "sweetalert2";
import endpoint from "../../services/API/axios";


export async function authenticate(AUTH_URL, history ,PAGE) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  })
      const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://powerful-crab-khakis.cyclic.app/${AUTH_URL}`, {

        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        if(PAGE === 'indexpage'){
          Toast.fire({
            icon: "success",
            title: "ยืนยันตัวตนเสร็จสิ้น",
          })
        }
      } else {
        Toast.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดระหว่างการตรวจสอบการเข้าถึงข้อมูล",
          title: "ไม่สามารถยืนยันตัวตน",
        }).then(()=>{
          localStorage.removeItem("token");
          localStorage.removeItem("UID");
          history.push({
            pathname: "/login",
          });
        })
      }
    } catch (err) {
      console.error("Authentication error:", err);
       Toast.fire({
        icon: "error",
        text: "An error occurred during authentication.",
        title: "ไม่สามารถยืนยันตัวตน",
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("UID");
        history.push({
          pathname: "/login",
        });
      });
    }
  }
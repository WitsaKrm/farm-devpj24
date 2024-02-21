import jwtDecode from "jwt-decode";


export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  export function getUserRole() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.role);
      return decodedToken.role;
    }
    return " token is not found"; 
  }

  
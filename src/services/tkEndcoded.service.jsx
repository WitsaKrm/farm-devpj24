
import jwtDecode from "jwt-decode";

export function decodedToken(SET) {
  const token = localStorage.getItem('token');
  try {
    const decodedToken = jwtDecode(token);
    SET(decodedToken);
  } catch (error) {
    console.error("Error parsing the decoded token as JSON:", error);
  }
}

export function SETUIDLocal() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token not found in localStorage");
    return;
  }
  try {
    const decodedToken = jwtDecode(token);
    
    if (decodedToken && decodedToken.user_id) {
      localStorage.setItem('UID', decodedToken.user_id);
    } else {
      console.error("Invalid decoded token:", decodedToken);
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

export default function LecAuthHeader() {
    const userStr = localStorage.getItem("lecturer");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.authenticationToken) {
      return { Authorization: 'Bearer ' + user.authenticationToken };
    } else {
      return { Authorization: '' };
    }
  }
  
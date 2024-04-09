export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.authenticationToken) {
      return { Authorization: 'Bearer ' + user.authenticationToken };
    } else {
      return { Authorization: '' };
    }
  }
  
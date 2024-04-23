export default function AdAuthHeader() {
    const userStr = localStorage.getItem("admin");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.authenticationToken) {
      return { Authorization: 'Bearer ' + user.authenticationToken };
    } else {
      return { Authorization: '' };
    }
  }
  
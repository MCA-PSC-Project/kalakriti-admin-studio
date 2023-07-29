const getLocalRefreshToken = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin?.refresh_token;
};

const getLocalAccessToken = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin?.access_token;
};

const updateLocalAccessToken = (token) => {
  let admin = JSON.parse(localStorage.getItem("admin"));
  admin.access_token = token;
  localStorage.setItem("admin", JSON.stringify(admin));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("admin"));
};

const setUser = (admin) => {
  console.log(JSON.stringify(admin));
  localStorage.setItem("admin", JSON.stringify(admin));
};

const removeUser = () => {
  localStorage.removeItem("admin");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;

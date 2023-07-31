const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("admin_info"));
};

const setUserInfo = (adminInfo) => {
  console.log(JSON.stringify(adminInfo));
  localStorage.setItem("admin_info", JSON.stringify(adminInfo));
};

const removeUserInfo = () => {
  localStorage.removeItem("admin_info");
};

const UserInfoService = {
  getUserInfo,
  setUserInfo,
  removeUserInfo,
};

export default UserInfoService;

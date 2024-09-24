
const routes = {
  professors: (id: string) => `professors/${id}`,
  Colleges: (id: string) => `Colleges/${id}`,
  professor: (id: string) => `professor/${id}`,
  moreInfo: (id: string) => `more-info/${id}`,
  dashboard: "/",
  login: "/login",
  signup: "/signup",
  adminUsers:"/admin/users"
};

export default routes;

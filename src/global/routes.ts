
const routes = {
  professors: (id: string) => `professors/${id}`,
  Colleges: (id: number) => `Colleges/${id}`,
  professor: (id: string) => `professor/${id}`,
  Project: (id: string) => `project/${id}`,
  dashboard: "/",
  login: "/login",
  signup: "/signup",
  adminUsers:"/admin/users",
  notfound : "/404",
  a500:"/500",
  a502:"/502"
};

export default routes;

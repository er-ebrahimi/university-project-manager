const routes = {
  professors: (id: string) => `professors/${id}`,
  professor: (id: string) => `professor/${id}`,
  moreInfo: (id: string) => `more-info/${id}`,
  dashboard: "/",
  login: "/login",
  signup: "/signup",
};

export default routes;

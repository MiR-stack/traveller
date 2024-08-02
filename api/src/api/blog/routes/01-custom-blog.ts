export default {
  routes: [
    {
      method: "PATCH",
      path: "/blogs/love-add",
      handler: "blog.addLove",
    },
    {
      method: "PATCH",
      path: "/blogs/love-remove",
      handler: "blog.removeLove",
    },
    {
      method: "GET",
      path: "/blogs/view-increase",
      handler: "blog.viewIncrease",
    },
  ],
};

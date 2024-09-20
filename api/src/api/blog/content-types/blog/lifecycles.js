module.exports = {
  beforeUpdate: (event) => {
    strapi.service("api::blog.blog").beforeAction(event);
  },
  beforeCreate: (event) => {
    strapi.service("api::blog.blog").beforeAction(event);
  },
};

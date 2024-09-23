module.exports = {
  beforeUpdate: (event) => {
    strapi.service("api::continent.continent").beforeAction(event);
  },
  beforeCreate: (event) => {
    strapi.service("api::continent.continent").beforeAction(event);
  },
};

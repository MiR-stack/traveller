import logo from "./extensions/mobile-logo.png";

const config = {
  head: {
    favicon: logo,
  },
  menu: {
    logo,
  },
  auth: {
    logo,
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Traveller Dashboard",
      "Auth.form.welcome.title": "Welcome to Traveller",
      "Auth.form.welcome.subtitle": "Login to your account",
    },
  },
  tutorials: false,
  notifications: { releases: false },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};

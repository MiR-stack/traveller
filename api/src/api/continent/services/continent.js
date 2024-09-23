"use strict";

/**
 * continent service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::continent.continent", () => ({
  beforeAction(event) {
    const { name, slug } = event.params.data;
    console.log(name)

    if (!slug && name) {
      event.params.data.slug = strapi.service("api::blog.blog").slugify(name);
    }
  },
}));

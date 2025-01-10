"use strict";

/**
 * blog service
 */

const { env } = require("@strapi/utils");
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::blog.blog", () => ({
  estimateReadTime(text) {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    return readTime;
  },

  slugify(text) {
    return text
      .trim()
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .join("-");
  },

  async beforeAction(event) {
    const { title, slug, url, content } = event.params.data;

    if (!title) return;

    let newSlug = slug;

    if (!slug) {
      const ctx = strapi.requestContext.get();

      const keyword = ctx.request.body.seo?.keywords?.split(",")[0];
      newSlug = this.slugify(keyword || title);

      event.params.data.slug = newSlug;

      // create url
      const clientUrl = env("CLIENT_URL");
      const URL = `${clientUrl}/${newSlug}`;

      event.params.data.url = URL;
    }

    if (!url) {
      const clientUrl = env("CLIENT_URL");
      const URL = `${clientUrl}/${newSlug}`;

      event.params.data.url = URL;
    }

    const readTime = this.estimateReadTime(content);
    event.params.data.readTime = readTime;
  },
}));

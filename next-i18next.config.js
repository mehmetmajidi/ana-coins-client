/** @type {import('next-i18next').UserConfig} */

module.exports = {
     i18n: {
          // Default locale is set to English
          defaultLocale: "en",
          // Supported locales
          locales: ["en", "fr", "nl", "tr", "de", "fa", "ar"],
          // Namespaces that are used in the project
          ns: ["anacoin"],
          // Fallback language if a translation is missing
          fallbackLng: "en",
          // Debugging for i18n (set to false in production)
          debug: process.env.NODE_ENV === "development", // Enables debugging only in development mode
     },
     // Ensures that locale subpaths are disabled
     localeSubpaths: {},

     // Optionally, disable auto-detection of user's language for more control
     detection: {
          order: ["path", "cookie", "header", "querystring"],
          caches: ["cookie"],
     },
     // React i18next options
     react: {
          useSuspense: true, // Ensure translations load properly with suspense
          wait: true,
     },
};

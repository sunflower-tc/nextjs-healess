module.exports = {
  locales: ['en', 'ar', 'es', 'fr'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/locale/{locale}/messages',
      include: ['<rootDir>/'],
      exclude: ['**/node_modules/**'],
    },
  ],
};

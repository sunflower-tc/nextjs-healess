module.exports = {
  locales: ['cn', 'en', 'mex'],
  sourceLocale: 'cn',
  catalogs: [
    {
      path: '<rootDir>/locale/{locale}/messages',
      include: ['<rootDir>/'],
      exclude: ['**/node_modules/**'],
    },
  ],
};

Package.describe({
  name: 'kosst:extended-methods',
  version: '0.1.0',
  summary: 'Create Meteor methods with before and after hooks',
  git: 'https://github.com/kosst/extended-methods.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.mainModule('extended-methods.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kosst:extended-methods');
  api.mainModule('extended-methods-tests.js');
});

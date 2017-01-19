const config = require('./config');
const userService = require('./services/user');
const acl = require('./acl');

userService.create(config.admin)
  .then(admin => acl.addUserRoles(admin.id, 'admin'))
  .then(() => acl.allow('admin', ['users', 'tickets'], '*'))
  .then(() => console.log('Created admin user.'))
  .catch(e => e.code !== 11000 && console.error('Create admin user error:', e));


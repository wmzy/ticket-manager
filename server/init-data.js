const config = require('./config');
const userService = require('./services/user');
const acl = require('./acl');

userService.create(config.admin)
  .catch(e => {
    if (e.code !== 11000) throw e;
    return userService.getByUsername(config.admin.username);
  })
  .then(admin => acl.addUserRoles(admin.id, 'admin'))
  .then(() => acl.allow('admin', ['users', 'tickets'], '*'))
  .then(() => console.log('Created admin auth.'))
  .catch(e => console.error('Create admin auth error:', e));


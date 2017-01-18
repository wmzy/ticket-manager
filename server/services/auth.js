const Promise = require('bluebird');
const _ = require('lodash');
const acl = require('../acl');

exports.getResourcePermissions = async function (userId) {
  const roles = await acl.userRoles(userId);
  const resources = await Promise.all(roles.map(r => acl.whatResources(r)));
  return _.merge({}, ...resources);
};

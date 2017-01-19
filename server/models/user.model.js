const crypto = require('crypto');
const _ = require('lodash');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nick: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mobile: {
    type: String,
    unique: true,
    trim: true
  },
  state: {
    type: String,
    enum: ['', 'removed']
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  }
});


UserSchema.set('toJSON', {transform: (doc, ret) => _.omit(ret, 'password', 'salt')});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = crypto.randomBytes(16).toString('base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha256').toString('base64');
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema);

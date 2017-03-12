const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const FileSchema = Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    trim: true,
    default: ''
  },
  encoding: {
    type: String,
    default: ''
  },
  mimetype: {
    type: String,
    default: ''
  },
  size: Number,
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', FileSchema);

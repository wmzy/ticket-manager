const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const ReplySchema = Schema({
  content: {
    type: String,
    required: true
  },
  ticket: {
    type: ObjectId,
    ref: 'Ticket'
  },
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

module.exports = mongoose.model('Reply', ReplySchema);

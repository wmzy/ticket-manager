const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const TicketSchema = Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  assignee: {
    type: ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  content: {
    type: String
  },
  attachments: [String],
  state: {
    type: String,
    enum: ['draft', 'open', 'read', 'closed', 'deleted']
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

module.exports = mongoose.model('Ticket', TicketSchema);

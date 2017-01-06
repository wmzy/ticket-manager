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
  attachments: [{
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  state: {
    type: String,
    enum: ['draft', 'open', 'read', 'closed', 'deleted']
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);

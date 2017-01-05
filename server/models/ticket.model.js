const mongoose = require('mongoose');
const {Schema} = mongoose;

const TicketSchema = Schema({
  name: String
});

module.exports = mongoose.model('Ticket', TicketSchema);

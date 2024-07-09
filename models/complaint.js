
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },

});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Complaint', complaintSchema);

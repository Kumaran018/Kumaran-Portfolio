const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    issuer: {
      type: String,
      required: true
    },
    issueDate: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;

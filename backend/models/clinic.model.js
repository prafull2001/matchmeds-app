const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clinicSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  address: { type: String, required: true },
  prescription: { type: String, required: true },
}, {
  timestamps: true,
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
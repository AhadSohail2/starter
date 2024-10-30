const mongoose = require("mongoose");

const schema = mongoose.Schema;

const VendorSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Vendor", VendorSchema);

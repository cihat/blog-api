const mongosoe = require('mongoose');
const Schema = mongosoe.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
})

UserSchema.plugin(require("mongoose-autopopulate"))

module.exports = mongoose.model('User', UserSchema);
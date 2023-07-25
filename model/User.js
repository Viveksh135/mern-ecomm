const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true ,default:"user"},
  addresses: { type: [Schema.Types.Mixed] },
  name: { type: String },
  orders: { type: [Schema.Types.Mixed] },
  salt:Buffer
});
//to make virtual datafield
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
  //tels us to return _id because we are using id in front end
});
//automatically id is create and add to data response
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", userSchema);

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = "users"
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    max: 100,
  },
  lastName: {
    type: String,
    max: 100,
  },
  password: {
    type: String,
    max: 100,
  },
  email: {
    type: String,
    max: 100,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    required: false
  },
  age: {
    type: Number,
    required: false,
  },
  cart:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts"
  }
});
userSchema.plugin(mongoosePaginate);
export const userModel = mongoose.model(userCollection, userSchema);
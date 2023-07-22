import mongoose from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema({
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
    required: true,
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
schema.plugin(monsoosePaginate);
export const userModel = mongoose.model('users', schema);
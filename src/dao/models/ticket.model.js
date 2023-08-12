import mongoose from 'mongoose';


const ticketsCollection = "tickets"
const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  purchase_datetime:{
    type: Date,
  },
  amount: {
    type: Number
  },
  purchaser:{
    type: String
  }
});

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema);
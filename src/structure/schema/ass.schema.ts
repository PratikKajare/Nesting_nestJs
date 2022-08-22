import mongoose from 'mongoose';

export const AssiSchema = new mongoose.Schema({
  id: String,
  title: String,
  structure: Array,
});

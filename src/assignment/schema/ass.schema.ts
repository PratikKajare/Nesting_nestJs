import mongoose from 'mongoose';

export const AssiSchema = new mongoose.Schema({
  _id: String,
  title: String,
  dueDate: Date,
  shouldEmailAssignees: Boolean,
  status: String,
  assignType: String,
  instructions: String,
  attachements: Array,
  assignees: Array,
  learningItemCollections: [String],
  author: Array,
});

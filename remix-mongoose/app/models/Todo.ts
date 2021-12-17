import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
});
const model = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
export default model;

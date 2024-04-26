import { Schema, model } from "mongoose";

const TaskSchema = Schema({
  nameTask: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  statusTask: {
    type: String,
    required: true,
    default: "Earring",
    enum: ["Completed", "Earring"],
  },
  author: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

TaskSchema.methods.toJSON = function () {
  const { __v, _id, ...task } = this.toObject();
  task.uid = _id;
  return task;
};

export default model("task", TaskSchema);

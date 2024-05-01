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

function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

TaskSchema.methods.toJSON = function () {
  const { __v, _id, startDate, endDate, ...task } = this.toObject();
  task.uid = _id;
  task.startDate = startDate ? formatDate(startDate) : null;
  task.endDate = endDate ? formatDate(endDate) : null;
  return task;
};

export default model("task", TaskSchema);

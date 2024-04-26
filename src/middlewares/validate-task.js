import Task from "../task/task.model.js";

export const checkTaskIdExistence = async (id = "") => {
  const task = await Task.findById(id);
  if (!task) {
    throw new Error(`La tarea no existe dentro de la base de datos`);
  }
  if (!task.status) {
    throw new Error(`La tarea no existe dentro de la base de datos`);
  }
};

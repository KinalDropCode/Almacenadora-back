import Task from "../task/task.model.js";

export const createTask = async (req, res) => {
  const { nameTask, description, startDate, endDate, author } = req.body;
  const task = new Task({ nameTask, description, startDate, endDate, author });

  await task.save();

  res.status(200).json({
    task,
  });
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);
    await Task.findByIdAndUpdate(taskId, { status: false });

    res.status(200).json({ msg: "Task deleted successfully." });
  } catch (e) {
    res.status(500).json("Internal Server Error");
    console.log(e);
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.find({ status: true });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.log(e);
  }
};

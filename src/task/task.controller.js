import Task from "../task/task.model.js";

export const createTask = async (req, res) => {
  const { nameTask, description, startDate, endDate, author } = req.body;
  const task = new Task({ nameTask, description, startDate, endDate, author });

  await task.save();

  res.status(200).json({
    task,
    message: "Task added successfully"
  });
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);
    await Task.findByIdAndUpdate(taskId, { status: false });

    res.status(200).json({ msg: "Task deleted successfully.", task });
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

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { _id, ...task } = req.body;

  try {
    await Task.findByIdAndUpdate(taskId, task);

    const taskUpdate = await Task.findById(taskId);
    res.status(200).json({ msg: "Task update successfully.", taskUpdate });
  } catch (e) {
    res.status(500).json("Internal Server Error");
    console.log(e);
  }
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await Task.find({
      statusTask: "Completed",
      status: true,
    })
      .sort({ startDate: 1 })
      .lean();
    completedTasks.forEach((task) => {
      task.startDate = formatDate(task.startDate);
      task.endDate = formatDate(task.endDate);
    });
    res.status(200).json({ completedTasks });
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.error(error);
  }
};

export const getEarringTasks = async (req, res) => {
  try {
    const earringTasks = await Task.find({
      statusTask: "Earring",
      status: true,
    })
      .sort({ startDate: 1 })
      .lean();
    earringTasks.forEach((task) => {
      task.startDate = formatDate(task.startDate);
      task.endDate = formatDate(task.endDate);
    });
    res.status(200).json({ earringTasks });
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.error(error);
  }
};

export const getTaskSearch = async (req, res) => {
  try {
    const { name } = req.body;
    const query = { status: true };

    if (name) {
      query.nameTask = { $regex: name, $options: "i" }; //
    }

    const task = await Task.find(query);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.log(error);
  }
};

export const completeTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    await Task.findByIdAndUpdate(taskId, { statusTask: "Completed" });
    const taskUpdate = await Task.findById(taskId);
    res.status(200).json({ msg: "Status task updated successfully.", taskUpdate });
  } catch (e) {
    res.status(500).json("Internal Server Error");
    console.log(e);
  }
};

export const pendingTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    await Task.findByIdAndUpdate(taskId, { statusTask: "Earring" });
    const taskUpdate = await Task.findById(taskId);
    res.status(200).json({ msg: "Status task updated successfully.", taskUpdate });
  } catch (e) {
    res.status(500).json("Internal Server Error");
    console.log(e);
  }
};

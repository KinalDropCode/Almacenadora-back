import { Router } from "express";
import { check } from "express-validator";

// Validates
import { validateFields } from "../middlewares/validate-fields.js";
import { checkTaskIdExistence } from "../middlewares/validate-task.js";

// Controller
import {
  createTask,
  deleteTask,
  getCompletedTasks,
  getEarringTasks,
  getTask,
  getTaskSearch,
  updateTask,
  completeTask,
} from "./task.controller.js";

const router = Router();

router.get("", getTask);

router.get("/search", getTaskSearch);

router.get("/completed", getCompletedTasks);

router.get("/earring", getEarringTasks);

router.post(
  "/create",
  [
    check("nameTask", "Name Task is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
    check("startDate")
      .optional({ nullable: true })
      .isISO8601()
      .toDate()
      .withMessage("Invalid startDate format"),
    check("endDate")
      .optional({ nullable: true })
      .isISO8601()
      .toDate()
      .withMessage("Invalid endDate format"),
    check("author", "Author is required").notEmpty(),
    validateFields,
  ],
  createTask
);

router.put(
  "/:taskId",
  [
    check("taskId", "The id is not a valid MongoDB format").isMongoId(),
    check("taskId").custom(checkTaskIdExistence),
    validateFields,
  ],
  updateTask
);

router.delete(
  "/:taskId",
  [
    check("taskId", "The id is not a valid MongoDB format").isMongoId(),
    check("taskId").custom(checkTaskIdExistence),
    validateFields,
  ],
  deleteTask
);

router.put(
  "/complete/:taskId",
  [
    check("taskId", "The id is not a valid MongoDB format").isMongoId(),
    check("taskId").custom(checkTaskIdExistence),
    validateFields,
  ],
  completeTask
);


export default router;

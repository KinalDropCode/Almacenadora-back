import { check } from "express-validator";
import { Router } from "express";

// Validates
import { validateFields } from "../middlewares/validate-fields.js";
import { checkTaskIdExistence } from "../middlewares/validate-task.js";

// Controller
import { createTask, getTask, deleteTask, updateTask } from "./task.controller.js";

const router = Router();

router.get("", getTask);

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

export default router;

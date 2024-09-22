const TASK_STATUSES = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const DEFAULT_TASK_FORM_VALUES = {
  title: "",
  description: "",
  dueDate: "",
  status: TASK_STATUSES.PENDING, 
};

const NO_DATA_FOUND = {
  NO_DATA_FOUND: "No tasks available",
  NOT_ADDED: "You haven't added any tasks yet.",
};

export { TASK_STATUSES, DEFAULT_TASK_FORM_VALUES, NO_DATA_FOUND };

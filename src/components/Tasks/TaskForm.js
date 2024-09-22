import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { isPastDate } from "../../helpers/date";
import { v4 as uuidv4 } from "uuid";
import { TASK_STATUSES } from "../../constants/constants";

function TaskForm({ handleClose, showModal, initialValues, setTasks }) {
  // Validation logic
  const validate = (values) => {
    let errorsObj = {};
    if (!values.title) {
      errorsObj.title = "Title is required.";
    }
    if (!values.description) {
      errorsObj.description = "Description is required.";
    }
    if (!values.dueDate) {
      errorsObj.dueDate = "Due date is required.";
    } else if (isPastDate(values.dueDate)) {
      errorsObj.dueDate = "Due date must be in the future.";
    }
    return errorsObj;
  };

  // Using the useForm hook
  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  const submitForm = () => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (initialValues.id) {
      const updatedTasks = existingTasks.map((task) =>
        task.id === initialValues.id
          ? { ...values, id: initialValues.id }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask = {
        ...values,
        id: uuidv4(),
      };
      const updatedTasks = [...existingTasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    setValues(initialValues);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialValues.id ? "Edit Task" : "Add New Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, submitForm)}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={values.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              isInvalid={!!errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dueDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formStatus" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={values.status}
              onChange={handleChange}
              isInvalid={!!errors.status}
            >
              <option value={TASK_STATUSES.PENDING}>
                {TASK_STATUSES.PENDING}
              </option>
              <option value={TASK_STATUSES.IN_PROGRESS}>
                {TASK_STATUSES.IN_PROGRESS}
              </option>
              <option value={TASK_STATUSES.COMPLETED}>
                {TASK_STATUSES.COMPLETED}
              </option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.status}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            {initialValues.id ? "Update Task" : "Add Task"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskForm;

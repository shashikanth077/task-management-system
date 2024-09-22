import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import Button from 'react-bootstrap/Button';
import Dashboard from "../Dashboard/dashboard";
import { TASK_STATUSES } from "../../constants/constants";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editVal,SetEditVal] = useState('');

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === TASK_STATUSES.PENDING).length;
  const inProgressTasks = tasks.filter(task => task.status === TASK_STATUSES.IN_PROGRESS).length;
  const completedTasks = tasks.filter(task => task.status === TASK_STATUSES.COMPLETED).length;

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const updateTask = (task) => {
    setShowModal(true); // Show modal
    if (task) {
      SetEditVal(task)
    }
  };

  const handleAddTask = () => {
    setShowModal(true); 
    SetEditVal("")
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const deleteTask = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    
    if (isConfirmed) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
 

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>

      <Dashboard
        totalTasks={totalTasks}
        pendingTasks={pendingTasks}
        inProgressTasks={inProgressTasks}
        completedTasks={completedTasks}
      />

      <div className="d-flex justify-content-between mb-4">
        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <TaskForm  setTasks={setTasks} initialValues={editVal || { title: "", description: "", dueDate: "", status: "Pending" }} showModal={showModal} handleClose={handleClose} />
      <TaskTable tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default Tasks;

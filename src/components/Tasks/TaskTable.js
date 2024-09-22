import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { NO_DATA_FOUND } from "../../constants/constants";

function TaskTable({ tasks, updateTask, deleteTask }) {
  const [sortConfig, setSortConfig] = useState({
    key: "dueDate",
    direction: "ascending",
  });

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      );
    }
    return <FaSort />;
  };

  return (
    <>
      {sortedTasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th
                  onClick={() => requestSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Status {getSortIcon("status")}
                </th>
                <th
                  onClick={() => requestSort("dueDate")}
                  style={{ cursor: "pointer" }}
                >
                  Due Date {getSortIcon("dueDate")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <button
                      onClick={() => updateTask(task)}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center my-5">
          <h4 className="text-muted">{NO_DATA_FOUND.NO_DATA_FOUND}</h4>
          <p className="text-muted">{NO_DATA_FOUND.NOT_ADDED}</p>
        </div>
      )}
    </>
  );
}

export default TaskTable;

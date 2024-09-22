import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaTasks,
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function Dashboard({
  totalTasks,
  pendingTasks,
  inProgressTasks,
  completedTasks,
}) {
  return (
    <div className="container mt-4">
      <Row>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaTasks size={40} className="text-primary mb-3" />
              <Card.Title>Total Tasks</Card.Title>
              <Card.Text className="display-4">{totalTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaClipboardList size={40} className="text-warning mb-3" />
              <Card.Title>Pending Tasks</Card.Title>
              <Card.Text className="display-4">{pendingTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaSpinner size={40} className="text-info mb-3" />
              <Card.Title>In Progress</Card.Title>
              <Card.Text className="display-4">{inProgressTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaCheckCircle size={40} className="text-success mb-3" />
              <Card.Title>Completed Tasks</Card.Title>
              <Card.Text className="display-4">{completedTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;

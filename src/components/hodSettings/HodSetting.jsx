import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Nav,
  Navbar,
  Table,
  Badge,
  Form,
} from "react-bootstrap";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const HODSettings = () => {
  const [hodDetails, setHodDetails] = useState({
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    branch: "Computer Science",
    department: "Engineering",
    contact: "+91 9876543210",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(3); // Mock unread notifications

  // Handle Input Change
  const handleChange = (e) => {
    setHodDetails({ ...hodDetails, [e.target.name]: e.target.value });
  };

  // Handle Save Changes
  const handleSave = () => {
    setMessage("Profile updated successfully! ✅");
  };

  // Handle Password Change
  const handlePasswordChange = () => {
    if (hodDetails.password !== hodDetails.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }
    setMessage("Password updated successfully! ✅");
    setHodDetails({ ...hodDetails, password: "", confirmPassword: "" });
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ background: "#121212", minHeight: "100vh" }}
    >
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/hod">HOD Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/hod">Home</Nav.Link>
              <Nav.Link as={Link} to="/hodActivity">Activity Logs</Nav.Link>
              <Nav.Link as={Link} to="/hodSettings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/hodnotifications">
                <FaBell />
                {unreadCount > 0 && <Badge bg="danger">{unreadCount}</Badge>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Settings Card */}
      <div className="container mt-4 text-light">
        <h2 className="mb-4">HOD Settings</h2>
        {message && <p className="alert alert-info">{message}</p>}

        <Card bg="dark" text="light" className="mb-4">
          <Card.Header>Personal Information</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={hodDetails.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={hodDetails.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  name="branch"
                  value={hodDetails.branch}
                  onChange={handleChange}
                  placeholder="Enter Branch"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={hodDetails.department}
                  onChange={handleChange}
                  placeholder="Enter Department"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={hodDetails.contact}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
                />
              </Form.Group>

              <Button variant="success" onClick={handleSave}>
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Change Password Section */}
        <Card bg="dark" text="light" className="mb-4">
          <Card.Header>Change Password</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={hodDetails.password}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={hodDetails.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                />
              </Form.Group>

              <Button variant="warning" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HODSettings;

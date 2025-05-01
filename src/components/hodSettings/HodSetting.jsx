import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { Link} from "react-router-dom";
import "./HodSetting.css"; // Import the CSS file

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
  const [unreadCount] = useState(3); // Removed setUnreadCount to avoid warnings

  const handleChange = (e) => {
    setHodDetails({ ...hodDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setMessage("Profile updated successfully! ✅");
  };

  const handlePasswordChange = () => {
    if (hodDetails.password !== hodDetails.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }
    setMessage("Password updated successfully! ✅");
    setHodDetails({ ...hodDetails, password: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  

  return (
    <div className="hod-settings-container">
      <Navbar className="hod-navbar" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/hod">HOD Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/hod">Home</Nav.Link>
              <Nav.Link as={Link} to="/hodActivity">Activity Logs</Nav.Link>
              <Nav.Link as={Link} to="/hodSettings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/hodnotifications" className="hod-notification">
                <FaBell />
                {unreadCount > 0 && <Badge className="badge">{unreadCount}</Badge>}
              </Nav.Link>
              <Button className="hod-logout-btn ms-3" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4 text-light">
        <h2 className="mb-4">HOD Settings</h2>
        {message && <p className="alert hod-alert">{message}</p>}

        <Card className="hod-card mb-4">
          <Card.Header className="hod-card-header">Personal Information</Card.Header>
          <Card.Body>
            <Form className="hod-form">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={hodDetails.name} onChange={handleChange} placeholder="Enter Name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={hodDetails.email} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Branch</Form.Label>
                <Form.Control type="text" name="branch" value={hodDetails.branch} onChange={handleChange} placeholder="Enter Branch" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" name="department" value={hodDetails.department} onChange={handleChange} placeholder="Enter Department" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" name="contact" value={hodDetails.contact} onChange={handleChange} placeholder="Enter Contact Number" />
              </Form.Group>

              <Button className="hod-save-btn" onClick={handleSave}>Save Changes</Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="hod-card mb-4">
          <Card.Header className="hod-card-header">Change Password</Card.Header>
          <Card.Body>
            <Form className="hod-form">
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="password" value={hodDetails.password} onChange={handleChange} placeholder="Enter New Password" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" value={hodDetails.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" />
              </Form.Group>

              <Button className="hod-password-btn" onClick={handlePasswordChange}>Update Password</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HODSettings;

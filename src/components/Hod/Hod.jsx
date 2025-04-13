import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Card, Container, Nav, Navbar, Table, Badge } from "react-bootstrap";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const HODDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, asset: "Laptop", user: "John Doe" },
    { id: 2, asset: "Projector", user: "Alice Smith" },
  ]);

  const [assignedAssets, setAssignedAssets] = useState([
    { id: 3, asset: "Desktop PC", user: "Michael Lee", status: "Assigned" },
    { id: 4, asset: "Printer", user: "Sarah Johnson", status: "Assigned" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Laptop request pending approval", is_read: false },
    { id: 2, message: "Projector request pending approval", is_read: false },
  ]);

  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.is_read).length);

  const handleApprove = (id) => {
    const approvedRequest = pendingRequests.find((req) => req.id === id);
    if (approvedRequest) {
      setAssignedAssets([...assignedAssets, { ...approvedRequest, status: "Assigned" }]);
      setPendingRequests(pendingRequests.filter((req) => req.id !== id));
      addNotification(`${approvedRequest.asset} request approved`);
    }
  };

  const handleReject = (id) => {
    const rejectedRequest = pendingRequests.find((req) => req.id === id);
    setPendingRequests(pendingRequests.filter((req) => req.id !== id));
    addNotification(`${rejectedRequest.asset} request rejected`);
  };

  const addNotification = (message) => {
    setNotifications([...notifications, { id: notifications.length + 1, message, is_read: false }]);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <div className="hod-dashboard" style={{ minHeight: "100vh" }}>
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

      <Container className="mt-4 text-light">
        <h2 className="mb-4">HOD Dashboard</h2>

        <div className="row">
          {/* Pending Requests */}
          <div className="col-md-6">
            <Card bg="dark" text="light" className="mb-4 shadow-lg">
              <Card.Header className="text-center">📋 Pending Asset Requests</Card.Header>
              <Card.Body>
                {pendingRequests.length > 0 ? (
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Asset</th>
                        <th>User</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((req, index) => (
                        <tr key={req.id}>
                          <td>{index + 1}</td>
                          <td>{req.asset}</td>
                          <td>{req.user}</td>
                          <td>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(req.id)}>
                              <FaCheck /> Approve
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleReject(req.id)}>
                              <FaTimes /> Reject
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center">✅ No pending requests</p>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Assigned Assets */}
          <div className="col-md-6">
            <Card bg="dark" text="light" className="mb-4 shadow-lg">
              <Card.Header className="text-center">✅ Assigned Assets</Card.Header>
              <Card.Body>
                {assignedAssets.length > 0 ? (
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Asset</th>
                        <th>User</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedAssets.map((asset, index) => (
                        <tr key={asset.id}>
                          <td>{index + 1}</td>
                          <td>{asset.asset}</td>
                          <td>{asset.user}</td>
                          <td>
                            <Badge bg="success">{asset.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center">No assigned assets</p>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HODDashboard;
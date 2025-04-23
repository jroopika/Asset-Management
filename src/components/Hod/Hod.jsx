import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Nav, Navbar, Table, Badge } from "react-bootstrap";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const HODDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get("http://localhost:5000/api/requests/pending");
        setPendingRequests(pendingResponse.data);

        const assignedResponse = await axios.get("http://localhost:5000/api/assignments/assigned");
        setAssignedAssets(assignedResponse.data);

        const notificationsResponse = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(notificationsResponse.data);
        setUnreadCount(notificationsResponse.data.filter(n => !n.is_read).length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (_id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/requests/${_id}/approve`);
      const approvedRequest = response.data;

      setAssignedAssets([...assignedAssets, { ...approvedRequest, status: "Assigned" }]);
      setPendingRequests(pendingRequests.filter((req) => req._id !== _id));
      addNotification(`${approvedRequest.asset} request approved`);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (_id) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${_id}/reject`);
      setPendingRequests(pendingRequests.filter((req) => req._id !== _id));
      addNotification(`Request for asset with ID ${_id} rejected`);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const addNotification = (message) => {
    setNotifications([...notifications, { id: notifications.length + 1, message, is_read: false }]);
    setUnreadCount((prev) => prev + 1);
  };

  const markAsRead = async (_id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${_id}/mark-read`);
      setNotifications(notifications.map((n) => (n._id === _id ? { ...n, is_read: true } : n)));
      setUnreadCount(notifications.filter((n) => !n.is_read).length);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="hod-dashboard" style={{ minHeight: "100vh" }}>
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
                        <tr key={req._id}>
                          <td>{index + 1}</td>
                          <td>{req.asset}</td>
                          <td>{req.user}</td>
                          <td>
                            <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(req._id)}>
                              <FaCheck /> Approve
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleReject(req._id)}>
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
                        <tr key={asset._id}>
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

        <div className="mt-5">
          <Card bg="dark" text="light" className="shadow-lg">
            <Card.Header className="text-center">🔔 Notifications</Card.Header>
            <Card.Body>
              {notifications.length > 0 ? (
                <ul className="list-unstyled">
                  {notifications.map((notif) => (
                    <li
                      key={notif._id || notif.id}
                      style={{ cursor: "pointer", textDecoration: notif.is_read ? "line-through" : "none" }}
                      onClick={() => markAsRead(notif._id)}
                    >
                      {notif.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No new notifications</p>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default HODDashboard;

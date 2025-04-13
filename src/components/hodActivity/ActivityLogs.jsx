import React, { useState, useEffect } from "react";
import { Card, Table, Container, Badge } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./ActivityLogs.css";
import HODNavbar from "../Login/Navbar"; // ✅ Importing the Navbar

const ActivityLogs = () => {
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, action: "Approved Laptop Request", status: "Approved", date: "2025-03-23" },
    { id: 2, action: "Rejected Projector Request", status: "Rejected", date: "2025-03-22" },
    { id: 3, action: "Approved Printer Request", status: "Approved", date: "2025-03-21" },
    { id: 4, action: "Rejected Mouse Request", status: "Rejected", date: "2025-03-20" },
  ]);

  useEffect(() => {
    // Future API call to fetch logs from backend
    // axios.get("/api/activity-logs").then((res) => setActivityLogs(res.data));
  }, []);

  return (
    <>
      <HODNavbar /> {/* ✅ Added Navbar here */}
      <Container className="mt-4">
        <Card bg="dark" text="light" className="shadow-lg">
          <Card.Header as="h5" className="text-center">HOD Activity Logs</Card.Header>
          <Card.Body>
            {activityLogs.length > 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.action}</td>
                      <td>
                        <Badge bg={log.status === "Approved" ? "success" : "danger"}>
                          {log.status} {log.status === "Approved" ? <FaCheck /> : <FaTimes />}
                        </Badge>
                      </td>
                      <td>{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center">No activity logs available</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ActivityLogs;

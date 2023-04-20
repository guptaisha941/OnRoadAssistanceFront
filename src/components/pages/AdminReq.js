import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './req.css'
import Navlogout from '../navlogout';

export default function AdminReq(props) {
    const { id } = props;
    const requestId = id;
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    // const [garageRequests, setGarageRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

  const [garageRequests, setGarageRequests] = useState([]);

  useEffect(() => {
    fetchGarageRequests();
  }, []);

  async function fetchGarageRequests() {
    try {
      const response = await axios.get('http://localhost:5000/api/requests/garage');
      const data = response.data;
      console.log(data);

      if (data.success) {
        // const garageRequests = data.garageRequests.filter((request) => request.status === 'pending');
        setGarageRequests(data.garageRequests);
      }
    } catch (error) {
        // console.log("whattfbjhd");
      console.error(error);
    }
  }


  async function updateGarageRequestStatus(requestId, status) {
    try {
      const response = await axios.put(`http://localhost:5000/api/requests/garage/${requestId}`, {
        status: status,
      });
      if (response.data.success) {
        setSelectedRequest(response.data.updatedGarageRequest);
        setModalMessage(`Request ${status} successfully`);
        setModalVisible(true);
        fetchGarageRequests();}
    } catch (error) {
      console.error(error);
    }
  }

  function handleActionClick(requestId) {
    showModal(requestId);
  }

  function handleAcceptClick(requestId) {
    updateGarageRequestStatus(requestId, 'ACCEPTED');
    alert("Accepted the Request");
  }

  function handleDeclineClick(requestId) {
    updateGarageRequestStatus(requestId, 'DECLINED');
    alert("Declined the Request")
  }

  function showModal(requestId) {
    setSelectedRequestId(requestId);
    setModalOpen(true);
  }

  function closeModal() {
    setSelectedRequestId(null);
    setModalOpen(false);
  }
  


  return (
    <><Navlogout /><div>
          <table className="requests-table">
              <thead>
                  <tr>
                      <th>Email</th>
                      <th>Service Type</th>
                      <th>Location</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Make</th>
                      <th>Additional Details</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {garageRequests.map((request) => (
                      <tr key={request._id}>
                          <td>{request.email.email}</td>
                          <td>{request.service_type}</td>
                          <td>{request.location}</td>
                          <td>{request.vehicle_number}</td>
                          <td>{request.vehicle_make}</td>
                          <td>{request.additional_details}</td>
                          <td>{request.status}</td>
                          <td>
                              <div className="action-container">
                                  <button
                                      className="action-button"
                                      onClick={() => {
                                          setModalOpen(true);
                                          handleActionClick(request._id);
                                      } }
                                  >
                                      Action
                                  </button>
                                  {selectedRequestId === request._id && (
                                      <div className="modal-container" style={{ display: modalOpen ? 'block' : 'none' }}>
                                          <div className="modal-content">
                                              <p>Are you sure you want to accept this request?</p>
                                              <div className="modal-buttons">
                                                  <button
                                                      className="accept-button"
                                                      onClick={() => {
                                                          setModalOpen(false);
                                                          handleAcceptClick(request._id);
                                                      } }
                                                      style={{
                                                          backgroundColor: "#4CAF50",
                                                          border: "none",
                                                          color: "white",
                                                          padding: "10px 20px",
                                                          textAlign: "center",
                                                          textDecoration: "none",
                                                          display: "inline-block",
                                                          fontSize: "16px",
                                                          margin: "10px",
                                                          cursor: "pointer"
                                                      }}
                                                  >
                                                      ACCEPT
                                                  </button>
                                                  <button
                                                      className="decline-button"
                                                      onClick={() => {
                                                          setModalOpen(false);
                                                          handleDeclineClick(request._id);
                                                      } }
                                                      style={{
                                                          backgroundColor: "#f44336",
                                                          border: "none",
                                                          color: "white",
                                                          padding: "10px 20px",
                                                          textAlign: "center",
                                                          textDecoration: "none",
                                                          display: "inline-block",
                                                          fontSize: "16px",
                                                          margin: "10px",
                                                          cursor: "pointer"
                                                      }}
                                                  >
                                                      DECLINE
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div></>
  );}
import React from 'react';
// import '../../App.css';
import { useEffect , useState} from "react";
import './order.css';
import axios from 'axios';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


export default function Request(props) {
  const [label, setLabel] = useState("");
  const [id, setId] = useState("");
  const [vm, setVm] = useState("");
  const [vn, setVn] = useState("");
  const [ad, setAd] = useState("");
  const [lc, setlc] = useState("");
  const [status, setStatus] = useState("");
  const [garageRequests, setGarageRequests] = useState([]);

    const [vehicleType, setVehicleType] = useState("");


  useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    setLabel(searchParams.get("label"));
    setVm(searchParams.get("vm"));
    setVn(searchParams.get("vn"));
    setAd(searchParams.get("ad"));
    setlc(searchParams.get("lc"));
    setId(searchParams.get("id"))
    setVehicleType(searchParams.get("vt"));
    fetchGarageRequests();

  }, []);

  
  async function fetchGarageRequests() {
    try {
      const requestId = id;
      const response = await axios.get(`http://localhost:5000/api/requests/garage/${requestId}`);
      const data = response.data;
      if (data.success) {
        const lastStatus = response.data.garageRequests[response.data.garageRequests.length - 1].status;
        setStatus(lastStatus);

        // setGarageRequests(data.garageRequests);
        // setStatus(garageRequests.status)
        
        // const garageRequests = data.garageRequests.filter((request) => request.status === 'pending');
        // setGarageRequests(data.garageRequests);
      }
    } catch (error) {
        console.log("whattfbjhd");
      console.error(error);
    }
  }

  const g = garageRequests.map((request) => request.status)


  function OrderConfirmation({ status, ad }) {
    let confirmationMessage;
    let icon;
  
    if (status === 'PENDING') {
      confirmationMessage = 'Waiting for confirmation...';
      icon = <FaClock />;
    } else if (status === 'ACCEPTED') {
      confirmationMessage = 'Confirmed!';
      icon = <FaCheckCircle />;
    } else if (status === 'DECLINED') {
      confirmationMessage = 'Declined.';
      icon = <FaTimesCircle />;
    }
  }

  return (
    <div className="order-confirmation-container">
      <h2>Order Details</h2>
      <div className="order-details">
        <div className="order-item">
          <span>Service Type: </span>
          <span style={{ color: "brown" }}>{label}</span>
        </div>
        <div className="order-item">
          <span>Location:</span>
          {/* <span>{this.props.match.params.order_id}</span> */}
          <span style={{ color: "brown" }}>{lc}</span>
        </div>
        <div className="order-item">
          <span>Vehicle Type:</span>
          {/* <span>{this.props.match.params.order_id}</span> */}
          <span style={{ color: "brown" }}>{vehicleType}</span>
        </div>
        {/* <div className="order-item">
          <span>Vehicle Type:</span>
          <select value={vehicleType} onChange={handleVehicleTypeChange} style={{ color: "brown", backgroundColor: "#f2f2f2", padding: "5px" }}>
            <option value="Two Wheeler">Two Wheeler</option>
            <option value="Three Wheeler">Three Wheeler</option>
            <option value="Four Wheeler">Four Wheeler</option>
          </select>
        </div> */}
        <div className="order-item">
          <span>Vehicle Make:</span>
          <span style={{ color: "brown" }}>{vm}</span>
        </div>
        <div className="order-item">
          <span>Vehicle Number:</span>
          <span style={{ color: "brown" }}>{vn}</span>
        </div>
        <div className="order-item">
          <span>Status</span>
          {status === "DECLINED" ? (
            <span style={{ color: "red" }}>{status}</span>
          ) : status === "ACCEPTED" ? (
            <span style={{ color: "green" }}>{status}</span>
          ) : (
            <span>{status}</span>
          )}
        </div>
        <div className="order-item">
          <span>Additional Details:</span>
          <span style={{ color: "brown" }}>{ad}</span>
        </div>
      </div>
      
      <p className="confirmation-message">
        Thank you for your order! Our team will be in touch with you shortly.
      </p>
    </div>
  );
}
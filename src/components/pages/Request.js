import React from 'react';
// import '../../App.css';
import { useEffect , useState} from "react";
import './order.css';
import axios from 'axios';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Rating from './Rating';


export default function Request(props) {
  const [label, setLabel] = useState("");
  const [id, setId] = useState("");
  const [vm, setVm] = useState("");
  const [vn, setVn] = useState("");
  const [ad, setAd] = useState("");
  const [lc, setlc] = useState("");
  const [status, setStatus] = useState("");
  const [cm, setConfirmationMsg] = useState("");
  const [icon, setIcon] = useState("");
  const [garageRequests, setGarageRequests] = useState([]);


    const [vehicleType, setVehicleType] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);


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
        if (lastStatus === 'pending') {
          setConfirmationMsg('Waiting for confirmation...');
          setIcon(<FaClock />);
        } else if (lastStatus === 'ACCEPTED') {
          setConfirmationMsg('Congrats!! Your Request has been Accepted. Our Team will soon reach at your Location');
          setIcon(<FaCheckCircle />);
          setShowFeedback(true); 
        } else if (lastStatus === 'DECLINED') {
          setConfirmationMsg('Sorry!! Your Request has been Declined.');
          setIcon(<FaTimesCircle />);
        }

      }
    } catch (error) {
        console.log("whattfbjhd");
      console.error(error);
    }
  }

  const g = garageRequests.map((request) => request.status)


  return (
    <div className="order-confirmation-container">
  <h2 >ORDER DETAILS</h2>
  <div >
    <div className="order-item">
      <span>Service Type: </span>
      <span className="brown">{label}</span>
    </div>
    <div className="order-item">
      <span>Location:</span>
      <span className="brown">{lc}</span>
    </div>
    <div className="order-item">
      <span>Vehicle Type:</span>
      <span className="brown">{vehicleType}</span>
    </div>
    <div className="order-item">
      <span>Vehicle Make:</span>
      <span className="brown">{vm}</span>
    </div>
    <div className="order-item">
      <span>Vehicle Number:</span>
      <span className="brown">{vn}</span>
    </div>
    <div className="order-item">
      <span>Status:</span>
      {status === "DECLINED" ? (
        <span className="red">{status}</span>
      ) : status === "ACCEPTED" ? (
        <span className="green">{status}</span>
      ) : (
        <span>{status}</span>
      )}
    </div>
    <div className="order-item">
      <span>Additional Details:</span>
      <span className="brown">{ad}</span>
    </div>
  </div>

  <p className="confirmation-message">
    {icon} {cm}
  </p>
</div>
  );
          }  
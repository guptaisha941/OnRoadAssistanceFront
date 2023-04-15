import React from 'react';
// import '../../App.css';
import './order.css';

export default function Services() {
  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmation</h2>
      <div className="order-details">
        <div className="order-item">
          <span>Service Type: </span>
          {/* <span>{orderDetails.serviceType}</span> */}
        </div>
        <div className="order-item">
          <span>Location:</span>
          {/* <span>{orderDetails.location}</span> */}
        </div>
        <div className="order-item">
          <span>Vehicle Type:</span>
          {/* <span>{orderDetails.vehicleType}</span> */}
        </div>
        <div className="order-item">
          <span>Vehicle Make:</span>
          {/* <span>{orderDetails.vehicleMake}</span> */}
        </div>
        <div className="order-item">
          <span>Vehicle Model:</span>
          {/* <span>{orderDetails.vehicleModel}</span> */}
        </div>
        <div className="order-item">
          <span>Additional Details:</span>
          {/* <span>{orderDetails.additionalDetails}</span> */}
        </div>
      </div>
      <p className="confirmation-message">
        Thank you for your order! Our team will be in touch with you shortly to confirm the details of your appointment.
      </p>
    </div>
//     <div>
//             <h2>Vinayak Hospital and Research Center</h2>,
//   <h1>ORDERSSSSS</h1>

//     </div>
)

}

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function Order() {
// //   const id = props.match.params.id;
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/locations`)
//       .then((response) => {
//         setLocation(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

//   if (!location) {
//     return <div>Location Not Found</div>;
//   }

//   return (
//     <div>
//       <h1>{location.name}</h1>
//       {/* Render order form here */}
//     </div>
//   );
// }

// export default Order;


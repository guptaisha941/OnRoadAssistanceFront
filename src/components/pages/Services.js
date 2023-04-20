import React , { useState } from 'react';
import '../../App.css';
import Cards from '../Cards';
import '../Cards.css';
import CardItem from '../CardItem';
import Navadmin from '../navadmin';
import Navbar from '../Navbar';
import Modal from './Modal';
import CardItems from '../CardItems';
import SignUp from './SignUp';
import Navlogout from '../navlogout';


// export default function Services() {
//   return (
//     <div>
//     <Navbar />
   
//     <div className='cards'>
//       <div className='cards__container'>
//         <div className='cards__wrapper'>
//           <ul className='cards__items'>
//             <CardItem
//               src='images/towing.webp'
//               text='  Vehicle Towing            '
//               label='Vechile Towing Service'
//               path='/sign-up'
//             />
//             <CardItem
//               src='images/medical.png'
//               text='On-Spot Medical Treatment Service            '
//               label='Medical Treatment'
//               path='/map'
//             />
//             <CardItem
//               src='images/petrol_dilevery.jpg'
//               text='Fuel Delivery Service        '
//               label='Fuel Dilevery'
//               path='/sign-up'
//             />
//           </ul>
//           <ul className='cards__items'>
//           <CardItem
//               src='images/tire puncture.jpg'
//               text='Tire Puncture Repair Service            '
//               label='Tire puncture Repair'
//               path='/sign-up'
//             />
//             <CardItem
//               src='images/battery.jpg'
//               text='Battery Service                           '
//               label='Battery'
//               path='/sign-up'
//             />
//             <CardItem
//               src='images/car_key.png'
//               text='LockedOut/Lost Key                           '
//               label='LockedOut/Lost Key'
//               path='/sign-up'
//             />
//             <CardItem
//               src='images/minor_repair.webp'
//               text='On Site Minor Repairs                           '
//               label='On Site Minor Repairs'
//               path='/sign-up'
//             />
//             </ul>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

export const cards = [
{
  id: 1,
  src: 'images/towing.webp',
  text: 'Vehicle Towing',
  label: 'Vehicle Towing Service',
  path: '/Sign-up',
  buttonText: 'Login to book a tow',
  description: 'Our vehicle towing service is available 24/7 to assist you in the event of a breakdown or accident. Our experienced drivers will safely transport your vehicle to a repair shop or other desired location.',
},
{
  id: 2,
  src: 'images/medical.png',
  text: 'On-Spot Medical Treatment Service',
  label: 'Medical Treatment',
  path: '/Sign-up',
  buttonText: 'Login to book a medical',
  description: 'Our on-spot medical treatment service provides immediate medical attention to anyone in need. Our trained medical professionals will arrive on the scene quickly and provide expert care to stabilize the patient until further treatment can be arranged.',
},
{
  id: 3,
  src: 'images/petrol_dilevery.jpg',
  text: 'Fuel Delivery Service',
  label: 'Fuel Delivery',
  path: '/Sign-up',
  buttonText: 'Login to book a pump',
  description: 'Our fuel delivery service will bring gasoline or diesel directly to your location if you run out of fuel on the road. Our delivery vehicles are equipped with state-of-the-art fueling equipment to ensure safe and efficient fuel delivery.',
},
{
  id: 4,
  src: 'images/tire puncture.jpg',
  text: 'Tire Puncture Repair Service',
  label: 'Tire Puncture Repair',
  path: '/Sign-up',
  buttonText: 'Login to book a repair',
  description: 'Our tire puncture repair service will get you back on the road quickly and safely. Our technicians will assess the damage to your tire and either patch or replace it as necessary to ensure optimal performance.',
},
{
  id: 5,
  src: 'images/battery.jpg',
  text: 'Battery Service',
  label: 'Battery',
  path: '/Sign-up',
  buttonText: 'Login to book a battery',
  description: 'Our battery service will test and replace your vehicle’s battery if necessary. We carry a variety of high-quality batteries from top brands to ensure that your vehicle starts reliably every time.',
},
{
  id: 6,
  src:'images/lost_key.png',
  text:'LockedOut/Lost Key',
  label:'LockedOut/Lost Key',
  path:'/sign-up',
  buttonText: 'Login to book a repair',
  description: 'Our tire puncture repair service will get you back on the road quickly and safely. Our technicians will assess the damage to your tire and either patch or replace it as necessary to ensure optimal performance.',
},
{
  id: 7,
  src:'images/minor_repair',
  text:'On site minor Repairs',
  label:'On site minor Repairs',
  path:'/sign-up',
  buttonText: 'Login to book a battery',
  description: 'Our battery service will test and replace your vehicle’s battery if necessary. We carry a variety of high-quality batteries from top brands to ensure that your vehicle starts reliably every time.',
}
];

function Services() {
// const [selectedService, setSelectedService] = useState(null);

const [selectedCard, setSelectedCard] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false); // new state to track login status




const handleCardClick = (card) => {
  // const selectedCard = cards.findIndex((card) => card.path === path);
  setSelectedCard(card);
};

const handleCloseModal = () => {
  setSelectedCard(null);
};

const handleLogin = () => {
  setIsLoggedIn(true);
  window.location.href = "/sign-up";
};

return (
  
  <div className='cards'>
    <Navbar />
    <h1>Check out all Services!</h1>
    <div className='cards__container'>
      <div className='cards__wrapper'>
        <ul className='cards__items'>

        {cards.slice(0, 2).map((card, index) => (
            <CardItems
              key={index}
              src={card.src}
              text={card.text}
              label={card.label}
              path={card.path}
              description={card.description}
              buttonText={card.buttonText}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </ul>
        <ul className='cards__items'>
          {cards.slice(2, 7).map((card, index) => (
            <CardItems
              key={index}
              src={card.src}
              text={card.text}
              label={card.label}
              path={card.path}
              description={card.description}
              buttonText={card.buttonText}
              onClick={() => handleCardClick(card)}
            />
          ))}
         

        </ul>
      </div>
    </div>
    {selectedCard !== null && (
      <>
        <Modal
          title={selectedCard.label}
          description={selectedCard.text}
          buttonText={selectedCard.buttonText}
          path={selectedCard.path}
          handleLogin={handleLogin}
        >
            <button onClick={() => handleLogin(selectedCard.path)}>Login</button>

        </Modal>
        <SignUp path={selectedCard.path} />

      </>
    )}


  </div>
);
}
export default Services;
import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards2() {
  return (
    <div className='cards'>
      <h1>Check out all Services!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/towing.webp'
              text='  Vehicle Towing            '
              label='Vechile Towing Service'
              path='/vechiletowing'
            />
            <CardItem
              src='images/medical.png'
              text='On-Spot Medical Treatment Service            '
              label='Medical Treatment'
              path='/map'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/petrol_dilevery.jpg'
              text='Fuel Delivery Service        '
              label='Fuel Dilevery'
              path='/mapPetrolPump'
            />
            <CardItem
              src='images/tire puncture.jpg'
              text='Tire Puncture Repair Service            '
              label='Tire puncture Repair'
              path='/mapGarage'
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              path='/mapGarage'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards2;

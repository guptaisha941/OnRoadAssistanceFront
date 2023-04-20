import React from 'react';
import '../App.css';

import './Cards.css';
import CardItem from './CardItem';


export default function Servicesadmin(props) {
  const { id } = props;
  return (
    // <div>
    // <Navadmin />
    
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/towing.webp'
              text='  Vehicle Towing            '
              label='Vechile Towing Service'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/medical.png'
              text='On-Spot Medical Treatment Service            '
              label='Medical Treatment'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/petrol_dilevery.jpg'
              text='Fuel Delivery Service        '
              label='Fuel Dilevery'
              path={`/AdminReq?id=${id}`}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/petrol_dilevery.jpg'
              text='Fuel Delivery Service        '
              label='Fuel Dilevery'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/tire puncture.jpg'
              text='Tire Puncture Repair Service            '
              label='Tire puncture Repair'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              path={`/AdminReq?id=${id}`}
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              path={`/AdminReq?id=${id}`}
            />
            
          </ul>
        </div>
      </div>
    </div>
    // </div>
  );
}


import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import '../Cards.css';
import CardItem from '../CardItem';
import Navadmin from '../navadmin';
import Navlogout from '../navlogout';


export default function Serviceslogin() {
    // const params = new URLSearchParams(window.location.search);
    // const id = params.get('id');
    // console.log(id)

  return (
    <div>
    <Navlogout />
    
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/towing.webp'
              text='  Vehicle Towing            '
              label='Vechile Towing Service'
            //   path='/mapGarage'
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
            <CardItem
              src='images/lost_key.png'
              text='LockedOut/Lost Key                           '
              label='LockedOut/Lost Key'
              path='/mapGarage'
            />
            <CardItem
              src='images/minor_repair.webp'
              text='On Site Minor Repairs                           '
              label='On Site Minor Repairs'
              path='/mapGarage'
            />
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}


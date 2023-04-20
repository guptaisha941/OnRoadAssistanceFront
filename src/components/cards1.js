import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
// import queryString from 'query-string';


function Cards1(props) {
  const { id } = props;

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
              path={`/mapGarage?id=${id}&label=Vechile%20Towing%20Service`}
              // path={`/mapGarage?id=${id}/?label=${label}`}
            />
            <CardItem
              src='images/medical.png'
              text='On-Spot Medical Treatment Service            '
              label='Medical Treatment'
              path={`/map?id=${id}&label=Medical%20Treatment`}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/petrol_dilevery.jpg'
              text='Fuel Delivery Service        '
              label='Fuel Dilevery'
              path={`/mapPetrolPump?id=${id}&label=Fuel%20Dilevery%20Service`}
              // path='/mapPetrolPump'
            />
            <CardItem
              src='images/tire puncture.jpg'
              text='Tire Puncture Repair Service            '
              label='Tire puncture Repair'
              // path='/mapGarage'
              path={`/mapGarage?id=${id}&label=Tire%20Puncture%20Repair`}
            />
            <CardItem
              src='images/battery.jpg'
              text='Battery Service                           '
              label='Battery'
              // path='/mapGarage'
              path={`/mapGarage?id=${id}&label=Battery%20Service`}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards1;

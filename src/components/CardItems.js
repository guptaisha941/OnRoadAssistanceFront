import React, { useState } from 'react';
import Modal from './pages/Modal';
import './Cards.css';


function CardItemss(props) {
  const [showModal, setShowModal] = useState(false);

  function handleCardClick() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }



  return (
    <>
      <li className='cards__item' onClick={handleCardClick}>
        <div className='cards__item__link'>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Service'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </li>
      {showModal && (
        <Modal title={props.label} onClose={handleCloseModal}>
          <p>{props.description}</p>
        </Modal>
      )}
    </>
  );
}

export default CardItemss;
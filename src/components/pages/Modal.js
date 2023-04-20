// import React from 'react';
// import './Modal.css';

// function Modal(props) {
//   return (
//     <div className='modal'>
//       <div className='modal__content'>
//         <div className='modal__header'>
//           <h2>{props.title}</h2>
//           <button onClick={props.onClose}>Close</button>
//         </div>
//         <div className='modal__body'>{props.children}</div>
//       </div>
//     </div>
//   );
// }

// export default Modal;

import React from 'react';
import './Modal.css';

function Modal(props) {
    const handleLogin = () => {
        window.location.href = "/sign-up";
      };
  return (
    <div className='modal'>
      <div className='modal__content'>
        <div className='modal__header'>
          <h2 className='modal__title'>{props.title}</h2>
          <button className='modal__close' onClick={props.onClose}>
            X
          </button>
        </div>
        <div className='modal__content'>
          {props.children}
        </div>
        
        <div className='modal__footer'>
          <button className='modal__button' onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;


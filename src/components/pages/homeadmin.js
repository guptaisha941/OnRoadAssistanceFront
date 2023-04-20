import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Cards2 from '../card2';
import Navadmin from '../navadmin';
import Servicesadmin from '../servicesadmin';

function Homeadmin(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const id = searchParams.get("id");
  return (
    <>
      <Navadmin />
      <Servicesadmin id={id} />
      <Footer />
    </>
  );
}

export default Homeadmin;

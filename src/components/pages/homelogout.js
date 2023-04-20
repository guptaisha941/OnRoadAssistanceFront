import React from 'react';
// import App from '../../App';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Cards1 from '../cards1';
// import Cards1 from '../cards1';
import { useParams } from "react-router-dom";

import Navlogout from '../navlogout';

function Homelogout(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const id = searchParams.get("id");
  // const { id } = useParams();
  // const { id } = useParams(); 
  // const { id } = queryString.parse(props.location.search);

  return (
    <>
      <Navlogout />
      <HeroSection />
      <Cards1 id={id}/>
      <Footer />
    </>
  );
}

export default Homelogout;

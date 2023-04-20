import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Input from "../component/Input";
import Button from "../component/Button";
import Icon from "../component/Icon";
// import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Signup.css';
// import { useHistory } from "react-router-dom";


import React  from 'react';
import { useState, useEffect  } from 'react';
// import React, { Component } from 'react';
import axios from 'axios';
// import { Input } from 'antd';


function AdminLogin() {

  // const history = useHistory();

  
  // const [name, setName] = useState('');
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!password || !email) {
      alert('Please enter your email and password.');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/admins');
      const customers = response.data;
  
      const matchedCustomer = customers.find((customer) => {
        return customer.email === email && customer.password === password;
      });
  
      if (matchedCustomer) {
        alert('Login successful!');
        window.location.href = "/homeadmin"+"?id=" + matchedCustomer._id;
        // history.push("/map");
        // Code to redirect to dashboard page or perform any other action after successful login
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed.');
    }
  };
  

  // function handleLogin() {
  //   // <Redirect to = "/login"/>
  //   Navigate("/login");
  // }
  
  window.addEventListener('resize', showButton);
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  return<div className="signup">
   <MainContainer>
    <WelcomeText>Admin Login</WelcomeText> 
    <InputContainer>
        <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      </InputContainer>
      <div className='button-container'>
        <ul>
        <Link
                to='booking'
                className='signin'
                onClick={handleSubmit}
              >
                Login
              </Link>
        </ul>
        <div style={{ height: "1em" }} />
      </div>
      <Sent>Don't have an account? Signup as</Sent>
      {/* <div class="text-center small" >Don't have an account? Signup as</div> */}

      {/* <div class="text-center small">Don't have an account? Signup as</div> */}

      <ul>
              <Link
                to='/customer-sign-up'
                className='log'
                onClick={closeMobileMenu}
                style={{color: 'white'}}
              >
                User
              </Link>
              </ul>

      <ul>
              <Link
                to='/login'
                className='log'
                onClick={closeMobileMenu}
                style={{color: 'white'}}
              >
               Admin
              </Link>
              </ul>
      <HorizontalRule />
      <LoginWith>OR LOGIN WITH</LoginWith>
      <IconsContainer>
        <Icon color={FacebookBackground}>
          <FaFacebookF />
        </Icon>
        <Icon color={InstagramBackground}>
          <FaInstagram />
        </Icon>
        <Icon color={TwitterBackground}>
          <FaTwitter />
        </Icon>
      </IconsContainer>
      {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
  </MainContainer>
  </div >;
  

}



const MainContainer = styled.div`
display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  margin: 0 0 0 2rem;
`;
const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const Sent = styled.h6`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;

export default AdminLogin;


import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Input from "../component/Input";
import Button from "../component/Button";
import Icon from "../component/Icon";
import React from 'react';
// import { useState } from 'react';
// import React, { Component } from 'react';
// import axios from 'axios';
// import { Input } from 'antd';


function SignUp() {
  
  // const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // alert(event)
  
//     if (!password || !email) {
//       alert('Please enter your name and email.');
//       return;
//     }

//     const formData = {  email, password };

//     console.log(formData);


//     try {
//       const response = await axios.post('http://localhost:5000/users', formData);
//       alert('Signup successful!');
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//       alert('Signup failed.');
//     }
//   };
  
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
    
  return(
    <div className="signup" >
      <form>
   <MainContainer>
    <WelcomeText>Sign-Up</WelcomeText>
    <InputContainer>

        {/* <Input type="text" placeholder="Email" /> */}
        {/* <Input type="password" placeholder="Password" /> */}
        <Input type="email" placeholder="Email"   required />
        <Input type="text" placeholder="Password"  required />
      </InputContainer>
      <ButtonContainer>
      <Button type="submit" content="Sign Up" />
        {/* <Button content="Sign Up" /> */}
      </ButtonContainer>
      
      {/* <LoginWith>already have an Account?</LoginWith> */}
      
      <Button type="button" content="Log In" />
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
  </form>
  </div >);
  

}

const MainContainer = styled.div`
display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(0, 0, 0, 0.2);
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

// const ForgotPassword = styled.h4`
//   cursor: pointer;
// `;
export default SignUp;


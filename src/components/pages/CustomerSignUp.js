import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../component/Input';
import Button from '../component/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import bcrypt from 'bcryptjs';


export default function SignUp() {
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);

    // formData.append('document', document);

      
    if (!password || !email || !name || !phone) {
      alert('Please fill all the credentials');
      return;
    }

    // const hashedpassword = await bcrypt.hash(password,10);
    // formData.append('password' , hashedpassword)


    try {
      const response = await axios.post('http://localhost:5000/customers', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      alert('Customer Signup successful!');
      window.location.href = "/sign-up";
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Signup failed.');
    }
  
  };

  return (
    <div className="signup">
      <MainContainer>
        <WelcomeText>User SignUp</WelcomeText>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="text"
              placeholder="enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <WelcomeText> </WelcomeText> */}
            <Input
              type="text"
              placeholder="enter your Phone. no"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="text"
              placeholder="enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <WelcomeText> </WelcomeText>
          <WelcomeText> </WelcomeText>
          <ButtonContainer>
            <Button content="Sign Up" type="submit" />
          </ButtonContainer>

          {/* </InputContainer> */}
      <ul>
              <Link
                to='/sign-up'
                className='log'
                onClick={closeMobileMenu}
                style={{color: 'white'}}
              >
                Already have an account? LogIn
              </Link>
              </ul>
        </form>
      </MainContainer>
    </div>
  );
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
  color: #000000;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  width: 110%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 6;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 100%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 85%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const UploadInput = styled.input`
  margin-top: 8px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


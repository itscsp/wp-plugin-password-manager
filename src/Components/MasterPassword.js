import React, { useState } from 'react';
import styled from 'styled-components';

const MasterPassword = ({ onSubmit }) => {
  const [masterPassword, setMasterPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      onSubmit(masterPassword);
      setError('');
    }
   
  };

  const validatePassword = () => {
    console.log(masterPassword.length)
    if (masterPassword.length > 6) {
      setError('Password must be 6 characters or less.');
      return false;
    }
    if (!/^\d+$/.test(masterPassword)) {
      setError('Password must contain only numbers.');
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <MasterPasswordWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="masterPassword"
              placeholder='Enter master password'
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              required
            />
            <PasswordToggle onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </PasswordToggle>
          </MasterPasswordWrapper>
        </FormGroup>
        {error && <ErrorLabel>{error}</ErrorLabel>}
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default MasterPassword;

const Container = styled.div`
  text-align: center;
  border-radius:10px;
  padding:20px;
  max-width:100%;
  margin:auto;
  background:#292a2d;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
   gap: 15px;
  
`;

const FormGroup = styled.div`
  display: flex;
  gap: 15px;
  width:100%;
  `;
  
const MasterPasswordWrapper = styled.div`
  position:relative;
  width:100%;
`;


const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  height:50px;
  width:100%;
  border-radius:10px;
`;


const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 45%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ErrorLabel = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  displsay:block;
  padding: 13px 20px;
  background-color: #fff;
  color: #292a2d;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius:10px;
  border:1px solid;

  &:hover {
    background-color: #292a2d;
    color:#fff;
    border-color:#fff;
  }
`;
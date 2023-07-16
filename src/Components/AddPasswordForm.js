import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${slideAnimation} 0.3s ease-in-out;
`;

const Popup = styled.div`
  background-color: white;
  width:680px;
  padding: 20px;
  border-radius: 5px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddPasswordForm = () => {
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');


  const closePopup = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation logic here
    console.log('Form submitted!');
    closePopup();
  };

  return (
    <>
    
        <PopupContainer>
          <Popup>
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label htmlFor="siteUrl">Site URL:</Label>
                <Input
                  type="text"
                  id="siteUrl"
                  name="siteUrl"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  required
                />
              </FormField>

              <FormField>
                <Label htmlFor="username">Username:</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormField>

              <FormField>
                <Label htmlFor="password">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormField>

              <FormField>
                <Label htmlFor="note">Note:</Label>
                <Textarea
                  id="note"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </FormField>

              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
            <button onClick={closePopup}>Close</button>
          </Popup>
        </PopupContainer>
    </>
  );
};


export default AddPasswordForm;

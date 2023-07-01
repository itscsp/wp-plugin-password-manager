import React, { useState } from 'react';
import styled from 'styled-components';
import MasterPassword from './MasterPassword';

const Dashboard = () => {
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [showMasterPasswordPopup, setShowMasterPasswordPopup] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMasterPasswordPopup(true);
  };

  const handleCancel = () => {
    setSiteName('');
    setUsername('');
    setPassword('');
    setNote('');
  };

  const handleMasterPasswordSubmit = (masterPassword) => {
    // Perform validation or any necessary logic with the master password
    console.log('Master Password submitted:', masterPassword);
    setShowMasterPasswordPopup(false);
  };

  return (
    <Container>
      {showMasterPasswordPopup && (
        <Overlay>
          <Popup>
            <MasterPassword onSubmit={handleMasterPasswordSubmit} />
          </Popup>
        </Overlay>
      )}
      {!showMasterPasswordPopup && (
        <FormContainer>
          <FormHeader>ADD NEW SITE CREDENTIALS</FormHeader>
          <Form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="siteName">Site URL Name:</Label>
              <Input
                type="text"
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                id="username"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="note">Note:</Label>
              <TextArea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </FormField>
            <ButtonContainer>
              <CancelButton type="button" onClick={handleCancel}>
                Cancel
              </CancelButton>
              <AddButton type="submit">Add</AddButton>
            </ButtonContainer>
          </Form>
        </FormContainer>
      )}


    </Container>
  );
};


export default Dashboard;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  max-width: 400px;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;


const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0c7cd5;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  margin-right: 8px;

  &:hover {
    background-color: #c4c4c4;
  }
`;

const AddButton = styled(Button)`
  background-color: #43b581;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width:500px;
`;

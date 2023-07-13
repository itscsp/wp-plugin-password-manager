import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MasterPassword from './MasterPassword';
import InfoDashboard from './InfoDashboard';

const Dashboard = () => {
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [showMasterPasswordPopup, setShowMasterPasswordPopup] = useState(false);
  const [validuser, setValiduser] = useState(true);
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    // Checking current 
    let currentUser = new wp.api.models.User({ id: 2 });
    currentUser.fetch(
      {
        data: {
          "_fields": "id, name, meta",
        },
      }
    ).done(function (user) {
    
      if(user.meta.master_password != ''){
        setValiduser(true);
      }else{
        setValiduser(false);
      }
      }).fail(function (xhr) {
        setValiduser(false);
      });

    if (!validuser) {
      setShowMasterPasswordPopup(true);
    }

  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (siteName && username && password) {
      const newCredential = {
        siteName: siteName,
        username: username,
        password: password,
        note: note,
      };
      setCredentials([...credentials, newCredential]);
      setSiteName('');
      setUsername('');
      setPassword('');
      setNote('');
      setShowMasterPasswordPopup(true);
    }
  };

  const handleCancel = () => {
    setSiteName('');
    setUsername('');
    setPassword('');
    setNote('');
  };

  const handleMasterPasswordSubmit = (masterPassword) => {
    // Using backboneJS we create post request
    const user = new wp.api.models.User({
      id: 2,
      meta: {
        master_password: masterPassword,
      },
      status: 'publish'
    });
    user.save().done(function (post) {
      setShowMasterPasswordPopup(false);
      setValiduser(true);
    });
  };


  return (
    <Container>
      {!validuser ? (
        <Overlay>
          <Popup>
            <MasterPassword onSubmit={handleMasterPasswordSubmit} />
          </Popup>
        </Overlay>
      ) : (
        <>
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
          <InfoDashboardContainer>
            <InfoDashboard credentials={credentials} />
          </InfoDashboardContainer>
        </>
      )}
    </Container>
  );
};

export default Dashboard;

/* Styles for Dashboard component */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Popup = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
`;

const FormContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 20px;
  width: 400px;
`;

const FormHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const CancelButton = styled.button`
  padding: 8px 15px;
  margin-right: 10px;
  background-color: gray;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddButton = styled.button`
  padding: 8px 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const InfoDashboardContainer = styled.div`
  margin-top: 20px;
`;

const AddCredentialsButton = styled.button`
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

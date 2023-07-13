import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MasterPassword from './MasterPassword';
import PasswordList from './PasswordList';
import AddPasswordForm from './AddPasswordForm';

const Dashboard = () => {

  const [showMasterPasswordPopup, setShowMasterPasswordPopup] = useState(false);
  const [validuser, setValiduser] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(localized_data.current_user_id);

  useEffect(() => {
    // Checking current 
    let currentUser = new wp.api.models.User({ id: currentUserId });
    currentUser.fetch(
      {
        data: {
          "_fields": "id, name, meta",
        },
      }
    ).done(function (user) {

      if (user.meta.master_password != '') {
        setValiduser(true);
      } else {
        setValiduser(false);
      }
      
    }).fail(function (xhr) {
      setValiduser(false);
    });

    if (!validuser) {
      setShowMasterPasswordPopup(true);
    }

  }, []);




  const handleMasterPasswordSubmit = (masterPassword) => {
    // Using backboneJS we create post request
    const user = new wp.api.models.User({
      id: currentUserId,
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
          <AddPasswordForm />
          <PasswordList />
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

const PasswordListContainer = styled.div`
  margin-top: 20px;
`;

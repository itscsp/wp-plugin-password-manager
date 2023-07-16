import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SinglePasswordItem from './SinglePasswordItem';
import MasterPassword from './MasterPassword';
import AddPasswordForm from './AddPasswordForm';

const Dashboard = () => {
    const [showAddPassword, setShowAddPassword] = useState(false);
    const [showMasterPasswordPopup, setShowMasterPasswordPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(localized_data.current_user_id);

    useEffect(() => {

        
        // Checking current 
        if(!isLoggedIn){
            setIsLoggedIn(false)
            let currentUser = new wp.api.models.User({ id: currentUserId });
            currentUser.fetch(
                {
                    data: {
                        "_fields": "id, name, meta",
                    },
                }
            ).done(function (user) {
    
                if (user.meta.master_password != '') {
                    sessionStorage.setItem('isLoggedIn', true);
                    setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
                } else {
                 
                    setIsLoggedIn(false)
                }
    
            }).fail(function (xhr) {
                setIsLoggedIn(false)
            });
    
            if (!isLoggedIn) {
                setShowMasterPasswordPopup(true);
            }
        }else {
            setIsLoggedIn(true);
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
            sessionStorage.setItem('isLoggedIn', true);
            isLoggedIn = sessionStorage.getItem('isLoggedIn')
            setIsLoggedIn(isLoggedIn);
            setShowMasterPasswordPopup(false);
        });
    };

    const handleAddBtnClick = () => {
        setShowAddPassword(true)
    }

    return (
        <Container>
            {!isLoggedIn ? (
                <>
                    <Header>
                        <h2 class="flex page-title">Configure master password</h2>
                    </Header>
                    <MasterPassword onSubmit={handleMasterPasswordSubmit} />
                </>
            ) : (
                <>
                    <Header>
                        <h2 class="flex page-title">Passwords</h2>
                        <button id="addPasswordButton" title="Add new password" role="button" tabindex="0" aria-disabled="false" onClick={handleAddBtnClick}>
                            Add
                        </button>
                    </Header>
                    <Main>
                        {showAddPassword && <AddPasswordForm />}
                        <ul>
                            <SinglePasswordItem title="Accordion 1">
                                <p>Content for Accordion 1</p>
                            </SinglePasswordItem>
                            <SinglePasswordItem title="Accordion 2">
                                <p>Content for Accordion 2</p>
                            </SinglePasswordItem>
                        </ul>
                    </Main>
                </>
            )}
        </Container>
    )
}



export default Dashboard;

const Container = styled.div`
    box-sizing: border-box;
    display: block;
    margin: 50px auto;
    max-width: 680px;
    width:calc(100% - 20px);
    // background: #292a2d;
`;

const Header = styled.header`
    display:flex;
    justify-content:space-between;
    align-items:center;
    marign-bottom:20px;
`;

const Main = styled.main`
    background:#292a2d;
    padding:20px;
    border-radius:10px;
`;

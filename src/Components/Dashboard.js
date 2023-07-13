import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SinglePasswordItem from './SinglePasswordItem';
import MasterPassword from './MasterPassword';

const Dashboard = () => {

    const [showMasterPasswordPopup, setShowMasterPasswordPopup] = useState(false);
    const [validuser, setValiduser] = useState(false);
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
                        <button id="addPasswordButton" title="Add new password" role="button" tabindex="0" aria-disabled="false">
                            Add
                        </button>
                    </Header>
                    <Main>
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

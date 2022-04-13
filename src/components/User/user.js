import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import './user.css';

const UserDetails = ({ user }) => {

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     console.log(username)
    //     getUser()
    // }, [])


    return (
        <Container className='user-details-container'>
            {
                <>
                    <Row className='user-details'>
                        <Col xs="2" className="user-img">
                            <img src={user.avatar_url} alt={user.name || user.login} />
                        </Col>
                        <Col xs="8" style={{ margin: 'auto' }}>
                            <div className='name'>{user.name || user.login}</div>
                            <div className='bio'>{user.bio}</div>
                            <div className='location'>
                                {
                                    user.location ?
                                        <i className='fa fa-location-dot' />
                                        : null
                                }
                                &nbsp; {user.location}
                            </div>
                            <div className='twitter'>{`https://twitter.com/${user.twitter_username}`}</div>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: '1em' }}>
                        <Col xs='12' >
                            <i className='fa fa-link' />   {user.html_url}
                        </Col>
                    </Row>
                </>

            }
        </Container>
    )
}


export default UserDetails;
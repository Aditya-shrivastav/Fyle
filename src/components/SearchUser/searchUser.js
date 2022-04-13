import React, { useState } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';


const SearchUser = ({ getUser }) => {

    const [username, setUsername] = useState(null);

    const handleInputChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser(username);
        setUsername('');
    }

    return (
        <Container style={{ padding: '2em' }}>
            <Row>
                <Col xs='12'>
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Col xs='3'>
                            <Input for="username" id="username" name="username" placeholder='username' value={username} onChange={handleInputChange} />
                        </Col>
                        <Col xs='3'>
                            <Button type="submit" onClick={handleSubmit} color="primary">Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchUser;
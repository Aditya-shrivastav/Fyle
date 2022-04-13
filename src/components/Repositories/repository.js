import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const RenderRepository = ({ repo }) => {

    console.log(repo)
    const [langs, setLangs] = useState([]);

    useEffect(() => {
        renderLangs()
    }, [])

    const renderLangs = async () => {
        const langObj = await axios.get(`${repo.languages_url}`);
        console.log(langObj)
        const languages = Object.keys(langObj.data)
        setLangs(languages)
    }

    return (
        <div key={repo.id} style={{ padding: '2em' }}>
            <h4>{repo.name}</h4>
            <div>{repo.description}</div>
            <Row style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    langs.length > 0 ?
                        langs.map((lang) => <Col xs="12" md="5" lg="3" style={{ marginRight: '1em', marginTop: '1em', backgroundColor: '#0D6EFD', padding: '0.7em', color: 'white', borderRadius: '0.6em' }}>{lang}</Col>)
                        :
                        <></>
                }
            </Row>
        </div>
    )
}

const Repostiories = ({ repos }) => {

    // useEffect(() => {
    //     getRepos();
    // }, [currPage])


    // console.log(repos)
    const renderRepos = repos.map((repo) => {
        return (
            <Col style={{ border: '2px solid black', maxWidth: '40em' }}>
                <RenderRepository repo={repo} />
            </Col>
        )
    })

    return (
        <Container>
            {
                // repos && repos.length > 0 ?
                <Row style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '20px', columnGap: '20px' }}>
                    {renderRepos}
                </Row>
                // :
                // repoErr ?
                //     <div>{repoErr}</div>
                //     :
                //     <div></div>
            }
        </Container>
    )
}

export default Repostiories
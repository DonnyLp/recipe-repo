import React from "react";
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; //react-bootstrap

import { Navbar } from '../components/Navbar';
import { PostRecipe } from '../components/PostRecipe';

const CommunityGuidelines = () => {
    return(
        <div>
            <Navbar />
            <PostRecipe />
            <div className="jumbotron jumbotron-fluid" >
                <div className="container" style={{justifyContent: "center", display: "flex"}}>
                    <h1 className="display-3" ><b>Community Guidelines</b></h1>
                </div>
            </div>

            {/* Collapsable Box One */}
            <div style={{margin: '0px 10% 0px 10%'}}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Posting Recipes</Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Reporting Posts</Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Verification and Verification Requests</Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Account Deactivation</Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Account Recovery</Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Contact Us</Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            

        </div>
    );
};

export default CommunityGuidelines;
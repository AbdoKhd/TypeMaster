import React, {useEffect, useState} from 'react';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardTitle,
  MDBCardText,
}
from 'mdb-react-ui-kit';
import NavBar from '../components/NavBar';
import "./Home.css";

export default function Home() {
    return (
        <div>
            <NavBar></NavBar>
            <div className="d-flex" style={{ backgroundImage: 'url("https://in-media.apjonlinecdn.com/magefan_blog/0-why-do-i-need-backlit-keyboard-laptop-hero.jpg")' }}>
                <h1 style={{color: 'white'}} className="text-center mx-auto my-5">Welcome to TypeMaster</h1>
            </div>
            {/* <div className="d-flex justify-content-center">
                <img src="https://in-media.apjonlinecdn.com/magefan_blog/0-why-do-i-need-backlit-keyboard-laptop-hero.jpg" className="img-fluid" alt="Wild Landscape" />
            </div> */}
            <div className="d-flex">

                <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                    <div >
                    <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        <MDBCardTitle>Practice</MDBCardTitle>
                        <MDBCardText>
                            Practice mode helps you improve your typing skills by giving you different sentences to type. You can change the difficulity for a more challenging experience.
                        </MDBCardText>
                        <MDBBtn href='/Practice'>Practice</MDBBtn>
                    </MDBCardBody>
                    </div>
                </MDBCard>
                <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                    <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        <MDBCardTitle>Multiplayer</MDBCardTitle>
                        <MDBCardText>
                            Multiplayer connects you to friends or strangers so you can race and see who finishes typing first.
                        </MDBCardText>
                        <MDBBtn href='/JoinGame' >Play Online</MDBBtn>
                    </MDBCardBody>
                </MDBCard>

            </div>
        </div>
    );
  }


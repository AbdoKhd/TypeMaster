import React, {useEffect, useState} from 'react';
import './Login.css'
import UserService from '../services/UserService';
import { setLocalStorageUser } from '../UTILS/localStorageUtils';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom';


const JoinGame = () => {

    const [roomNb, setRoomNb] = useState("");

    useEffect(()=>{
        
    })

    const navigate = useNavigate();

    const handleJoin = () => {
        if(roomNb !== ""){
            navigate(`/Multiplayer?room=${roomNb}`);
        }
    }
    

  return (
    <MDBContainer className='body' fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Join Room</h2>
              <p className="text-white-50 mb-5">Please enter the room number!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Room ID'  size="lg" onChange={e => setRoomNb(e.target.value)}/>

              {/* <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}
              <MDBBtn  className='mx-2 px-5' color='white' size='lg' onClick={handleJoin}>
                Join
              </MDBBtn>
              <div>

              </div>
              <MDBBtn outline className='mx-2' color='white' size='sm' href='/home'>
                Back to home page
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default JoinGame;


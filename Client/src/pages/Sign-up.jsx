import React, {useEffect, useState} from 'react';
import './Sign-up.css'
import UserService from '../services/UserService';
import Loginn from './Login';
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

const SignUpp = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(()=>{
        
    })

    const navigate = useNavigate();
    const handleSignUp = async() => {
        if(username !== '' && password !== '' && email !== ''){
            const user = {
                username, email, password
            }
            const result = await UserService.register({user});
            const res = await UserService.authenticate({user}).catch(error=>{
                alert("Wrong username/password");
            });
            if(res?.data?.message === "Successful"){
                let authenticatedUser = res?.data?.user;
                authenticatedUser.token = res?.data?.token;
                setLocalStorageUser(authenticatedUser); 
                navigate("/home")  
            }
            return result;
        }
    }

  return (
    <MDBContainer className='body1' fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className2="body1" className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Sign-up</h2>
              <p className="text-white-50 mb-5">Please register!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='username' size="lg" onChange={e => setUsername(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email' id='formControlLg' type='email' size="lg" onChange={e => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={e => setPassword(e.target.value)}/>

              <MDBBtn className='mx-2 px-5' color='white' size='lg' onClick={handleSignUp}>
                Sign-up
              </MDBBtn>

              <div className="div1">
                <p className="mb-0">Already have an account? <a href="/Login" class="text-white-50 fw-bold">Login</a></p>
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

export default SignUpp;
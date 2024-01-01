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


const Loginn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        
    })

    const navigate = useNavigate();
    const handleLogin = async() => {
        if(email !== '' && password !== ''){
            const user = {email, password}
            const result = await UserService.authenticate({user}).catch(error=>{
                alert("Wrong email/password");
            });
            if(result?.data?.message === "Success"){
                let authenticatedUser = result?.data?.user;
                authenticatedUser.token = result?.data?.token;
                console.log("this is token" , authenticatedUser.token);
                setLocalStorageUser(authenticatedUser); 
                navigate("/home")  
            }
        }
    }
    

  return (
    <MDBContainer className='body' fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your email and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email' id='formControlLg' type='email' size="lg" onChange={e => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={e => setPassword(e.target.value)}/>

              {/* <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> */}
              <MDBBtn  className='mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                Login
              </MDBBtn>

              <div className="div1">
                <p className="mb-0">Don't have an account? <a href="/signUp" class="text-white-50 fw-bold">Sign Up</a></p>
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

export default Loginn;


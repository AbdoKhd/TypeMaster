import React, {useEffect, useState} from 'react';

import NavBar from '../components/NavBar';

import './About.css';


export default function About() {
    return (
        <div>
          <NavBar />
    
          <div className="about-container">
            <div className="about-content">
              <h2>Welcome to TypeMaster</h2>
              <p>
                TypeMaster is not just a typing practice platform; it's an interactive experience designed to enhance your typing skills in a fun and engaging way. Our mission is to make learning to type an enjoyable journey.
              </p>
    
              <h3>Key Features</h3>
              <ul>
                <li>Practice Mode: Improve your typing skills with a variety of sentences. Adjust the difficulty for a customized challenge.</li>
                <li>Multiplayer: Connect with friends or challenge strangers in exciting typing races.</li>
                {/* Add more features as needed */}
              </ul>
    
              <h3>Our Vision</h3>
              <p>
                At TypeMaster, we believe that everyone can become a typing master with the right tools and motivation. Our vision is to create a global community of proficient typists who enjoy the learning process.
              </p>
    
              <h3>Get Started</h3>
              <p>
                Ready to embark on your typing adventure? Join TypeMaster today and discover the joy of mastering the keyboard.
              </p>
            </div>
          </div>
        </div>
      );
  }
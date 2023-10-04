import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import linkedInLogo from './images/linkedin-logo.png'
import './About.css'

const About = () => {
    return (
        <div className="about-outer-container">
            <div className="about-inner-container">
                <div className="aboutDescription">
                    <div className="aboutDescription">
                        <h2>A Magic The Gathering deck building website</h2>
                        <div className="aboutContent">
                            <p>EDH-DECK-MASTER is a fullstack web application that was built utilizing
                                the following languages/frameworks/libraries: JavaScript, Redux.js, Python, Flask,
                                SQLAlchemy, React.js, HTML, and CSS.</p>

                            <p>EDH-DECK-MASTER allows users to create EDH decks by selecting cards
                                and adding them or removing them from their deck. Users can also challenge
                                other users to play. Still plan to add much more!</p>
                            <p>Click <NavLink className='about-login-link' exact to='/login' >HERE</NavLink> to demo the site.</p>
                        </div>
                    </div>
                </div>

                <div className="contributors-name">
                    Creator:
                    <span className='about-name'>
                        <> Scot Nicol</>
                    </span>
                    <a className='linkedIn' href='https://www.linkedin.com/in/scotnicol/' target="_blank">
                        <img className='linkedIn' src={linkedInLogo} alt='linkedIn' width="20" height="20" />
                    </a>

                </div>
            </div>
        </div>
    )
}

export default About;

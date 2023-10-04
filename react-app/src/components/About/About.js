import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-outer-container">
            <div>
                <div className="contributors-name">
                    <a className='linkedIn' href='https://www.linkedin.com/in/scotnicol/' target="_blank">
                        <img className='linkedIn' src={linkedInLogo} alt='linkedIn' width="20" height="20" />
                    </a>
                    <span className='about-name'>
                        <>Scot Nicol</>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About;

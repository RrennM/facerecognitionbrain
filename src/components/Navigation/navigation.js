import React from 'react';
import logo from './thicon10.png';
import Tilt from 'react-tilt';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav>
                <div className='logoContainer ma4 mt0'>
                    <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                        <img className="Tilt-inner" src={logo} alt='logo'/>
                    </Tilt>
                </div>
                <div className='navLinkContainer'>
                    <p 
                    onClick={() => onRouteChange('signout')}
                    className='f4 link dim white pa3 pointer'>Sign Out</p>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div className='logoContainer'>
                    <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                        <img className="Tilt-inner" src={logo} alt='logo'/>
                    </Tilt>
                </div>
                <div className='navLinkContainer'>
                    <p 
                    onClick={() => onRouteChange('signin')} 
                    className='f4 link dim white pa3 pointer'>Sign In</p>
                    <p 
                    onClick={() => onRouteChange('register')} 
                    className='f4 link dim white pa3 pointer'>Register</p>
                </div>
            </nav>
        )
    }
}

export default Navigation;
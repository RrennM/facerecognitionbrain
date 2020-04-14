import React from 'react';
import logo from './thicon10.png';
import Tilt from 'react-tilt'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                <img className="Tilt-inner" src={logo} alt='logo'/>
            </Tilt>
        </div>
        );
}

export default Logo;
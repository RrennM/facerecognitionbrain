import React from 'react';
import './facerecognition.css';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center imageContainer'>
            <img 
            src={imageUrl} 
            alt='Face Recognition' />
        </div>
    )
}

export default FaceRecognition;